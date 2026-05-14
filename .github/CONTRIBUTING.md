# Contributing

Thanks for helping keep the PaleNeØ Song Sorter up to date. The most common contribution is adding a new release. This guide walks you through that, plus a few smaller edits.

## Testing locally

The site uses ES modules, which require an HTTP server (won't work via `file://`).

### Before you begin

1. Install Node.js and NPM at https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
2. Run `npm install`

### Running in a local browser

1. Run `npm start`
2. To stop the server later press `Ctrl + C`. If the server won't stop, run `npm run stop` and it will kill whatever is bound to port 8000.

### Running unit tests

1. Run `npm run build`

`npm test` will catch most data-shape regressions before you push: missing required fields on an album entry, non-unique album ids, malformed song objects, broken `buildSongList` dedup, sort-engine misbehavior, etc. If you change anything in `js/songlist.js` or `js/sort.js`, run it.

## Image sizes

When adding new cover art or photos, target these dimensions. The site already displays at much smaller sizes, so larger sources just waste bandwidth.

| Image                        | Recommended                                | Reason                                                                                                      |
|------------------------------| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| Album covers                 | 600×600                                    | Largest on-page display is the 240px battle card; 600px gives 2× retina headroom. ~70KB after mozjpeg q=85. |
| Band photo (`bandphoto.png`) | 1200×1200 or 1200×630                      | Used as the `og:image` for Discord / Twitter / Slack embeds. Only loaded when someone shares the URL.       |
| Logo (`bandlogo.png`)        | ~500×500                                   | Displayed at 44px in the page header; retina-2x is 88px, so anything above ~200px is plenty.                |
| Favicon                      | 32×32 PNG + 144×144 `apple-touch-icon.png` | Standard browser tab and iOS home-screen sizes.                                                             |
