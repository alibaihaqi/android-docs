---
title: Why state
tier: intermediate
platform: android
position: 1
---

# Why state

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Intermediate › Why state

**Goal**

Understand why a hard-coded list is not enough for a real app, and what unidirectional data flow solves. After this page you will have the vocabulary to follow the ViewModel and StateFlow pages.

**Prerequisites**

- [One-screen list app](../beginner/11-one-screen-list-app.md) (beginner exit artifact)

## The problem with hard-coded data

In the beginner tier you built a screen backed by a plain Kotlin `val`:

```kotlin
val library = listOf(
    Book("The Pragmatic Programmer", "Hunt & Thomas"),
    // …
)
```

That list never changes while the app runs. Three things break the moment real data enters the picture.

**Loading takes time.** Network calls, database queries, and file reads complete milliseconds to seconds after the screen first draws. There is no slot in a plain `val` to represent "not ready yet" — the screen either shows stale data or crashes on a null value.

**Operations can fail.** The network can be down. The database can reject a query. A hard-coded list sidesteps this entirely. Real code must show an error state and let the user retry.

**Data can change.** A user action (pull-to-refresh, a background sync, a real-time update) might replace the list entirely. Compose redraws only when state changes, so you need state — not a plain value — to drive the UI.

## Unidirectional data flow

Android's answer is a single direction: **data flows down, events flow up**.

```
Repository  →  ViewModel  →  UiState  →  Composable
                   ↑                           |
                   └──────── user event ───────┘
```

- The **repository** owns the source of truth (network, database, or in-memory stub).
- The **ViewModel** fetches from the repository, maps the result into a `UiState`, and exposes it as a `StateFlow`.
- The **composable** collects the flow and renders whichever state is current.
- **User events** (button taps, retry clicks) call back into the ViewModel, which triggers a new fetch.

Each arrow in that diagram is the subject of one page in this tier. The pages build on each other; the exit artifact is on page 07.

**Next** → [02 UiState and ViewModel](./02-uistate-and-viewmodel.md)
