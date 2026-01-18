import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { define } from "../../../lib/define";
import { UIContainer } from ".";
import type { UIContainerProps } from ".";

const meta: Meta<UIContainerProps> = {
  title: "UI/UIContainer",
  tags: ["autodocs"],
  argTypes: {
    fullHeight: { control: "boolean" },
    gap: { control: "number" },
  },
  render: (args) => {
    define("ui-container", UIContainer);
    const el = document.createElement("ui-container");

    if (args.fullHeight) el.setAttribute("full-height", "");
    if (args.gap) el.setAttribute("gap", String(args.gap));

    const div = document.createElement("div");
    div.style.backgroundColor = "blue";
    div.style.width = "360px";

    el.appendChild(div);

    return el;
  },
};

export default meta;

type Story = StoryObj<UIContainerProps>;

export const Default: Story = {
  args: {},
};
