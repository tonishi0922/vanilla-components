import css from "./ui-divider.css?raw";
import { BaseElement } from "../../internal/BaseElement";

/**
 * @element ui-divider
 *
 * @description
 * セクション間を区切る水平ディバイダー。
 * variant と label で見た目を調整できる。
 *
 * @attr {"default"|"strong"} variant
 * ボーダーの太さ
 *
 * @attr {"horizontal"|"vertical"} orientation
 * ディバイダーの方向
 *
 * @attr {boolean} inset
 * 左右にインセットを付けるか（指定すると true）
 *
 * @attr {string} label
 * 区切り線に表示するラベル
 *
 * @csspart line
 * 区切り線本体
 *
 * @csspart label
 * ラベル要素
 */

type Attrs = "variant" | "orientation" | "inset" | "label";

export class UIDivider extends BaseElement<Attrs> {
  static override get observedAttributes() {
    return ["variant", "orientation", "inset", "label"];
  }

  constructor() {
    super({
      css,
      template: `
        <div class="divider" part="line"></div>  
        <span class="label" part="label"></span>
      `,
    });
  }

  protected override update(): void {
    const label = this.attr("label") ?? "";
    const labelEl = this.root.querySelector<HTMLSpanElement>(".label")!;
    labelEl.textContent = label;

    // ラベルの有無に応じてクラスを切り変える
    this.toggleClass("has-label", !!label);
  }

  protected toggleClass(name: string, on: boolean): void {
    const wrap = Array.from(this.root.children).find(
      (n) => !(n instanceof HTMLStyleElement)
    ) as HTMLElement | undefined;
    if (wrap) wrap.classList.toggle(name, on);
  }
}
