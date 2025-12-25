import css from "./ui-container.css?raw";
import { BaseElement } from "../../internal/BaseElement";

/**
 * @element ui-container
 *
 * @description
 * コンテンツの最大幅と余白を制御するコンテナコンポーネント。
 *
 * @attr {boolean} full-height
 * 要素を画面高さいっぱいに表示するか（指定すると true）
 *
 * @attr {number} gap
 * 子要素間の間隔（--space-{n} を参照）
 *
 * @slot
 * コンテナ内の要素
 */

type Attrs = "full-height" | "gap";

export class UIContainer extends BaseElement<Attrs> {
  static override get observedAttributes() {
    return ["full-height"];
  }
  constructor() {
    super({
      css,
      template: `
        <div class="ui-container"><slot></slot></div>
      `,
    });
  }

  protected override update(): void {
    const uiContainer = this.root.querySelector(".ui-container")!;

    uiContainer.classList.toggle(
      "full-height",
      this.hasAttribute("full-height")
    );

    const gap = this.attr("gap") ?? 0;
    this.style.setProperty("--_gap", `var(--space-${gap})`);
  }
}
