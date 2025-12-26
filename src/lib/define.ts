export const define = (name: string, ctor: CustomElementConstructor) => {
  customElements.get(name) || customElements.define(name, ctor);
};
