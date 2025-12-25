import css from "./ui-card.css?raw";
import { BaseElement } from "../../internal/BaseElement";

/**
 * @element ui-card
 *
 * @description
 * コンテンツをまとめるカードコンポーネント。
 * orientation 属性でレイアウト方向を切り替えられる。
 *
 * @attr {"vertical"|"horizontal"} orientation
 * カード内の要素を縦並びにするか横並びにするか
 *
 * @slot
 * カード内の要素
 */

type Attrs = "orientation";

export class UICard extends BaseElement<Attrs> {
  static override get observedAttributes() {
    return ["orientation"];
  }

  constructor() {
    super({
      css,
      template: `
        <div class="ui-card"><slot></slot></div>
      `,
    });
  }
}
