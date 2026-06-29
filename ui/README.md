# Plant DB Local UI

Local Linux UI for browsing and visualizing the remote GitHub plant database.

The app does **not** use a local database. It fetches JSON from:

```text
https://raw.githubusercontent.com/git-rupavlov/plant-db/main/public-data/index.json
```

## Requirements

- Linux
- Node.js 20+
- npm
- Internet access to GitHub raw content

## Install on Ubuntu / Debian

```bash
sudo apt update
sudo apt install -y nodejs npm
node --version
npm --version
```

If your distro ships an old Node.js version, use NodeSource, nvm, or your preferred grown-up package chaos method.

## Run

From the repository root:

```bash
cd ui
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:5173
```

## Build

```bash
npm run build
npm run preview
```

## What it does

- Fetches the remote Plant DB index from GitHub
- Lists available species
- Loads selected plant JSON on demand
- Renders:
  - phenology timeline with Apache ECharts
  - temperature suitability chart with Apache ECharts
  - lifecycle diagram with Mermaid
  - cultivar and stress response tables

## What it does not do

- It does not clone the repo.
- It does not use SQLite.
- It does not store canonical data locally.
- It does not write to GitHub.

Local cache may be added later, but cache must remain disposable and non-authoritative. Tiny but important distinction, because otherwise humans reinvent sync bugs and call it architecture.
