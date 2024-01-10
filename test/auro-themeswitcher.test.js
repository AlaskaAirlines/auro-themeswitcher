import { fixture, html, expect } from '@open-wc/testing';
import '../src/auro-themeswitcher';

describe('auro-themeswitcher', () => {
  // it('sets the CSS class on auro-themeswitcher > div element', async () => {
  //   const el = await fixture(html`
  //     <auro-themeswitcher cssclass="testClass"></auro-themeswitcher>
  //   `);

  //   const div = el.shadowRoot.querySelector('div');
  //   expect(div.className).to.equal('testClass');
  // });

  // it('auro-themeswitcher is accessible', async () => {
  //   const el = await fixture(html`
  //     <auro-themeswitcher cssclass="testClass"></auro-themeswitcher>
  //   `);

  //   await expect(el).to.be.accessible();
  // });

  it('auro-themeswitcher custom element is defined', async () => {
    const el = await !!customElements.get("auro-themeswitcher");

    await expect(el).to.be.true;
  });
});
