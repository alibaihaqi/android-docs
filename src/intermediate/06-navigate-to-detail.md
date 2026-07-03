---
title: Navigate to detail
tier: intermediate
platform: android
position: 6
---

# Navigate to detail

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Intermediate › Navigate to detail

**Goal**

Wire the list and detail screens together with Navigation Compose. After this page you have a two-destination app: the list screen navigates to a detail screen when a row is tapped, and the system back button returns to the list.

**Prerequisites**

- [04 Collect state in Compose](./04-collect-state.md)
- [05 Loading and error UI](./05-loading-error-ui.md)

## AppNav — the navigation host

```kotlin
import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController

@Composable
fun AppNav() {
    val nav = rememberNavController()
    NavHost(nav, startDestination = "list") {
        composable("list") {
            BookListScreen(onBookClick = { id -> nav.navigate("detail/$id") })
        }
        composable("detail/{id}") { entry ->
            val id = entry.arguments?.getString("id")?.toIntOrNull() ?: 0
            BookDetailScreen(id)
        }
    }
}
```

`NavHost` is the container that swaps composables based on the current back-stack destination. `rememberNavController()` creates the controller and survives recompositions. `startDestination = "list"` is the first screen shown.

Route strings use the `"detail/{id}"` template. Navigation Compose extracts the `{id}` segment from the URL and makes it available via `entry.arguments`. The `?: 0` default handles a malformed route gracefully — the detail screen will show "Loading…" if no book matches id 0.

## BookDetailScreen

```kotlin
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun BookDetailScreen(id: Int) {
    var book by remember { mutableStateOf<Book?>(null) }
    LaunchedEffect(id) { book = BookRepository().getBook(id) }
    Column(Modifier.padding(16.dp)) {
        Text(
            book?.title ?: "Loading…",
            style = MaterialTheme.typography.headlineSmall,
        )
        book?.let { Text(it.author) }
    }
}
```

`LaunchedEffect(id)` runs the suspend block when the composable first enters composition, and re-runs it if `id` changes. This is the correct way to trigger a side-effect (a suspend function call) from a composable. The book arrives after the repository's simulated delay and the composable redraws — the "Loading…" placeholder flashes briefly, then the title and author appear.

## How the back stack works

Pressing the system Back button pops `"detail/{id}"` off the back stack, which brings the `"list"` destination back into view. You do not need to write any back-navigation code — `NavHost` handles it.

## Wiring AppNav into MainActivity

In `MainActivity.kt`, replace the `setContent` body:

```kotlin
setContent {
    MaterialTheme {
        AppNav()
    }
}
```

`AppNav` owns the NavHost, so every navigation decision flows through it.

**Next** → [07 Run and preview](./07-run-and-preview.md)
