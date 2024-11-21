# auro-themeswitcher

## Properties

| Property          | Attribute         | Type    | Default                                          | Description                                      |
|-------------------|-------------------|---------|--------------------------------------------------|--------------------------------------------------|
| `buttonTag`       |                   |         |                                                  |                                                  |
| `checkboxTag`     |                   |         |                                                  |                                                  |
| `lockupTag`       |                   |         |                                                  |                                                  |
| `resetCheckmarks` | `resetCheckmarks` | `array` | false                                            |                                                  |
| `themes`          | `themes`          | `Array` | [{"label":"Auro Classic","url":"https://jetstream-rouge.vercel.app/themes/jetstream.css"},{"label":"Hawaiian","url":"https://jetstream-rouge.vercel.app/themes/californian.css"},{"label":"Readiness Test","url":"https://jetstream-rouge.vercel.app/themes/transparent.css"}] | This accepts an array of JSON object outlining the themes to support. |

## Methods

| Method             | Type                |
|--------------------|---------------------|
| `markLoadedthemes` | `(urls: any): void` |
