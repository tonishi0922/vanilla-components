import css from "./ui-image.css?raw";
import { BaseElement } from "../../internal/BaseElement";

/**
 * @element ui-image
 *
 * @description
 * 画像とキャプションを表示するコンポーネント。
 * isBackground を指定すると背景画像として表示する。
 *
 * @attr {string} src
 * 画像のソース
 *
 * @attr {string} alt
 * 画像の代替テキスト
 *
 * @attr {string} caption
 * 画像のキャプション
 *
 * @attr {boolean} isBackground
 * 背景画像化を行うか（指定すると true）
 *
 */

type Attrs = "src" | "alt" | "caption" | "isBackground";

export class UIImage extends BaseElement<Attrs> {
  static override get observedAttributes() {
    return ["src", "alt", "caption", "isBackground"];
  }

  constructor() {
    super({
      css,
      template: `
        <figure class="ui-figure">
          <img class="ui-img" />
          <figcaption class="ui-caption"></figcaption>
        </figure>
      `,
    });
  }

  protected override update(): void {
    const src = this.attr("src") ?? "";
    const alt = this.attr("alt") ?? "";
    const caption = this.attr("caption") ?? "";
    const isBackground = this.hasAttribute("isBackground");

    const uiFigure = this.root.querySelector<HTMLElement>(".ui-figure")!;
    const img = uiFigure.querySelector<HTMLImageElement>(".ui-img")!;
    const figcaption = uiFigure.querySelector<HTMLElement>(".ui-caption")!;

    if (!isBackground) {
      uiFigure.classList.remove("ui-background-img");
      img.style.display = "";
      figcaption.style.display = "";

      img.src = src;
      img.alt = alt;
      figcaption.textContent = caption;
    } else {
      uiFigure.classList.add("ui-background-img");
      img.style.display = "none";
      figcaption.style.display = caption ? "" : "none";

      uiFigure.style.backgroundImage = `url(${src})`;
      uiFigure.setAttribute("aria-label", alt);
    }
  }
}
