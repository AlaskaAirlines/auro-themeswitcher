// TEMP FILE TO EXPLORE FUNCTIONALITY :)

console.log('Extension Started');


const css = `
    body { background-color: red !important; color: white !important; }
    `;

const getTabId = async () => {
  const queryOptions = {
    active: true,
    currentWindow: true
  };
  const [tab] = await chrome.tabs.query(queryOptions);

  return tab.id;
};

(async () => {
  const tabId = await getTabId();
  console.log('Tab ID:', tabId);

  chrome.scripting
    .insertCSS({
      target: {tabId},
      css,
    })
    .then(() => console.log("CSS injected"));
})();
