#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, "../..");
const UI_LIB_DIR = path.join(ROOT_DIR, "src/ui-lib");
const COMPONENTS_DIR = path.join(UI_LIB_DIR, "components");

const getComponents = () => {
  const files = fs.readdirSync(COMPONENTS_DIR);
  const components = [];

  for (const file of files) {
    const filePath = path.join(COMPONENTS_DIR, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile() && file.endsWith(".tsx")) {
      const componentName = file.replace(".tsx", "");
      components.push({
        name: componentName,
        path: `./components/${componentName}`,
        exportName: componentName,
      });
    } else if (stat.isDirectory() && file === "charts") {
      const chartFiles = fs.readdirSync(filePath);
      for (const chartFile of chartFiles) {
        if (chartFile.endsWith(".tsx")) {
          const chartName = chartFile.replace(".tsx", "");
          components.push({
            name: `charts/${chartName}`,
            path: `./components/charts/${chartName}`,
            exportName: `charts-${chartName}`,
          });
        }
      }
    }
  }

  return components;
};

const getIcons = (iconsDirName) => {
  const iconsDir = path.join(UI_LIB_DIR, iconsDirName);

  if (!fs.existsSync(iconsDir)) {
    console.warn("icons directory not found.");
    return [];
  }

  const files = fs.readdirSync(iconsDir);
  const icons = [];

  for (const file of files) {
    if (file !== "index.ts" && file.endsWith(".ts")) {
      const kebabName = file.replace(".ts", "");
      const content = fs.readFileSync(path.join(iconsDir, file), "utf-8");
      const match = (iconsDirName === "icons-free" ? /export\s+const\s+(\w+)\s*=/ : /export\s+{\s*default\s+as\s+(\w+)\s*}/).exec(content);

      if (match) {
        const iconName = match[1];
        icons.push({
          name: iconName,
          path: `./${iconsDirName}/${kebabName}`,
          exportName: kebabName,
        });
      }
    }
  }

  return icons;
};

const getHooks = () => {
  const hooksDir = path.join(UI_LIB_DIR, "hooks");
  const files = fs.readdirSync(hooksDir);
  const hooks = [];

  for (const file of files) {
    if (file !== "index.ts" && (file.endsWith(".ts") || file.endsWith(".tsx"))) {
      const hookName = file.replace(/\.(ts|tsx)$/, "");
      hooks.push({
        name: hookName,
        path: `./hooks/${hookName}`,
        exportName: hookName,
      });
    }
  }

  return hooks;
};

const getUtils = () => {
  const utilsDir = path.join(UI_LIB_DIR, "utils");
  const files = fs.readdirSync(utilsDir);
  const utils = [];

  for (const file of files) {
    if (file !== "index.ts" && file.endsWith(".ts") && !file.endsWith(".test.ts")) {
      const utilName = file.replace(".ts", "");
      utils.push({
        name: utilName,
        path: `./utils/${utilName}`,
        exportName: utilName,
      });
    }
  }

  return utils;
};

const generatePackageExports = (iconsDirName) => {
  const components = getComponents();
  const icons = getIcons(iconsDirName);
  const hooks = getHooks();
  const utils = getUtils();

  const exports = {
    "./tailwind-preset": {
      import: "./target/tailwind-preset.es.js",
      require: "./target/tailwind-preset.cjs.js",
      types: "./target/types/internal/tailwind/tailwind-preset.d.ts",
    },
    "./scss": "./target/assets/styles/main.scss",
  };

  for (const component of components) {
    const exportPath = `./components/${component.name}`;
    exports[exportPath] = {
      import: `./target/components/${component.name}.es.js`,
      require: `./target/components/${component.name}.cjs.js`,
      types: `./target/types/src/ui-lib/components/${component.name}.d.ts`,
    };
  }

  for (const icon of icons) {
    const exportPath = `./icons/${icon.exportName}`;
    exports[exportPath] = {
      import: `./target/icons/${icon.exportName}.es.js`,
      require: `./target/icons/${icon.exportName}.cjs.js`,
      types: `./target/types/src/ui-lib/${iconsDirName}/${icon.exportName}.d.ts`,
    };
  }

  for (const hook of hooks) {
    const exportPath = `./hooks/${hook.name}`;
    exports[exportPath] = {
      import: `./target/hooks/${hook.name}.es.js`,
      require: `./target/hooks/${hook.name}.cjs.js`,
      types: `./target/types/src/ui-lib/hooks/${hook.name}.d.ts`,
    };
  }

  for (const util of utils) {
    const exportPath = `./utils/${util.name}`;
    exports[exportPath] = {
      import: `./target/utils/${util.name}.es.js`,
      require: `./target/utils/${util.name}.cjs.js`,
      types: `./target/types/src/ui-lib/utils/${util.name}.d.ts`,
    };
  }

  return exports;
};

const generateViteEntries = (iconsDirName) => {
  const components = getComponents();
  const icons = getIcons(iconsDirName);
  const hooks = getHooks();
  const utils = getUtils();

  const entries = {
    "tailwind-preset": path.resolve(ROOT_DIR, "internal/tailwind/tailwind-preset.ts"),
  };

  for (const component of components) {
    entries[`components/${component.name}`] = path.resolve(
      UI_LIB_DIR,
      `components/${component.name}.tsx`
    );
  }

  for (const icon of icons) {
    entries[`icons/${icon.exportName}`] = path.resolve(
      UI_LIB_DIR,
      `${iconsDirName}/${icon.exportName}.ts`
    );
  }

  for (const hook of hooks) {
    const ext = fs.existsSync(path.resolve(UI_LIB_DIR, `hooks/${hook.name}.tsx`))
      ? ".tsx"
      : ".ts";
    entries[`hooks/${hook.name}`] = path.resolve(UI_LIB_DIR, `hooks/${hook.name}${ext}`);
  }

  for (const util of utils) {
    entries[`utils/${util.name}`] = path.resolve(UI_LIB_DIR, `utils/${util.name}.ts`);
  }

  return entries;
};

const updatePackageJson = (iconsDirName) => {
  const packageJsonPath = path.join(ROOT_DIR, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

  packageJson.exports = generatePackageExports(iconsDirName);

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");
  console.log("package.json updated");
};

const saveViteEntries = (iconsDirName) => {
  const entries = generateViteEntries(iconsDirName);
  const outputPath = path.join(__dirname, "../vite/entries.json");

  fs.writeFileSync(outputPath, JSON.stringify(entries, null, 2));
  console.log("Vite entries saved to", outputPath);
};

const main = () => {
  console.log("Generating exports...\n");

  const args = process.argv.slice(2);
  const iconsDir = args.includes("--icons-export") ? "icons-export" : "icons-free";

  const components = getComponents();
  const icons = getIcons(iconsDir);
  const hooks = getHooks();
  const utils = getUtils();

  console.log(`Found components: ${components.length}`);
  console.log(`Found icons: ${icons.length}`);
  console.log(`Found hooks: ${hooks.length}`);
  console.log(`Found utils: ${utils.length}\n`);

  updatePackageJson(iconsDir);
  saveViteEntries(iconsDir);

  console.log("\nDone!");
};

main();
