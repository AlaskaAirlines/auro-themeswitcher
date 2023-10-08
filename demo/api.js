// import { basicExample } from '../apiExamples/basic';

export function initThemeSwitcherApiExamples(initCount) {
  initCount = initCount || 0;

  try {
    // basicExample();
  } catch {
    if (initCount <= 20) {
      // setTimeout handles issue where content is sometimes loaded after the functions get called
      setTimeout(() => {
        initThemeSwitcherApiExamples(initCount + 1);
      }, 100);
    }
  }
}
