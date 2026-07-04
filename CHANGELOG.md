# Changelog

All notable changes to the Android learning-docs site. Newest first.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## 2026-07-04 — Intermediate tier + CI

### Added
- **Intermediate tier** (`src/intermediate/`, 7 pages): extends the beginner
  one-screen Compose list into a real data flow — a `ViewModel` exposing
  `StateFlow<UiState>` (Loading/Content/Error), an async in-memory repository,
  loading/error UI, and tap-a-row → detail screen via Navigation Compose. Wired
  into the sidebar, nav, and home feature card.
- **`CLAUDE.md`** — public-safe repo conventions (tier/ladder pattern,
  frontmatter schema, add-a-page/tier steps, build commands, no-secrets rule).

### Changed
- **CI:** pinned Node to `26.4.0` (`.node-version` + `deploy` workflow).
- Corrected `when`-exhaustiveness wording on the collect-state page (compiler
  warns, not rejects, for a `when` statement).

## 2026-06 — Beginner tier + refresh

### Added
- **Beginner tier**: numbered ladder building one Kotlin/Jetpack Compose screen
  rendering a hard-coded book list in a `LazyColumn`.
- Hub back-link on the home page.

### Changed
- Bumped VitePress to 1.6.4; bumped deprecated GitHub Actions.

## 2023 — Initial documentation

### Added
- Initial Android docs site (VitePress): Kotlin basics, variables/data types,
  operators, functions/lambdas, classes/enums/generics, and Jetpack Compose
  layout basics; deploy workflow to GitHub Pages.
