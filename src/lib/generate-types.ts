import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const args = process.argv.slice(2);
const getArg = (name: string) => {
  const index = args.filter((arg) => {
    return arg.includes(name);
  });
  return index[0].replace(`${name}=`, "");
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componetType = getArg("--type") ?? "UI";
const componetName = getArg("--name");
const componentPath = path.resolve(
  __dirname,
  `../components/${componetType}\/${componetName}/index.ts`
);

const js = fs.readFileSync(componentPath, "utf-8");
const jsdocRegex = /@attr(.*)\n/g;
const attrKeyRegex = /{.*} (.*)/;
const attrValueRegex = /{(.*)}/;

let groups: Record<string, string> = {};

let match;
while ((match = jsdocRegex.exec(js)) !== null) {
  const [, name] = match;
  const key = name.match(attrKeyRegex)![1];
  const value = name.match(attrValueRegex)![1];
  groups[key] = value;
}

const keys = Object.keys(groups);

const makeBlock = (indent: number) => {
  return keys.map((k) => `${" ".repeat(indent)}${k}: ${groups[k]};`).join("\n");
};

const block = makeBlock(2);

const output = `
export type ${componetName}Props {
${block}
}
`;

fs.appendFile(componentPath, output, (err) => {
  if (err) throw err;
});
