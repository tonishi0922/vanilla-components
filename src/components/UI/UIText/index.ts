import css from "./ui-text.css?raw";
import { BaseElement } from "../../internal/BaseElement";

/**
 * @element ui-text
 *
 * @description
 * テキスト表示用のシンプルなコンポーネント。
 * size と weight で文字の見た目を調整できる。
 *
 * @attr {number} size
 * フォントサイズ（--fs-{n} を参照）
 *
 * @attr {string} weight
 * フォントウェイト
 *
 * @slot
 * テキスト内容
 */

type Attrs = "size" | "weight";

export class UIText extends BaseElement<Attrs> {
  static override get observedAttributes() {
    return ["size", "weight"];
  }

  constructor() {
    super({
      css,
      template: `
        <p class="ui-text">
          <slot></slot>
        </p>
      `,
    });
  }

  connectedCallback(): void {
    this.root
      .querySelector("slot")!
      .addEventListener("slotchange", () => this.update());
  }

  protected override update(): void {
    const size = this.attr("size") ?? 2;
    const weight = this.attr("weight") ?? "normal";
    this.style.setProperty("--_font-size", `var(--fs-${size})`);
    this.style.setProperty("--_font-weight", `var(--fs-${weight}`);
  }
}
