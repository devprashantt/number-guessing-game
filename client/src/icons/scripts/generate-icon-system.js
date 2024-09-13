import { generateWebIconMap, generateIconComponentFile } from "./generators.js";

import { readdirSync } from "fs";
import { isSVG, removeExtension } from "./utils.js";

// path from root
const ICON_SOURCE_FOLDER = "./src/icons/assets";
const ICON_OUTPUT_FOLDER = "./src/icons";

const icons = readdirSync(ICON_SOURCE_FOLDER)
  .filter(isSVG)
  ?.map(removeExtension);

try {
  generateIconComponentFile(icons, { dir: ICON_OUTPUT_FOLDER });
  generateWebIconMap(icons, { dir: ICON_SOURCE_FOLDER });
} catch (e) {
  console.error("Error generating icon system", e);
}
