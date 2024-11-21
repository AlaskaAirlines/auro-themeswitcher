// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

/* eslint-disable complexity, lit/binding-positions, lit/no-invalid-html */

import { LitElement } from "lit";
import { html } from 'lit/static-html.js';
import styleCss from "./style-css.js";

import { AuroDependencyVersioning } from '@aurodesignsystem/auro-library/scripts/runtime/dependencyTagVersioning.mjs';
import { AuroCheckbox } from '@aurodesignsystem/auro-checkbox/src/auro-checkbox.js';
import checkboxVersion from './checkboxVersion';
import { AuroButton } from '@aurodesignsystem/auro-button/src/auro-button.js';
import buttonVersion from './buttonVersion';
import { AuroLockup } from '@aurodesignsystem/auro-lockup/src/auro-lockup.js';
import lockupVersion from './lockupVersion';
import '@aurodesignsystem/auro-icon';

/**
 * @param {{label: string; url: string}[]} themes - The list of supported themes in JSON format.
 * @return {CustomEvent<{themes: {label: string; url: string}[]}>}
 * @constructor
 */
const createThemeSelectionEvent = (themes) => new CustomEvent('theme-selected', {
  detail: {
    themes
  },
  // Allow the event to bubble up through the DOM
  bubbles: true,
  // Allow the event to cross shadow DOM boundaries
  composed: true
});

const ressetThemeSelectionEvent = () => new CustomEvent('theme-reset', {
  // Allow the event to bubble up through the DOM
  bubbles: true,
  // Allow the event to cross shadow DOM boundaries
  composed: true
});

/**
 * @attr {Array} themes - This accepts an array of JSON object outlining the themes to support.
 */

/* eslint-disable max-statements, one-var, no-magic-numbers, max-lines */
export class AuroThemeswitcher extends LitElement {

  constructor() {
    super();
    this.themes = [
      {
        label: 'Auro Classic',
        url: 'https://jetstream-rouge.vercel.app/themes/jetstream.css'
      },
      {
        label: 'Hawaiian',
        url: 'https://jetstream-rouge.vercel.app/themes/californian.css'
      },
      {
        label: 'Readiness Test',
        url: 'https://jetstream-rouge.vercel.app/themes/transparent.css'
      }
    ];

    /**
     * @private
     */
    this.disableApply = true;

    /**
     * @private
     */
    this.currentThemes = [];

    /**
     * @private
     */
    this.newTheme = [];

    /**
     * @private
     */
    this.loadedThemes = [];

    this.resetCheckmarks = false;

    /**
     * Generate unique names for dependency components.
     */
    const versioning = new AuroDependencyVersioning();
    this.checkboxTag = versioning.generateTag('auro-checkbox', checkboxVersion, AuroCheckbox);
    this.buttonTag = versioning.generateTag('auro-button', buttonVersion, AuroButton);
    this.lockupTag = versioning.generateTag('auro-lockup', lockupVersion, AuroLockup);
  }

  static get styles() {
    return [styleCss];
  }

  static get properties() {
    return {
      themes:        {
        type: Array
      },
      currentThemes: {
        type: Array
      },
      newTheme: {
        type: Array
      },
      disableApply: {
        type: Boolean,
        reflect: true
      },
      resetCheckmarks: {
        type: Array
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
   * @returns {void} Forces a theme reset.
   */
  resetThemes() {
    this.unloadThemes(true);
    this.disableApply = true;
  }

  /**
   * @private
   * @param {boolean} reset - Determines if the themes should be reset.
   * @returns {void} Removes all loaded themes from the DOM.
   */
  unloadThemes(reset = false) {
    if (reset) {
      this.currentThemes = [];
      this.newTheme = [];
      const checkboxes = this.shadowRoot.querySelectorAll('[auro-checkbox]');

      checkboxes.forEach((checkbox) => {
        checkbox.removeAttribute('checked');
      });
    }

    this.dispatchEvent(ressetThemeSelectionEvent());
  }

  /**
   * @private
   * @returns {void} Loads all selected themes into the DOM.
   */
  loadSelectedthemes() {
    this.currentThemes = this.newTheme;
    this.dispatchEvent(createThemeSelectionEvent(this.currentThemes));
  }

  /**
   * @private
   * @param {Event} evt - Event fired by clicking on the checkbox.
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
    this.disableApply = false;
  }

  /**
   * @private
   * @returns {void} Applies selected themes.
   */
  applyThemes() {
    this.unloadThemes();
    this.loadSelectedthemes();
    this.disableApply = true;
  }

  /**
   * @param {string[]} urls - The list of theme URLs to mark as selected.
   * @returns {void} Marks all loaded themes as selected in the checkbox group.
   */
  markLoadedthemes(urls) {
    const checkboxes = this.shadowRoot.querySelectorAll('[auro-checkbox]');

    checkboxes.forEach((checkbox) => {
      const optionUrl = JSON.parse(checkbox.getAttribute('value')).url;

      if (urls.includes(optionUrl)) {
        checkbox.setAttribute('checked', true);
      }
    });
  }

  /**
   * @private
   * @returns {void} Toggles display of the themeswitcher dialog.
   */
  toggleThemeSwitcher() {
    const dialog = this.shadowRoot.querySelector('').querySelector('#auroThemeSwitcherDialog');

    dialog.hasAttribute('open') // eslint-disable-line no-unused-expressions
      ? dialog.removeAttribute("open")
      : (dialog.removeAttribute("open"),
      dialog.setAttribute("open", true));
  }

  firstUpdated() {
    this.dropdown = this.shadowRoot.querySelector('#auroThemeSelector');
  }

  render() {
    return html`
      <div>
        <${this.lockupTag}>
          <span slot="title">Auro</span>
          <span slot="subtitle">design system</span>
        </${this.lockupTag}>
        <p>
          This utility is a theme switcher for the purpose of validating the look and feel of a page with the chosen theme applied.
        </p>
        <div class="selector">
          <auro-checkbox-group required>
            ${this.themes.map((theme) => html`
              <${this.checkboxTag}
                value="${JSON.stringify(theme)}"
                name="${theme.label}"
                id="${theme.label}"
                @auroCheckbox-input="${this.handleCheckboxSelection}">
                ${theme.label}
              </${this.checkboxTag}>
            `)}
          </auro-checkbox-group>
          <${this.buttonTag}
            variant="tertiary"
            @click="${this.resetThemes}"
            class="resetBtn">
            RESET
          </${this.buttonTag}>
          <${this.buttonTag}
            class="applyBtn"
            @click="${this.applyThemes}"
            ?disabled="${this.disableApply}">
            APPLY
          </${this.buttonTag}>
          <p class="finePrint">
            The Readiness Test theme is for use in testing which elements
            on the rendered page are not styled by the theme. Once applied,
            the theme will hide (make transparent) all rendered elements
            that will correctly respond to a published theme.
            Any elements that are still seen on the page
            are using color value that should be updated to the latest
            design token definintions or are Auro components that should
            be updatd to the latest version.
          </p>
        </div>
        ${this.disableApply ? undefined : html`
          <div class="applicator">
            ${this.newTheme.length === 0 ? html`
              <p>
                No themes are selected. Clicking the APPLY buttton will render the page with no theme styles.
              </p>
            ` : html`
              <p>
                Clicking the APPLY button will remove all current applied themes and apply the selected themes in the following order:
              </p>
              <ol>
                ${this.newTheme.map((theme) => html`<li>${JSON.parse(theme).label}</li>`)}
              </ol>
            `}
            <${this.buttonTag}
              @click="${this.applyThemes}"
              ?disabled="${this.disableApply}">
              APPLY
            </${this.buttonTag}>
          </div>
        `}
      </div>
    `;
  }
}

// default internal definition
if (!customElements.get("auro-themeswitcher")) {
  customElements.define("auro-themeswitcher", AuroThemeswitcher);
}
