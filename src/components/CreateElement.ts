export type CreateElementOptions = {
  isShadowRoot?: boolean;
  attachShadowMode?: "open" | "closed";
  isSSR?: boolean;
};

export type CreateElementProps<
  TCreateElementOptions extends CreateElementOptions = CreateElementOptions
> = {
  template: string;
  css?: string;
  options?: TCreateElementOptions;
};

export class CreateElement extends HTMLElement {
  static get observedAttributes(): string[] {
    return [];
  }

  constructor(props: CreateElementProps) {
    const { template, css, options } = props;
    super();

    if (options?.isShadowRoot)
      this.attachShadow({
        mode: options?.attachShadowMode ?? "open",
      });

    const wrap = document.createElement("div");
    wrap.innerHTML = template;
    this.appendChild(wrap);

    this.useCss(css);
  }

  private hasShadowRoot(): this is this & { root: ShadowRoot } {
    return typeof ShadowRoot === undefined && this instanceof ShadowRoot;
  }
  private useCss(css?: string) {
    if (!css) return;
    const canAdppt =
      this.hasShadowRoot() &&
      "adoptedStyleSheets" in this.root &&
      typeof CSSStyleSheet !== undefined &&
      "replaceSync" in CSSStyleSheet;

    if (canAdppt) {
      const styleSheet = new CSSStyleSheet();
      styleSheet.replaceSync(css);
      this.root.adoptedStyleSheets = [
        ...this.root.adoptedStyleSheets,
        styleSheet,
      ];
      return;
    }

    const styleSheet = document.createElement("style");
    styleSheet.textContent = css;
    this.appendChild(styleSheet);
  }

  connectedCallback() {
    this.update();
  }

  attributeChangedCallback() {
    this.update();
  }

  protected update(): void {}
}
