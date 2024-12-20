/**
 * This is the "main" script - it has access to both the chrome API, and the DOM (via chrome API).
 * This script listens for the `theme-selected` event from the auro-themeswitcher element, and then
 * injects the selected themes into the current tab.
 */

const getTabId = async () => {
  const queryOptions = {
    active: true,
    currentWindow: true
  };
  const [tab] = await chrome.tabs.query(queryOptions);

  return tab.id;
};

const themeSwitcher = document.querySelector('auro-themeswitcher');

themeSwitcher.addEventListener('theme-selected', async (event) => {
  /** @type {Array<{label: string; url: string;}>} **/
  const themeArr = event.detail.themes.map((theme) => JSON.parse(theme));
  const tabId = await getTabId();

  await chrome.scripting.executeScript({
    target: { tabId },
    func: (themes) => {
      // Access the real DOM within the page context
      const links = document.head.querySelectorAll('link[data-id^="theme-switcher-link-"]');

      // Remove old theme links
      for (const link of links) {
        link.remove();
      }

      // Add new themes
      for (const themeEntry of Object.entries(themes)) {
        const [
          ident,
          theme
        ] = themeEntry;
        document.head.insertAdjacentHTML(
          'beforeend',
          `<link data-id="theme-switcher-link-${ident}" rel="stylesheet" href="${theme.url}"/>`
        );
      }
    },
    args: [themeArr]
  });
});

themeSwitcher.addEventListener('theme-reset', async () => {
  console.warn('resetting themes'); // eslint-disable-line no-console

  const tabId = await getTabId();

  await chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      // Access the real DOM within the page context
      const links = document.head.querySelectorAll('link[data-id^="theme-switcher-link-"]');

      // Remove old theme links
      for (const link of links) {
        link.remove();
      }
    }
  }); 
});

(async () => {
  const tabId = await getTabId();

  const returnVal = await chrome.scripting.executeScript({
    target: { tabId },
    func: () => {
      console.warn('executing markLoadedThemes'); // eslint-disable-line no-console

      const links = document.head.querySelectorAll('link[data-id^="theme-switcher-link-"]');
    
      let urls = [];

      links.forEach((link) => {
        urls.push(link.href);
      });


      return urls;
    }
  });

  themeSwitcher.markLoadedthemes(returnVal[0].result);
})()
