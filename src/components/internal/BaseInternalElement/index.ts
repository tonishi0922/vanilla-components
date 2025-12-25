import { BaseElement } from "../BaseElement";
import type { BaseInit } from "../BaseElement";

export abstract class BaseInternalElement<
  TControl extends HTMLElement,
  TAttrs extends string = never
> extends BaseElement<TAttrs> {
  static formAssociated = true;
  protected internals: ElementInternals;
  protected control!: TControl;

  constructor(init?: BaseInit) {
    super(init);
    this.internals = this.attachInternals();
  }

  protected setValue(value: string | File | FormData | null) {
    this.internals.setFormValue(value);
  }

  protected setValidity(valid: boolean, message = "") {
    this.internals.setValidity(
      valid ? {} : { valueMissing: true },
      valid ? "" : message
    );
  }

  protected syncRequired() {
    if (this.hasAttribute("required")) {
      const value = (this.control as any).value ?? "";
      this.setValidity(!!value, "必須項目です");
    }
  }

  protected syncDisabled() {
    if ("disabled" in this.control) {
      (this.control as any).disabled = this.hasAttribute("disabled");
    }
  }
}
