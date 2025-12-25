import css from "./ui-stack.css?raw";
import { BaseElement } from "../../internal/BaseElement";

/**
 * @element ui-stack
 *
 * @description
 * 子要素を縦横に並べるスタックコンポーネント。
 * gap/align/justify/wrap でレイアウトを調整できる。
 *
 * @attr {"vertical"|"horizontal"} orientation
 * stack 内の子要素を垂直方向に並べるか水平方向に並べるか
 *
 * @attr {number} gap
 * stack 内の子要素間の gap
 *
 * @attr {"start"|"center"|"end"} align
 * stack 内の要素の上下配置
 *
 * @attr {"start"|"center"|"end"|"between"|"around"|"evenly"} justify
 * stack 内の横の配置
 *
 * @attr {"wrap"|"nowrap"|"wrap-reverse"} wrap
 * 子要素の折り返し
 *
 * @attr {number} padding
 * 内側余白（--p-{n} を参照）
 *
 * @attr {number} margin
 * 外側余白（--p-{n} を参照）
 *
 * @slot
 * stack 内の要素
 */

type Attrs =
  | "orientation"
  | "gap"
  | "align"
  | "wrap"
  | "justify"
  | "padding"
  | "margin";

export class UIStack extends BaseElement<Attrs> {
  static override get observedAttributes() {
    return ["orientation", "gap", "align", "justify", "wrap"];
  }

  constructor() {
    super({
      css,
      template: `
        <div class="ui-stack"><slot></slot></div>
      `,
    });
  }

  protected override update(): void {
    const uiStack = this.root.querySelector<HTMLDivElement>(".ui-stack")!;
    uiStack.className = "ui-stack";

    const o = (this.attr("orientation") ?? "horizontal").toLowerCase();
    uiStack.classList.add(o === "horizontal" ? "horizontal" : "vertical");

    const gap = Number(this.attr("gap")) ?? 0;
    if (gap) uiStack.style.setProperty("--_space", `var(--space-${gap})`);

    const align = (this.attr("align") ?? "").toLowerCase();
    if (align) uiStack.classList.add(`align-${align}`);

    const wrap = (this.attr("wrap") ?? "").toLowerCase();
    if (wrap) uiStack.classList.add(`${wrap}`);

    const justify = (this.attr("justify") ?? "").toLowerCase();
    if (justify) uiStack.classList.add(`justify-${justify}`);

    const margin = Number(this.attr("margin")) ?? 0;
    const padding = Number(this.attr("padding")) ?? 0;
    this.style.setProperty("--_margin", `var(--p-${margin})`);
    this.style.setProperty("--_padding", `var(--p-${padding})`);
  }
}
