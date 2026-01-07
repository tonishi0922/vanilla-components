import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { define } from "../../../lib/define";
import { UIButton } from ".";
import type { ButtonProps } from ".";

const meta: Meta<ButtonProps> = {
  title: "UI/UIButton",
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["default", "small", "large"] },
    variant: { control: "select", options: ["primary", "secondary", "danger"] },
    justify: { control: "select", options: ["start", "center", "end"] },
    type: { control: "select", options: ["button", "submit", "reset"] },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
  render: (args) => {
    define("ui-button", UIButton);
    const el = document.createElement("ui-button");

    if (args.size) el.setAttribute("size", args.size);
    if (args.variant) el.setAttribute("variant", args.variant);
    if (args.justify) el.setAttribute("justify", args.justify);
    if (args.type) el.setAttribute("type", args.type);
    if (args.disabled) el.setAttribute("disabled", "");

    el.textContent = args.label ?? "Button";

    return el;
  },
};

export default meta;

type Story = StoryObj<ButtonProps>;

export const Default: Story = {
  args: {
    label: "Button",
    size: "default",
  },
};
