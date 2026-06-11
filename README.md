# CV Website

Personal CV / portfolio website built with React and Vite.

## Getting started

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Editing content

All CV content (name, experience, projects, skills, links) lives in one file:
`src/data/cv.js`. Edit it and the whole site updates.

## Project structure

```
├── index.html              # HTML entry point
├── public/                 # static files served as-is (favicon, resume.pdf, ...)
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # page composition
    ├── data/
    │   └── cv.js           # all CV content (edit this!)
    ├── styles/
    │   ├── variables.css   # design tokens (colors, spacing, fonts)
    │   └── global.css      # resets and base styles
    ├── components/
    │   ├── primitives/     # reusable building blocks (Button, Card, Tag, Section)
    │   └── layout/         # Header, Footer
    ├── sections/           # page sections (Hero, About, Experience, ...)
    ├── hooks/              # custom React hooks (empty for now)
    └── assets/             # images imported by components
```
