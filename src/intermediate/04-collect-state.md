---
title: Collect state in Compose
tier: intermediate
platform: android
position: 4
---

# Collect state in Compose

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Intermediate › Collect state in Compose

**Goal**

Collect the `StateFlow<UiState>` from the ViewModel inside a composable and branch on the result. After this page you have a screen that reacts to Loading, Content, and Error without any manual lifecycle handling.

**Prerequisites**

- [02 UiState and ViewModel](./02-uistate-and-viewmodel.md)
- [03 Async repository](./03-repository-async.md)
- [State with remember and mutableStateOf](../beginner/09-state.md)

## collectAsStateWithLifecycle

`collectAsStateWithLifecycle` (from `androidx.lifecycle:lifecycle-runtime-compose`) converts a `Flow` into a Compose `State`. It does two things a plain `collectAsState` cannot:

- It **stops collecting** when the composable's lifecycle owner (the Activity or Fragment) moves to the background, preventing wasted work while the app is not visible.
- It **resumes collecting** automatically when the lifecycle comes back to the foreground.

```kotlin
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel

@Composable
fun BookListScreen(
    viewModel: BookViewModel = viewModel(),
    onBookClick: (Int) -> Unit,
) {
    val state by viewModel.state.collectAsStateWithLifecycle()
    when (val s = state) {
        is UiState.Loading -> LoadingView()
        is UiState.Error   -> ErrorView(s.message, onRetry = viewModel::load)
        is UiState.Content -> BookList(s.books, onBookClick)
    }
}
```

The `when` expression is exhaustive because `UiState` is a sealed interface — the compiler rejects any missing branch.

`val s = state` captures the current value into a local variable so smart-casting works correctly inside each branch (Kotlin cannot smart-cast a `by`-delegated property directly).

## viewModel()

`viewModel()` (from `androidx.lifecycle:lifecycle-viewmodel-compose`) retrieves the nearest `BookViewModel` from the `ViewModelStore`. If none exists it constructs one. The instance survives recompositions and configuration changes (screen rotation) — the ViewModel is not recreated when the composable recomposes.

## What the three helpers are

`LoadingView`, `ErrorView`, and `BookList` are defined on the next page. They are plain composables; `BookListScreen` just selects which one to show.

**Next** → [05 Loading and error UI](./05-loading-error-ui.md)
