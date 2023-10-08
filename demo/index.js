// import { basicExample } from '../apiExamples/basic';

export function initThemeSwitcherIndexExamples(initCount) {
  initCount = initCount || 0;

  try {
    // basicExample();
  } catch {
    if (initCount <= 20) {
      // setTimeout handles issue where content is sometimes loaded after the functions get called
      setTimeout(() => {
        initThemeSwitcherIndexExamples(initCount + 1);
      }, 100);
    }
  }
}
