import css from "./ui-title.css?raw";
import { BaseElement } from "../../internal/BaseElement";

/**
 * @element ui-title
 *
 * @description
 * 見出し用のコンポーネント。
 * heading-level で h1〜h6 を切り替えられる。
 *
 * @attr {1|2|3|4|5|6} heading-level
 * 見出しレベル（1〜6）
 *
 * @attr {number} size
 * フォントサイズ（--fs-{n} を参照）
 *
 * @attr {string} weight
 * フォントウェイト
 *
 * @attr {string} title
 * テキスト内容（指定すると slot の代わりに使用）
 *
 * @slot
 * 見出しの内容
 */

type Attrs = "heading-level" | "size" | "weight" | "title";

export class UITitle extends BaseElement<Attrs> {
  static override get observedAttributes() {
    return ["heading-level", "size", "weight", "title"];
  }

  constructor() {
    super({
      css,
      template: `<slot></slot>`,
    });
  }

  protected override update(): void {
    const title = this.attr("title") ?? "";
    const level = Number(this.attr("heading-level") ?? 2);
    const safeLevel = Math.min(6, Math.max(1, level));

    if (title) {
      this.replaceContent(`<h${safeLevel}>${title}</h${safeLevel}>`);
    }

    const size = this.attr("size") ?? 2;
    const weight = this.attr("weight") ?? "normal";
    this.style.setProperty("--_font-size", `var(--fs-${size})`);
    this.style.setProperty("--_font-weight", `var(--fs-${weight}`);
  }
}
