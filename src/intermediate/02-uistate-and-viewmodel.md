---
title: UiState and ViewModel
tier: intermediate
platform: android
position: 2
---

# UiState and ViewModel

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Intermediate › UiState and ViewModel

**Goal**

Define the sealed `UiState` interface and a `BookViewModel` that drives it with a `StateFlow`. After this page you have the state container the remaining pages wire up to a real screen.

**Prerequisites**

- [01 Why state](./01-why-state.md)
- [Classes and data classes](../beginner/05-classes.md)

## The data model

The beginner `Book` had two fields. The intermediate version adds an `id` so Navigation Compose can route to a detail screen:

```kotlin
data class Book(val id: Int, val title: String, val author: String)
```

## UiState — three possible worlds

A sealed interface lets the compiler guarantee you handle every case. Three states cover the full lifecycle of an async operation:

```kotlin
sealed interface UiState {
    data object Loading : UiState
    data class Content(val books: List<Book>) : UiState
    data class Error(val message: String) : UiState
}
```

- `Loading` — a fetch is in flight; show a spinner.
- `Content` — the fetch succeeded; show the list.
- `Error` — the fetch failed; show a message and a Retry button.

`data object` (Kotlin 1.9+) gives `Loading` a sensible `toString()` and structural equality at no cost.

## BookViewModel

```kotlin
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class BookViewModel(
    private val repo: BookRepository = BookRepository()
) : ViewModel() {
    private val _state = MutableStateFlow<UiState>(UiState.Loading)
    val state: StateFlow<UiState> = _state.asStateFlow()

    init { load() }

    fun load() {
        viewModelScope.launch {
            _state.value = UiState.Loading
            _state.value = try {
                UiState.Content(repo.getBooks())
            } catch (e: Exception) {
                UiState.Error(e.message ?: "failed to load")
            }
        }
    }
}
```

Key points:

- `MutableStateFlow` is the private write-end; `StateFlow` (read-only) is what the composable sees. This keeps mutation inside the ViewModel.
- `asStateFlow()` wraps without copying — zero overhead.
- `viewModelScope` is a coroutine scope tied to the ViewModel lifecycle. It cancels automatically when the ViewModel is cleared (e.g. the screen leaves the back stack).
- `init { load() }` fetches on first construction so the screen never starts in a permanent Loading state.
- The `try/catch` wraps the repository call: any exception from the suspend function becomes an `Error` state rather than an app crash.

`BookRepository` is defined on the next page.

**Next** → [03 Async repository](./03-repository-async.md)
