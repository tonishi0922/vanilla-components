import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { define } from "../../../lib/define";
import { UIInput } from "./index";
import type { UIInputProps } from "./index";

const meta: Meta<UIInputProps> = {
  title: "UI/UIInput",
  tags: ["autodocs"],
  argTypes: {
    labelText: { name: "label-text", control: "text" },
    labelFor: { control: "text" },
    value: { control: "text" },
    id: { control: "text" },
    name: { control: "text" },
    type: {
      control: "select",
      options: ["text", "number", "email", "password", "textarea"],
    },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  render: (args) => {
    define("ui-input", UIInput);
    const el = document.createElement("ui-input");

    if (args.labelText) el.setAttribute("label-text", args.labelText);
    if (args.labelFor) el.setAttribute("label-for", args.labelFor);
    if (args.id) el.setAttribute("id", args.id);
    if (args.name) el.setAttribute("name", args.name);
    if (args.type) el.setAttribute("type", args.type);
    if (args.required) el.setAttribute("required", "");
    if (args.disabled) el.setAttribute("disabled", "");

    return el;
  },
};

export default meta;

type Story = StoryObj<UIInputProps>;

export const Default: Story = {
  args: {},
};
