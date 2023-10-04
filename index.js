import { AuroThemeswitcher } from './src/auro-themeswitcher';

/**
 * Register Custom Element.
 * @param {Object} name - Name to use for custom element.
 * @returns {void}
 */
 const registerComponent = (name = 'custom-themeswitcher') => {
  // alias definition
  if (!customElements.get(name)) {
    customElements.define(name, class extends AuroThemeswitcher {});
  }
}

export { registerComponent }
