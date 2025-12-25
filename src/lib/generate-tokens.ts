import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const globalTokensPath = path.resolve(__dirname, "../styles/global-tokens.css");
const aliasTokensPath = path.resolve(__dirname, "../styles/alias-tokens.css");
const args = process.argv.slice(2);
const getArg = (name: string) => {
  const index = args.indexOf(name);
  return index !== -1 ? args[index + 1] : null;
};

if (getArg("--input"))
  console.log("Reading input data is: ", getArg("--input"));
if (getArg("--output")) console.log("Output data is: ", getArg("--output"));

const input = getArg("--input") ?? globalTokensPath;
const output = getArg("--output") ?? aliasTokensPath;
console.log("Input:", input);
console.log("Output:", output);

const css = fs.readFileSync(globalTokensPath, "utf-8");

const tokenRegex = /--([a-z0-9-_]+)-(light|dark):/g;

let groups: Record<string, { light?: string; dark?: string }> = {};

let match;
while ((match = tokenRegex.exec(css)) !== null) {
  const [, name, modeRaw] = match;
  const mode = modeRaw as "light" | "dark";
  groups[name] ??= {};
  groups[name][mode] = `var(--${name}-${mode})`;
}

const keys = Object.keys(groups);

const makeBlock = (indent: number) => (mode: "light" | "dark") =>
  keys
    .map((k) => `${" ".repeat(indent)}--${k}: ${groups[k][mode]};`)
    .join("\n");

const block = makeBlock(2);
const mediaBlock = makeBlock(4);

const cssOutput = `
:root[data-theme="light"] {
${block("light")}
}

:root[data-theme="dark"] {
${block("dark")}
}

:root {
${block("light")}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
${mediaBlock("dark")}
  }
}
`;

fs.writeFileSync(output, cssOutput);
console.log("generated!!");
