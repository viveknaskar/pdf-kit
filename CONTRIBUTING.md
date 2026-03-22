# Contributing to pdf-kit

Thank you for your interest in contributing! All contributions — bug reports, feature requests, and pull requests — are welcome.

## Getting Started

**Prerequisites**
- Node.js v18 or later (v24 LTS recommended)
- npm (bundled with Node.js)
- Git

**Setting Up**
1. Fork the repository and clone your fork
2. Run `npm install` to install dependencies
3. Run `npm run dev` and open `http://localhost:3000`

---

## Project Structure

```
pdf-kit/
├── public/                   # Static assets (favicon, og-image, screenshots)
├── src/
│   ├── styles/
│   │   ├── base.css          # CSS reset, variables, typography
│   │   ├── layout.css        # Header, footer, hero, tool grid
│   │   ├── components.css    # Cards, buttons, dropzones, progress bars
│   │   └── tools.css         # Canvas editor, page previews, toolbars
│   ├── core/
│   │   ├── App.js            # App shell HTML, routing, navigation
│   │   ├── DropZone.js       # Drag-and-drop file handling
│   │   └── Utils.js          # Shared utility functions
│   ├── tools/                # One file per tool, each exports init()
│   └── main.js               # Entry point — imports and initializes all tools
├── tests/
│   ├── unit/                 # Vitest unit tests (Utils.js)
│   └── e2e/                  # Puppeteer E2E tests
├── index.html
├── vite.config.js
├── vitest.config.js
└── vitest.e2e.config.js
```

---

## Development Workflow

**Branch Naming**

| Prefix | Use for |
|---|---|
| `feature/` | New features or enhancements |
| `fix/` | Bug fixes |
| `docs/` | Documentation only |
| `refactor/` | Code cleanup with no behaviour change |

**Making Changes**
1. Create a branch: `git checkout -b feature/your-feature-name`
2. Make your changes, following existing patterns in `src/tools/` and `src/core/`
3. Run `npm run build` (must pass with no errors) before committing
4. Run the tests — see [Testing](#testing) below
5. Commit using [Conventional Commits](https://www.conventionalcommits.org/) — common prefixes: `feat`, `fix`, `docs`, `refactor`, `chore`
6. Push and open a Pull Request

---

## Adding a New Tool

1. Create `src/tools/YourTool.js` and export an `init()` function that binds event listeners
2. Add the tool view HTML inside `toolViewsHTML()` in `src/core/App.js`
3. Add a tool card to the appropriate section grid in the home view (also in `App.js`)
4. Import and call `init()` in `src/main.js`

---

## Testing

```bash
# Unit tests (Utils.js)
npm test

# Unit tests in watch mode
npm run test:watch

# E2E tests (requires no other process on port 5173)
npm run test:e2e
```

Unit tests use [Vitest](https://vitest.dev/) with happy-dom. E2E tests use Vitest + [Puppeteer](https://pptr.dev/) and spin up a Vite dev server automatically.

---

## Types of Contributions

**Bug Reports** — Please include steps to reproduce, expected vs actual behaviour, browser + OS, and a screenshot/recording if visual.

**Feature Requests** — Please describe the problem, your proposed solution, and alternatives considered.

**Pull Requests** — Before submitting, ensure:
- `npm run build` passes with no errors
- Tests pass (`npm test`)
- New tool logic lives in its own file under `src/tools/`
- No new runtime dependencies are added without prior discussion

---

## Code Style

- **Vanilla JS only** — no frontend framework; plain HTML, CSS, and ES modules
- **One tool per file** — each file under `src/tools/` exports a single `init()` function
- **Shared logic belongs in `Utils.js`** — keep tool files focused on their own behaviour
- **No new dependencies** for things the browser already provides (Canvas API, FileReader, URL.createObjectURL, etc.)
- **All processing must remain client-side** — files must never leave the user's device

---

## Getting Help

Open a [GitHub Issue](https://github.com/viveknaskar/pdf-kit/issues) for bugs or questions.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
