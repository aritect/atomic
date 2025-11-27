import fs from "fs";
import path from "path";
import { parse } from "svgson";

if (process.argv.length < 4) {
  console.error("Usage: node generate-icons.mjs <svg-directory> <output-directory>");
  process.exit(1);
}

const svgDirectory = process.argv[2];
const outputDirectory = process.argv[3];

const ordinalToWord = (name) => {
  const ordinalMap = {
    "1st": "First",
    "2nd": "Second",
    "3rd": "Third",
    "3-d": "ThreeD",
    "4-k": "FourK",
  };

  return name.replace(/\b(1st|2nd|3rd|3-d|4-k)\b/g, (match) => ordinalMap[match] || match);
}

function convertFileNameToComponentName(fileName) {
  const normalized = ordinalToWord(fileName);

  const upperCamelCase = normalized
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

  return upperCamelCase + "Icon"
}

async function convertSvgToJsObject(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      parse(data).then(json => {
        const elements = json.children.map((element, index) => {
          let attributes = Object.entries(element.attributes)
            .filter(([key]) => !["xmlns", "xmlns:xlink", "xml:space", "stroke", "fill", "clip"].some(attr => key.startsWith(attr)))
            .map(([key, value]) => `${key}: "${value}"`)
            .join(", ");

          if (element.attributes.fill) {
            attributes += `, fill: "currentColor"`;
          }

          if (element.attributes.stroke) {
            attributes += `, stroke: "currentColor"`;
          }

          if (element.attributes["fill-rule"]) {
            attributes += `, fillRule: "${element.attributes["fill-rule"]}"`;
          }

          return `["${element.name}", { ${attributes}, key: "k${index}" }]`;
        });

        resolve(elements);
      });
    });
  });
}

function normalizeVariantName(fileName) {
  const parts = fileName.split("-");
  return parts.slice(-2).join(".").replace(".svg", "");
}

async function processDirectory(directory) {
  const icons = {};

  const files = fs.readdirSync(directory);
  for (const file of files) {
    const baseIconName = file.split("-").slice(0, -2).join("-");
    const componentName = convertFileNameToComponentName(baseIconName);
    const variantName = normalizeVariantName(file);

    if (!icons[componentName]) {
      icons[componentName] = {};
    }

    const filePath = path.join(directory, file);
    icons[componentName][variantName] = await convertSvgToJsObject(filePath);
    console.log(`${filePath} has been processed.`);
  }

  const indexArray = [];
  for (const [componentName, variants] of Object.entries(icons)) {
    let output = `import { createIconComponent } from "@/utils-ui-lib/create-icon-component";\n\n`;
    output += `const ${componentName} = createIconComponent("${componentName}", {\n`;

    for (const [variantName, elements] of Object.entries(variants)) {
      output += `  "${variantName}": [${elements.join(", ")}],\n`;
    }

    output += `});\n\nexport default ${componentName};\n`;

    const fileName = `${componentName}.ts`.replace(/([A-Z])/g, "-$1").toLowerCase().substring(1); // Convert to kebab-case
    fs.writeFileSync(path.join(outputDirectory, fileName), output);
    console.log(`${fileName} has been saved.`);

    indexArray.push(`export { default as ${componentName} } from "./${fileName.replace(".ts", "")}";`);
  }

  fs.writeFileSync(path.join(outputDirectory, "index.ts"), indexArray.join("\n"));
}

processDirectory(svgDirectory).then(r => console.log("All icons have been processed."));
