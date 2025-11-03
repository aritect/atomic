import fs from "fs";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

const watchIgnores = [
  "./src/ui-lib/assets/images/**/*",
  "./src/ui-lib/icons/*",
];

const base64Loader = {
  name: "base64-loader",
  transform(_, id) {
    const [filePath, query] = id.split("?");
    if (query !== "base64") {
      return null;
    }

    const data = fs.readFileSync(filePath);
    const base64 = data.toString("base64");

    return `export default "${base64}";`;
  },
};

const addRawDataToCodeBlocks = node => {
  if (node.tagName === "code") {
    node.properties["data-language"] =
      node.properties.className &&
      node.properties.className[0].replace("language-", "");
    node.properties["data-raw-base-64"] = btoa(
      node.children.reduce((acc, child) => {
        if (child.type === "text") {
          return acc + child.value;
        }

        return acc;
      }, ""),
    );
  }

  if (node.children) {
    node.children = node.children.map(addRawDataToCodeBlocks);
  }

  return node;
};

export default defineConfig({
  base: "/",
  integrations: [
    mdx({
      syntaxHighlight: false,
      rehypePlugins: [() => addRawDataToCodeBlocks],
    }),
    react(),
    tailwind({
      configFile: "./internal/tailwind/tailwind-config.ts",
    }),
  ],
  outDir: "target",
  vite: {
    server: {
      watch: {
        ignored: watchIgnores,
      },
    },
    plugins: [base64Loader],
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },
});
