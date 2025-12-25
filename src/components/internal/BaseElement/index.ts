export type BaseInit = {
  css?: string;
  template?: string;
  mode?: ShadowRootMode;
};

export abstract class BaseElement<
  TAttrs extends string = never
> extends HTMLElement {
  protected readonly root: ShadowRoot;
  protected sheet?: CSSStyleSheet;
  protected styleEl?: HTMLStyleElement;

  static get observedAttributes(): string[] {
    return [];
  }

  constructor(init?: BaseInit) {
    super();
    this.root = this.attachShadow({ mode: init?.mode ?? "open" });
    if (init?.css) {
      this.useCss(init.css);
    }
    if (init?.template) {
      const wrap = document.createElement("div");
      wrap.innerHTML = init.template;
      this.root.appendChild(wrap);
    }
  }

  /** CSS を ShadowDOMに適用する  */
  protected useCss(cssText: string) {
    //.  adoptedStyleSheet が使えるならそちらを優先する
    if (
      "adoptedStyleSheets" in this.root &&
      "replaceSync" in CSSStyleSheet.prototype
    ) {
      this.sheet = new CSSStyleSheet();
      this.sheet.replaceSync(cssText);

      (this.root as any).adoptedStyleSheets = [
        ...((this.root as any).adoptedStyleSheets ?? []),
        this.sheet,
      ];
    } else {
      // fallback として <style> に直接 CSS を書き込む
      this.styleEl = this.styleEl ?? document.createElement("style");
      this.styleEl.textContent = cssText;
      // 先頭に設置
      if (!this.styleEl.isConnected) this.root.prepend(this.styleEl);
    }
  }

  /** 継承先で DOM を反映する */
  protected update(): void {}

  /** 要素が追加されたタイミングで実行 */
  connectedCallback() {
    this.update();
  }

  /** ObservedAttributes のプロパティに変更があった場合に反映 */
  attributeChangedCallback() {
    this.update();
  }

  /** 型安全のためのヘルパー関数 */
  protected attr<K extends TAttrs>(name: K): string | null {
    return this.getAttribute(name as string);
  }

  /** ShadowDOM の中身を Style 以外削除する Util 関数 */
  protected replaceContent(html: string) {
    const nodes = Array.from(this.root.childNodes);
    nodes.forEach((n) => {
      if (!(n instanceof HTMLStyleElement)) n.remove();
    });
    const wrap = document.createElement("div");
    wrap.innerHTML = html;
    this.root.appendChild(wrap);
  }
}
