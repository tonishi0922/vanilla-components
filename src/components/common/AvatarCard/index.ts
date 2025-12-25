import css from "./avatar-card.css?raw";
import { BaseElement } from "../../internal/BaseElement";

/**
 * @element avatar-card
 *
 * @attr {string} name 表示される名前
 *
 * @attr {string} description 説明文
 *
 * @attr {string} imageSrc 画像ソース
 *
 * @attr {"vertical" | "horizontal"} orientation カードの要素を縦並びにするか横並びにするか
 *
 * @slot - カード内の要素
 */

type Attrs = "name" | "description" | "imageSrc" | "orientation";

export type AvatarCardProps = {
  name: string;
  description: string;
  imageSrc: string;
  links: { label: string; href: string }[];
};

export class AvatarCard extends BaseElement<Attrs> {
  static override get observedAttributes() {
    return ["name", "description", "imageSrc", "orientation"];
  }

  constructor() {
    super({
      css,
      template: `
        <ui-card class="avatar-card">
          <img id="avatar" alt="">
          <div>
            <h1 id="name"></h1>
            <p id="description"></p>
            <div class="links" id="links"></div>
          </div>
        </ui-card>
      `,
    });
  }

  connectedCallback() {
    this.update();
  }

  attributeChangedCallback() {
    this.update();
  }

  protected override update() {
    const name = this.attr("name") ?? "";
    const description = this.attr("description") ?? "";
    const imageSrc = this.attr("imageSrc") ?? "";
    const orientation = this.attr("orientation") ?? "horizontal";

    this.root.querySelector<HTMLHeadingElement>("#name")!.textContent = name;
    this.root.querySelector<HTMLParagraphElement>("#description")!.textContent =
      description;
    const img = this.root.querySelector<HTMLImageElement>("#avatar")!;
    img.src = imageSrc;
    img.alt = name ? `${name} avatar` : "avatar";

    const uiCard = this.root.querySelector("ui-card");
    if (uiCard) uiCard.setAttribute("orientation", orientation);
  }

  set links(list: { label: string; href: string }[]) {
    const box = this.root.querySelector<HTMLDivElement>("#links")!;
    box.replaceChildren();
    (list ?? []).forEach(({ label, href }) => {
      const a = document.createElement("a");
      a.href = href;
      a.textContent = label;
      a.target = "_blank";
      a.rel = "noreferrer";
      box.appendChild(a);
    });
  }

  get links(): { label: string; href: string }[] {
    const anchors = Array.from(
      this.root.querySelectorAll<HTMLAnchorElement>("#links a")
    );
    return anchors.map((a) => ({ label: a.textContent, href: a.href }));
  }
}
