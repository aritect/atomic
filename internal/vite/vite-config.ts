import path from "node:path";

import react from "@vitejs/plugin-react";
import fs from "fs";
import ts, { type CompilerOptions } from "typescript";
import { defineConfig, type Plugin } from "vite";
import dts from "vite-plugin-dts";
import { viteStaticCopy } from "vite-plugin-static-copy";

const OUTPUT_DIR = "target";
const LIBRARY_NAME = "atomic";
const INPUT_DIR = "src/ui-lib";
const INPUT_INTERNAL_DIR = "internal";

const base64Loader: Plugin = {
  name: "base64-loader",
  transform(_: any, id: string) {
    const [filePath, query] = id.split("?");
    if (query !== "base64") {
      return null;
    }

    const data = fs.readFileSync(filePath);
    const base64 = data.toString("base64");

    return `export default "${base64}";`;
  },
};

const getCompilerOptions = () => ts.parseJsonConfigFileContent(
  ts.readConfigFile(
      ts.findConfigFile("./", ts.sys.fileExists, "tsconfig.json")!,
      ts.sys.readFile,
  ).config,
  ts.sys,
  "./",
).options as CompilerOptions;

const getAliases = (options: Pick<CompilerOptions, "paths">) => Object.entries(options.paths || []).reduce(
  (aliases, [name, [target]]) => ({
    ...aliases,
    [name.replace("/*", "")]: path.resolve(target.replace("/*", "")),
  }),
  {},
);

const getOutputName = (format: string, entryName: string) => [entryName, format, "js"].join(".");

const getEntries = () => {
  const entriesPath = path.resolve(__dirname, "entries.json");

  if (fs.existsSync(entriesPath)) {
    try {
      const entries = JSON.parse(fs.readFileSync(entriesPath, "utf-8"));
      console.log(`${Object.keys(entries).length} entry points loaded`);
      return entries;
    } catch (error) {
      console.warn("Error loading entries.json, using base entry points");
    }
  }

  return {
    index: path.resolve(INPUT_DIR, "index.ts"),
    icons: path.resolve(INPUT_DIR, "icons.ts"),
    "tailwind-preset": path.resolve(INPUT_INTERNAL_DIR, "tailwind/tailwind-preset.ts"),
  };
};

export default defineConfig({
  plugins: [
    base64Loader,
    react(),
    dts({
      outDir: OUTPUT_DIR.concat("/types"),
    }),
    viteStaticCopy({
      targets: [
        {
          src: INPUT_DIR.concat("/assets"),
          dest: "./",
        },
      ],
    }),
  ],
  resolve: {
    alias: getAliases(getCompilerOptions()),
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        sourceMap: false,
        additionalData: (source: string, fp: string) => {
          if (fp.endsWith("module.scss")) {
            return source;
          }

          return `@use "@/assets-ui-lib/styles/modules/imports.module.scss"; ${source}`;
        },
      },
    },
  },
  build: {
    outDir: OUTPUT_DIR,
    copyPublicDir: false,
    lib: {
      entry: getEntries(),
      name: LIBRARY_NAME,
      fileName: getOutputName,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "tailwindcss"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
