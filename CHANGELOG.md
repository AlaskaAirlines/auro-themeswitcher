# Semantic Release Automated Changelog

# [2.0.0](https://github.com/AlaskaAirlines/auro-themeswitcher/compare/v1.5.0...v2.0.0) (2024-11-21)


### Bug Fixes

* disable theme application in extension, never disable reset, conditionally disable apply ([0c886c4](https://github.com/AlaskaAirlines/auro-themeswitcher/commit/0c886c410cd4d5995ef7e42c7af8e140b33fad23))
* use correct `detail` name for event config ([1518afa](https://github.com/AlaskaAirlines/auro-themeswitcher/commit/1518afa4cc27b3997a8499b94219598e49cedd97))


### Features

* barebones local extension development support ([1e43883](https://github.com/AlaskaAirlines/auro-themeswitcher/commit/1e43883c904700cb13437e8ea086c4ea8014e9ca))
* consume theme-selected event in extension ([a8c66ac](https://github.com/AlaskaAirlines/auro-themeswitcher/commit/a8c66ac50f6d9bc38fb8aa408b0fcc62c1ec0fe5))
* explore content injection via Chrome extension manifest ([d0df6e5](https://github.com/AlaskaAirlines/auro-themeswitcher/commit/d0df6e5fcf2e7db1fcd3e10a9c743ec58cc315bb))
* surface theme-selected event ([22205d4](https://github.com/AlaskaAirlines/auro-themeswitcher/commit/22205d4a2f7941c0b7d08fc9305ff92b62326bf8))


### BREAKING CHANGES

* The themes selected _do not_ get applied to the Chrome extension window, as the readiness test completely destroys the view since every auro component used is themeable (results in a blank window that looks like it broke).

# [1.5.0](https://github.com/AlaskaAirlines/auro-themeswitcher/compare/v1.4.0...v1.5.0) (2024-07-27)


### Features

* make themeswitcher itself theme enabled ([#16](https://github.com/AlaskaAirlines/auro-themeswitcher/issues/16)) ([c4d869e](https://github.com/AlaskaAirlines/auro-themeswitcher/commit/c4d869e7d62136878d1dcf3e5ddd5f35bace19ec))

# [1.4.0](https://github.com/AlaskaAirlines/auro-themeswitcher/compare/v1.3.0...v1.4.0) (2024-07-27)


### Features

* add additional theme option ([#15](https://github.com/AlaskaAirlines/auro-themeswitcher/issues/15)) ([ec40845](https://github.com/AlaskaAirlines/auro-themeswitcher/commit/ec40845a3eb3e2997549089c04332da62c818268))

# [1.3.0](https://github.com/AlaskaAirlines/auro-themeswitcher/compare/v1.2.0...v1.3.0) (2024-01-24)


### Features

* **theme:** add jetstream scoped theme ([8e4fed9](https://github.com/AlaskaAirlines/auro-themeswitcher/commit/8e4fed9f3da39ce69e11a6473a09829abcc3c8c3))

# [1.2.0](https://github.com/AlaskaAirlines/auro-themeswitcher/compare/v1.1.0...v1.2.0) (2024-01-17)


### Features

* **theme:** add night scoped theme ([5683d95](https://github.com/AlaskaAirlines/auro-themeswitcher/commit/5683d95684ae8f7a6d0c9e852370414e6b9a745e))

# [1.1.0](https://github.com/AlaskaAirlines/auro-themeswitcher/compare/v1.0.4...v1.1.0) (2024-01-17)


### Bug Fixes

* **linters:** add linter exception ([8e92ef6](https://github.com/AlaskaAirlines/auro-themeswitcher/commit/8e92ef62b00cc566a92e57205c0465257d215853))


### Features

* **theme:** add retro theme to picker ([76f23bd](https://github.com/AlaskaAirlines/auro-themeswitcher/commit/76f23bdab8c6a49d6a3fde610af997c71a19a0f2))

## [1.0.4](https://github.com/AlaskaAirlines/auro-themeswitcher/compare/v1.0.3...v1.0.4) (2024-01-12)


### Bug Fixes

* **dense:** correct typo of dense theme url ([312ab10](https://github.com/AlaskaAirlines/auro-themeswitcher/commit/312ab10a72524161d114cdee6e770ea985271357))

## [1.0.3](https://github.com/AlaskaAirlines/auro-themeswitcher/compare/v1.0.2...v1.0.3) (2024-01-12)


### Bug Fixes

* **themes:** correct theme name ([b0b75ec](https://github.com/AlaskaAirlines/auro-themeswitcher/commit/b0b75eca671152fe6f7b4cad0009a9f6c6b44c1b))

## [1.0.2](https://github.com/AlaskaAirlines/auro-themeswitcher/compare/v1.0.1...v1.0.2) (2024-01-12)


### Bug Fixes

* **themes:** add newest theme references ([7be3af1](https://github.com/AlaskaAirlines/auro-themeswitcher/commit/7be3af18691f23b215e356fc95d24dd2f26bd344))

## [1.0.1](https://github.com/AlaskaAirlines/auro-themeswitcher/compare/v1.0.0...v1.0.1) (2024-01-11)


### Bug Fixes

* **themes:** remove Auro themes from themes we can add / remove ([86fcbcd](https://github.com/AlaskaAirlines/auro-themeswitcher/commit/86fcbcd597e72e06be499ec56d6fa7c944da913d))

# 1.0.0 (2024-01-10)


### Features

* **API:** add all initial API features and docs ([67f2f7a](https://github.com/AlaskaAirlines/auro-themeswitcher/commit/67f2f7aff0a699d5c42bd4b624635c366343e5ce))
