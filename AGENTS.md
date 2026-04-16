# Agent Guide: scratch-www

## AI-assisted development policy

See [CONTRIBUTING.AI.md](https://github.com/scratchfoundation/.github/blob/main/CONTRIBUTING.AI.md) for Scratch's
org-wide policy on AI-assisted contributions. The short version: human developers remain responsible for all code
they submit. Do not submit code you cannot explain and defend in a review.

## Agent defaults

Use these defaults unless the user asks otherwise:

1. Keep changes minimal and scoped to the user request. Do not refactor surrounding code, add features, or clean up
   style in areas you weren't asked to touch.
2. Do not preserve backward compatibility when it isn't required. scratch-www is an application rather than a
   published library, so all callers are internal — update call sites directly rather than adding shims or aliases.
3. Write comments that explain the current code, not its history. Do not reference prior implementations,
   intermediate states, or what the code "used to do." If an approach seems counterintuitive, explain why it is
   correct now — not why it changed.
4. Prefer fixing root causes over adding surface-level workarounds or assertions.
5. When fixing a bug, start by adding one or more failing tests that reproduce it, then implement the fix. Iterate
   until all tests pass, including but not limited to the new tests. Write new tests with Jest, not Tap — the
   Tap-based tests in `test/unit-legacy/` and `test/localization-legacy/` are legacy; do not add to them.
6. When adding runtime guards for states that should never happen, log actionable context (function name, relevant
   IDs, key flags) rather than failing silently. Use `console.warn` for recoverable states and `console.error` for
   invalid required data.
7. Preserve failure semantics when refactoring. An implicit crash (null dereference) should become an explicit
   `throw` with a useful message — not silent failure. Code that previously wouldn't crash still shouldn't, but
   consider whether a warning is warranted. Replacing a potential null dereference with `if (!foo) return` could
   make a bug harder to find; `if (!foo) throw new Error(...)` surfaces it.
8. Do not add error handling, fallbacks, or validation for scenarios that cannot happen. Trust internal code and
   framework guarantees. Only validate at system boundaries (user input, external APIs).

## What this repository is

`scratch-www` is the React/Redux web client for Scratch. It renders the public-facing Scratch website: the home
page, project pages, studio pages, user profiles, registration flow, and similar site content.

It is a multi-page application: `src/routes.json` enumerates the pages, and Webpack produces one bundle per page.
The app communicates with the Scratch API and is deployed as static assets behind a CDN.

## Build and lint

```sh
npm run build         # Compile and bundle all pages → build/
npm start             # Start dev server (hot reload)
npm run test          # Full check: lint → build → unit tests
npm run test:lint     # ESLint only (no build, no unit tests)
npm run test:unit     # Generate translations, then run Jest + Tap unit tests
npm run test:unit:jest   # Jest unit tests only
npm run test:unit:tap    # Legacy Tap unit tests only
npm run translate     # Extract and compile localization strings
```

Run `npm run test:lint` first when iterating — it is fast. Run `npm run test` before declaring work done.

Integration tests (`test/integration/`) require a running Scratch environment and are not expected to pass in a
standard local development setup; do not run or fix them unless explicitly asked.

## Repository layout

```text
src/
├── components/    Reusable React UI components (one subdirectory per component)
├── lib/           Utility modules: API helpers, session, validation, i18n polyfills
├── redux/         Redux reducers and action creators (one file per feature slice)
├── views/         Top-level page components (one subdirectory per route)
├── routes.json    Route → entry-point mapping used by Webpack
├── l10n.json      Generated locale message catalog (do not edit by hand)
├── main.scss      Global styles
└── _colors.scss   Shared color variables
test/
├── unit/          Jest tests (preferred for new tests)
├── unit-legacy/   Tap tests (legacy; do not add to these)
├── localization/  Jest localization tests
└── localization-legacy/  Tap localization tests (legacy)
```

## npm workflow

Use `npm ci` to install existing dependencies so you get the exact versions in `package-lock.json`.

When adding or updating a dependency, run `npm install some-package@version` to update both `package.json` and
`package-lock.json` together.

Keep each section of `package.json` (e.g., `dependencies`, `devDependencies`, `scripts`) in alphabetical order.

## React and component patterns

- Each component lives in its own subdirectory under `src/components/` with a `.jsx` file and a `.scss` module.
- Prefer functional components with hooks over class components for new code.
- Keep components presentational when possible; connect to Redux only in `src/views/` or dedicated container files.
- Use `react-intl` / `FormattedMessage` for any user-visible text. Do not hardcode English strings in JSX.
- CSS class names use BEM-like conventions scoped to the component SCSS module.

## Redux patterns

- Reducers live in `src/redux/`, one file per feature slice.
- Action types are string constants defined and exported from the same file as the reducer.
- Use Redux Thunk for async action creators that hit the Scratch API.
- Do not introduce new global state for data that is only needed within a single component tree.

## Internationalization

- All user-visible strings must have entries in the component's translation file or in `src/lib/l10n.json`.
- Never pass raw English strings as `defaultMessage` without a corresponding `id`.
- After adding or changing messages, run `npm run translate` to regenerate `src/l10n.json`. Do not edit `l10n.json`
  directly.

## JavaScript style

scratch-www is JavaScript (not TypeScript) — migrating to TypeScript is a future goal, but new code in this repo
should be consistent with the existing JavaScript codebase. Favor clarity and consistency with surrounding code:

- Use ES6+ features: `const`/`let`, arrow functions, template literals, destructuring, `async`/`await`.
- Prefer `??` over `|| fallback` for null/undefined fallbacks.
- Do not leave promises floating. Either `await`, return, or prefix with `void` to explicitly discard.
- Avoid `var`. Do not shadow outer-scope variables.
- Keep `no-unused-vars` clean: remove dead imports and locals rather than leaving them commented out.

## Testing guidelines

- New unit tests go in `test/unit/` and use Jest with jsdom.
- Test files mirror the source tree: a test for `src/lib/foo.js` lives at `test/unit/lib/foo.test.js`.
- Mock external API calls and Redux stores; do not make real network requests from unit tests.
- Do not delete or modify legacy Tap tests unless explicitly asked. They cover old behavior and the Tap runner is
  being phased out on its own timeline.
- Selenium integration tests require a live environment — do not attempt to run or repair them locally.

## Before submitting changes

Review all changes and confirm:

- **Scope**: Changes are confined to the user request; nothing extra was added or modified.
- **Correctness**: Logic is sound and edge cases were considered.
- **Comments**: Comments are necessary, short, and clear; self-explanatory code has none.
- **Simplicity**: Implementation is as simple as possible; no speculative abstractions remain.
- **Documentation**: Update `AGENTS.md` and any other documentation files whose content is affected by the change
  (commands, repo structure, conventions, etc.).
- **Strings**: Any new user-visible text uses `react-intl` and has been added to the message catalog.
- **No `l10n.json` hand-edits**: If messages changed, run `npm run translate` to regenerate it.
- **Build passes**: `npm run build` completes successfully.
- **Tests pass**: `npm run test` completes with no failures.
- **No lint errors**: `npm run test:lint` passes.
