# Saiashok Karadi portfolio

React portfolio with selected engineering work, two case studies and project-specific Three.js illustrations.

## Local preview

```sh
npm install
npm start
```

Open `http://localhost:3000/saiashok-portfolio/`. The CABS and Tile case studies also have direct URLs using `?case=cabs` and `?case=tile`.

## Checks

```sh
CI=true npm test -- --watch=false --runInBand
npm run build
```

## Publish

`npm run deploy` builds the site and publishes `build/` to the `gh-pages` branch. The `homepage` setting in `package.json` supplies the GitHub Pages base path.

Project results on the site come from the included CV. CABS diagrams are reconstructed from that CV. Tile artwork and behavior are based on the public [Tile repository](https://github.com/saiashok0981/tile); the interface diagram is labeled as a diagram, not a screenshot.
