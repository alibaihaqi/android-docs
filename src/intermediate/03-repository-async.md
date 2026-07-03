---
title: Async repository
tier: intermediate
platform: android
position: 3
---

# Async repository

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Intermediate › Async repository

**Goal**

Write the `BookRepository` that supplies data to the ViewModel via `suspend` functions. After this page the ViewModel from the previous page can compile and run.

**Prerequisites**

- [02 UiState and ViewModel](./02-uistate-and-viewmodel.md)

## The repository

```kotlin
import kotlinx.coroutines.delay

class BookRepository {
    suspend fun getBooks(): List<Book> {
        delay(600) // simulate async work — no network, no API keys
        return listOf(
            Book(1, "The Go Programming Language", "Donovan & Kernighan"),
            Book(2, "Kotlin in Action", "Jemerov & Isakova"),
            Book(3, "Effective Java", "Bloch"),
        )
    }

    suspend fun getBook(id: Int): Book? = getBooks().firstOrNull { it.id == id }
}
```

`delay` is a non-blocking suspend function from `kotlinx.coroutines`. It yields the coroutine for 600 ms and resumes it — identical behaviour to a real I/O wait but without any network calls or credentials.

`getBook` re-uses `getBooks` for simplicity. In production you would query by primary key instead of loading the full list each time.

## Why no network?

This tier stays offline deliberately. There are two reasons:

1. **No API keys.** This is a public repository. Embedding credentials — even test ones — would expose them in git history forever.
2. **Focused scope.** Adding Retrofit, OkHttp, and a live endpoint is its own tier. The architecture here (sealed UiState, ViewModel, repository) is identical whether the data source is an in-memory list or a REST API. Swapping `delay(600)` and the hard-coded list for a `retrofit.create(BookService::class.java).getBooks()` call is a one-function change once you reach the networking tier.

## Where `suspend` comes from

`suspend` marks a function that can pause without blocking a thread. The Kotlin compiler rewrites suspend functions into state machines under the hood. You do not need to manage threads manually — `viewModelScope.launch` picks the right dispatcher automatically.

**Next** → [04 Collect state in Compose](./04-collect-state.md)
