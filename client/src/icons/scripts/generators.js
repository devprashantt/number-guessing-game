import { writeFileSync } from "fs";

import { toPascalCase } from "./utils.js";

export const generateIconComponentFile = (icons, { dir }) => {
  const indexContent = [
    "import Icon from './Icon';",
    "",
    icons
      ?.map(
        (icon) =>
          `export const ${toPascalCase(
            icon,
          )} = props => <Icon {...props} name="${icon}" />;`,
      )
      .join("\n"),
  ].join("\n");

  writeFileSync(`${dir}/index.tsx`, indexContent);
  console.log(`Icon component file created! ✅`);
};

export const generateWebIconMap = (icons, { dir }) => {
  const iconMapContent = [
    icons
      ?.map(
        (icon) => `import ${toPascalCase(icon)} from './${icon}.svg?react';`,
      )
      .join("\n"),
    "",
    "export default {",
    icons?.map((icon) => `"${icon}": ${toPascalCase(icon)}, `).join("\n"),
    "};",
  ].join("\n");

  writeFileSync(`${dir}/IconMap.tsx`, iconMapContent);
  console.log("Web icon map created! ✅");
};
