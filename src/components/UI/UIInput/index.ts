import css from "./ui-input.css?raw";
import { BaseInternalElement } from "../../internal/BaseInternalElement";

/**
 * @element ui-input
 *
 * @description
 * ラベル付きの入力コンポーネント。
 * type を "textarea" にすると複数行入力になる。
 *
 * @attr {string} label-text
 * ラベルに表示するテキスト
 *
 * @attr {string} label-for
 * ラベルの for 属性に使う ID
 *
 * @attr {string} value
 * 入力値
 *
 * @attr {string} id
 * 入力要素の ID
 *
 * @attr {string} name
 * 入力要素の name
 *
 * @attr {string} type
 * 入力タイプ（"textarea" のときは textarea を表示）
 *
 * @attr {string} placeholder
 * プレースホルダー
 *
 * @attr {boolean} required
 * 必須入力かどうか（指定すると true）
 *
 * @attr {boolean} disabled
 * 無効化（指定すると true）
 */

type Attrs =
  | "label-text"
  | "label-for"
  | "value"
  | "id"
  | "name"
  | "type"
  | "placeholder"
  | "required"
  | "disabled";

export class UIInput extends BaseInternalElement<
  HTMLInputElement | HTMLTextAreaElement,
  Attrs
> {
  static override get observedAttributes() {
    return [
      "label-text",
      "label-for",
      "value",
      "placeholder",
      "id",
      "name",
      "type",
      "required",
      "disabled",
    ];
  }

  private inputId = `ui-input-${crypto.randomUUID()}`;
  private labelEl: HTMLLabelElement;
  private inputEl: HTMLInputElement;
  private textareaEl: HTMLTextAreaElement;
  private bound = false;

  constructor() {
    super({
      css,
      template: `
        <div class="ui-input-wrapper">
          <label class="ui-input-label"></label>
          <input class="ui-input"/>
          <textarea class="ui-textarea"></textarea>
        </div>
      `,
    });

    this.labelEl =
      this.root.querySelector<HTMLLabelElement>(".ui-input-label")!;
    this.inputEl = this.root.querySelector<HTMLInputElement>(".ui-input")!;
    this.textareaEl =
      this.root.querySelector<HTMLTextAreaElement>(".ui-textarea")!;
    this.control = this.inputEl;
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.bound) {
      this.inputEl.addEventListener("input", () => this.handleInput());
      this.inputEl.addEventListener("change", () => this.handleChange());
      this.textareaEl.addEventListener("input", () => this.handleInput());
      this.textareaEl.addEventListener("change", () => this.handleChange());
      this.bound = true;
    }
    this.syncFormState();
  }

  protected override update(): void {
    const type = (this.attr("type") ?? "text").toLowerCase();
    const isTextarea = type === "textarea";
    this.inputEl.hidden = isTextarea;
    this.textareaEl.hidden = !isTextarea;
    this.control = isTextarea ? this.textareaEl : this.inputEl;

    const controlId = this.attr("label-for") ?? this.attr("id") ?? this.inputId;
    this.labelEl.textContent = this.attr("label-text") ?? "";
    this.labelEl.htmlFor = controlId;
    this.updateRequiredTag();

    this.control.id = controlId;
    this.control.name = this.attr("name") ?? controlId;
    this.control.placeholder = this.attr("placeholder") ?? "";

    if (this.control instanceof HTMLInputElement) {
      this.control.type = isTextarea ? "text" : type || "text";
    }

    const valueAttr = this.attr("value");
    if (valueAttr !== null && this.control.value !== valueAttr) {
      this.control.value = valueAttr;
    }

    this.syncDisabled();
    this.syncFormState();
  }

  private syncFormState() {
    const fd = new FormData();
    fd.append(this.control.name, this.control?.value);
    this.setValue(fd);
    this.syncRequired();
  }

  private updateRequiredTag() {
    this.labelEl.querySelector(".required")?.remove();
    if (this.hasAttribute("required")) {
      const tag = document.createElement("span");
      tag.textContent = "必須";
      tag.classList.add("required");
      this.labelEl.appendChild(tag);
    }
  }

  private handleInput() {
    this.syncValueAttr();
    this.syncFormState();
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
  }

  private handleChange() {
    this.syncValueAttr();
    this.syncFormState();
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  }

  private syncValueAttr() {
    const value = this.control?.value ?? "";
    if (this.getAttribute("value") !== value) {
      this.setAttribute("value", value);
    }
  }

  formResetCallback() {
    this.control.value = "";
    this.removeAttribute("value");
    this.syncFormState();
  }
}
