---
title: Loading and error UI
tier: intermediate
platform: android
position: 5
---

# Loading and error UI

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Intermediate › Loading and error UI

**Goal**

Implement the three leaf composables: `LoadingView`, `ErrorView`, and `BookList`. After this page you have a complete, renderable screen for every `UiState` branch.

**Prerequisites**

- [04 Collect state in Compose](./04-collect-state.md)
- [Basic composables](../beginner/07-basic-composables.md)
- [LazyColumn](../beginner/10-lazy-column.md)

## LoadingView

```kotlin
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier

@Composable
fun LoadingView() {
    Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        CircularProgressIndicator()
    }
}
```

`CircularProgressIndicator` is the Material 3 spinner. Centering it with `Box` and `contentAlignment` is the standard pattern — no custom layout needed.

## ErrorView

```kotlin
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun ErrorView(message: String, onRetry: () -> Unit) {
    Column(
        Modifier.fillMaxSize().padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center,
    ) {
        Text(message)
        Button(onClick = onRetry) { Text("Retry") }
    }
}
```

`onRetry` is wired to `viewModel::load` in `BookListScreen`. Tapping Retry sets the state back to `Loading` and re-launches the repository call.

## BookList

```kotlin
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun BookList(books: List<Book>, onBookClick: (Int) -> Unit) {
    LazyColumn {
        items(books) { book ->
            Text(
                book.title,
                Modifier
                    .fillMaxWidth()
                    .clickable { onBookClick(book.id) }
                    .padding(16.dp),
            )
        }
    }
}
```

`onBookClick` receives the book's `id`. The caller (the navigation host on page 06) routes to the detail screen using that id.

## Combining the pieces

At this point you have:

| Piece | Page |
|---|---|
| `Book`, `UiState` | 02 |
| `BookViewModel`, `BookRepository` | 02, 03 |
| `BookListScreen` (collector + branch) | 04 |
| `LoadingView`, `ErrorView`, `BookList` | 05 (this page) |

The only missing piece is how the user gets from the list to the detail screen — that is Navigation Compose on the next page.

**Next** → [06 Navigate to detail](./06-navigate-to-detail.md)
