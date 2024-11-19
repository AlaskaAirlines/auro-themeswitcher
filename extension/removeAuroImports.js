// --------------------------------------------------
// TEMP FILE TO EXPLORE FUNCTIONALITY :)
//
// This script is run on load, and does some prep
// work for the theme switcher.
// --------------------------------------------------

console.log('Extension Started - removing existing auro theme tags');

const scripts = document.head.querySelectorAll('script');

/** @type {Array<HTMLScriptElement>} */
const relevantScripts = [];
for (const script of scripts) {
  console.log(script.src);
  if (script.src.includes('auro') || script.src.includes('webcore')) {
    relevantScripts.push(script);
  }
}

console.log(relevantScripts);

const allLinkTags = document.head.querySelectorAll('link');

/** @type {Array<HTMLLinkElement>} */
const relevantLinkTags = [];
for (const linkTag of allLinkTags) {
  console.log(linkTag.href);
  if (linkTag.href.includes('auro') || linkTag.href.includes('webcore')) {
    relevantLinkTags.push(linkTag);
  }
}

console.log(relevantLinkTags);
