// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { LitElement, html } from "lit";
import styleCss from "./style-css.js";

/**
 * @attr {Array} themes - This accepts an array of JSON object outlining the themes to support.
 */

/* eslint-disable max-statements, one-var, no-magic-numbers */
export class AuroThemeswitcher extends LitElement {

  constructor() {
    super();
    this.themes = [
      {
        label: 'Dense',
        url: 'https://jetstream-rouge.vercel.app/themes/dense.css'
      },
      {
        label: 'Californian',
        url: 'https://jetstream-rouge.vercel.app/themes/californian.css'
      },
      {
        label: 'Night',
        url: 'https://jetstream-rouge.vercel.app/themes/night.css'
      },
      {
        label: 'Orange',
        url: 'https://jetstream-rouge.vercel.app/themes/orange.css'
      }
    ];

    // {
    //   label: 'Auro 4.x',
    //   url: 'https://cdn.jsdelivr.net/npm/@alaskaairux/design-tokens@latest/dist/tokens/CSSCustomProperties.css'
    // },
    // {
    //   label: 'Auro 5.x',
    //   url: 'https://cdn.jsdelivr.net/npm/@aurodesignsystem/design-tokens@latest/dist/tokens/CSSCustomProperties.css'
    // },

    /**
     * @private
     */
    this.disableApply = true;

    /**
     * @private
     */
    this.currentTheme = [];

    /**
     * @private
     */
    this.newTheme = [];

    /**
     * @private
     */
    this.loadedThemes = [];
  }

  static get styles() {
    return [styleCss];
  }

  static get properties() {
    return {
      themes:        {
        type: Array
      },
      currentTheme: {
        type: Array
      },
      newTheme: {
        type: Array
      },
      disableApply: {
        type: Boolean,
        reflect: true
      }
    };
  }

  /**
   * @private
   * @returns {void} Determines which themes are loaded in the DOM.
   */
  getLoadedThemes() {
    this.loadedThemes = [];
    const stylesheets = document.styleSheets;

    this.themes.forEach((theme) => {
      for (let i = 0; i < stylesheets.length; i++) { // eslint-disable-line id-length, no-plusplus
        if (stylesheets[i].href === theme.url) {
          this.loadedThemes.push(theme);
        }
      }
    });
  }

  /**
   * @private
   * @returns {void} Removes all loaded themes from the DOM.
   */
  unloadThemes() {
    this.themes.forEach((theme) => {
      if (this.loadedThemes.includes(theme)) {
        try {
          const loadedTheme = document.querySelector(`link[rel=stylesheet][href='${theme.url}']`);

          loadedTheme.parentNode.removeChild(loadedTheme);
        } catch (err) {
          console.warn('Auro Theme Switcher - unable to remove previously loaded theme(s).'); // eslint-disable-line no-console
        }
      }
    });
  }

  /**
   * @private
   * @returns {void} Loads all selected themes into the DOM.
   */
  loadSelectedthemes() {
    const head = document.getElementsByTagName("head")[0]; // eslint-disable-line prefer-destructuring

    this.currentTheme = this.newTheme;

    this.currentTheme.forEach((theme) => {
      const themeObj = JSON.parse(theme);
      const link = document.createElement("link");

      link.setAttribute('theme', themeObj.label);
      link.rel = "stylesheet";
      link.href = themeObj.url;

      head.appendChild(link);
    });
  }

  /**
   * @private
   * @param {Object} evt - Event fired by clicking on the checkbox.
   * @returns {void} Adds or removes the themes from the list to be applied.
   */
  handleCheckboxSelection(evt) {
    if (evt.target.checked) {
      const themeIndex = this.newTheme.indexOf(evt.target.value);

      if (themeIndex === -1) {
        this.newTheme.push(evt.target.value);
      }
    } else {
      const themeIndex = this.newTheme.indexOf(evt.target.value);

      if (themeIndex > -1) {
        this.newTheme.splice(themeIndex, 1);
      }
    }

    this.requestUpdate();
    this.handleApplyBtnState();
  }

  /**
   * @private
   * @returns {void} Toggles disabled state of the apply button based on theme selection.
   */
  handleApplyBtnState() {
    this.getLoadedThemes();

    if (JSON.stringify(this.loadedThemes) === JSON.stringify(this.newTheme)) {
      this.disableApply = true;
    } else {
      this.disableApply = false;
    }
  }

  /**
   * @private
   * @returns {void} Applies selected themes.
   */
  applyThemes() {
    this.disableApply = true;

    this.toggleThemeSwitcher();
    this.unloadThemes();
    this.loadSelectedthemes();
  }

  /**
   * @private
   * @returns {void} Marks all loaded themes as selected in the checkbox group.
   */
  markLoadedthemes() {
    this.loadedThemes.forEach((theme) => {
      const checkboxes = this.shadowRoot.querySelector('auro-dialog').querySelectorAll('auro-checkbox');

      checkboxes.forEach((checkbox) => {
        if (checkbox.id === theme.label) {
          checkbox.setAttribute('checked', true);

          this.newTheme.push(checkbox.getAttribute('value'));
          this.currentTheme.push(checkbox.getAttribute('value'));
        }

        this.requestUpdate();
      });
    });
  }

  /**
   * @private
   * @returns {void} Toggles display of the themeswitcher dialog.
   */
  toggleThemeSwitcher() {
    const dialog = this.shadowRoot.querySelector('#auroThemeSwitcherDialog');

    dialog.hasAttribute('open') // eslint-disable-line no-unused-expressions
      ? dialog.removeAttribute("open")
      : (dialog.removeAttribute("open"),
      dialog.setAttribute("open", true));
  }

  firstUpdated() {
    this.dropdown = this.shadowRoot.querySelector('#auroThemeSelector');

    this.getLoadedThemes();
    this.markLoadedthemes();
  }

  render() {
    return html`
      <div>
        <auro-button aria-label="Theme Switcher" @click="${this.toggleThemeSwitcher}" part="trigger">
          <slot></slot>
        </auro-button>
        <auro-dialog id="auroThemeSwitcherDialog" part="dialog">
          <span slot="header">Theme Switcher</span>
          <div slot="content">
            <div class="selector">
              <span slot="legend">
                Choose which themes to apply:
              </span>
              <auro-checkbox-group required>
                ${this.themes.map((theme) => html`
                  <auro-checkbox
                    value="${JSON.stringify(theme)}"
                    name="${theme.label}"
                    id="${theme.label}"
                    @auroCheckbox-input="${this.handleCheckboxSelection}">
                    ${theme.label}
                  </auro-checkbox>
                `)}
              </auro-checkbox-group>
            </div>
            ${this.disableApply ? undefined : html`
              <div slot="footer" className="auro_containedButtons">
                <div class="applicator">
                  ${this.newTheme.length === 0 ? html`
                    <p>
                      No themes are selected. Clicking the APPLY buttton will render the page with no theme styles.
                    </p>
                  ` : html`
                    <p>
                      Clicking the APPLY button will remove all current themes and apply the selected themes in the following order:
                    </p>
                    <ol>
                      ${this.newTheme.map((theme) => html`<li>${JSON.parse(theme).label}</li>`)}
                    </ol>
                  `}

                  <auro-button
                    @click="${this.applyThemes}"
                    ?disabled="${this.disableApply}">
                    APPLY
                  </auro-button>
                </div>
              </div>
            `}
          </div>
        </auro-dialog>
      </div>
    `;
  }
}

// default internal definition
if (!customElements.get("auro-themeswitcher")) {
  customElements.define("auro-themeswitcher", AuroThemeswitcher);
}
