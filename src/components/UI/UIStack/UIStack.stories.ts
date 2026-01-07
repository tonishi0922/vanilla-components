import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { define } from "../../../lib/define";
import { UIStack } from ".";
import type { UIStackProps } from ".";
import { background, color } from "storybook/theming";

const meta: Meta<UIStackProps> = {
  title: "Stack/UIStack",
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["vertical", "horizontal"] },
    gap: { control: "number" },
    align: { control: "select", options: ["start", "center", "end"] },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between", "around", "evenly"],
    },
    wrap: { control: "select", options: ["wrap", "nowrap", "wrap-reverse"] },
    padding: { control: "number" },
    margin: { control: "number" },
  },
  render: (args) => {
    define("ui-stack", UIStack);
    const el = document.createElement("ui-stack");

    if (args.orientation) el.setAttribute("orientation", args.orientation);
    if (args.gap !== undefined) el.setAttribute("gap", String(args.gap));
    if (args.align) el.setAttribute("align", args.align);
    if (args.justify) el.setAttribute("justify", args.justify);
    if (args.wrap) el.setAttribute("wrap", args.wrap);
    if (args.padding !== undefined)
      el.setAttribute("padding", String(args.padding));
    if (args.margin !== undefined)
      el.setAttribute("margin", String(args.margin));

    const items: {
      width?: string;
      height?: string;
      backgroundColor: string;
    }[] = [
      { backgroundColor: "red" },
      { backgroundColor: "blue" },
      { backgroundColor: "green" },
    ];
    items.forEach(({ width = "360px", height = "300px", backgroundColor }) => {
      const div = document.createElement("div");
      div.style.cssText = `
        width: ${width};
        height: ${height};
        background-color: ${backgroundColor};
      `;
      el.appendChild(div);
    });
    return el;
  },
};

export default meta;

type Story = StoryObj<UIStackProps>;

export const Default: Story = {
  args: {},
};
