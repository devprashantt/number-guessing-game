export const isSVG = (file) => /.svg$/.test(file);

export const removeExtension = (file) => file.split(".")[0];

export const toPascalCase = (string) =>
  string
    .match(/[a-z0-9]+/gi)
    ?.map((word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
    .join("");

export const toCamelCase = (string) =>
  string
    .match(/[a-z0-9]+/gi)
    ?.map((word, index) =>
      index === 0
        ? word
        : word.charAt(0).toUpperCase() + word.substr(1).toLowerCase(),
    )
    .join("");

export const toSnakeCase = (string) =>
  string
    .match(/[a-z0-9]+/gi)
    ?.map((word, index) => (index === 0 ? word : `_${word}`.toLowerCase()))
    .join("");
