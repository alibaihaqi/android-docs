---
title: One-screen list app
tier: beginner
platform: android
position: 11
---

# One-screen list app

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Beginner › One-screen list app

**Goal**

Ship the tier exit artifact: a one-screen Android app that displays a hard-coded `List<Book>` in a scrolling list, runnable in the Android Studio preview and on the emulator. After this page you will have a buildable Android Studio project with a working Compose screen.

**Prerequisites**

- [Data classes](./05-classes.md)
- [Basic composables](./07-basic-composables.md)
- [Modifiers](./08-modifiers.md)
- [LazyColumn](./10-lazy-column.md)

## The plan

One file. The full contents of `MainActivity.kt` from your project on page 01 get replaced. Three composables:

- `BookList(books, modifier)` — the `LazyColumn` that owns the list.
- `BookRow(book, modifier)` — one row.
- `BookListPreview()` — the `@Preview` so you can see it without booting the emulator.

Plus the `Book` data class and a hard-coded `library` value.

## The full file

Open `app/src/main/java/com/example/firstapp/MainActivity.kt` and replace its contents with:

```kotlin
package com.example.firstapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp

data class Book(val title: String, val author: String)

val library = listOf(
    Book("The Pragmatic Programmer", "Hunt & Thomas"),
    Book("Clean Code", "Robert C. Martin"),
    Book("Designing Data-Intensive Applications", "Martin Kleppmann"),
    Book("The Mythical Man-Month", "Frederick P. Brooks"),
    Book("Refactoring", "Martin Fowler"),
)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            Surface(
                modifier = Modifier.fillMaxSize(),
                color = MaterialTheme.colorScheme.background,
            ) {
                BookList(books = library)
            }
        }
    }
}

@Composable
fun BookList(books: List<Book>, modifier: Modifier = Modifier) {
    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        items(books) { book ->
            BookRow(book = book)
        }
    }
}

@Composable
fun BookRow(book: Book, modifier: Modifier = Modifier) {
    Surface(
        modifier = modifier.fillMaxWidth(),
        color = MaterialTheme.colorScheme.surfaceVariant,
    ) {
        Text(
            text = "${book.title} — ${book.author}",
            modifier = Modifier.padding(horizontal = 16.dp, vertical = 12.dp),
            style = MaterialTheme.typography.bodyLarge,
        )
    }
}

@Preview(showBackground = true)
@Composable
fun BookListPreview() {
    BookList(books = library)
}
```

## Run it

**In the preview pane.** Open the split view. `BookListPreview` renders all five rows stacked, each with its title and author. If the pane shows "Build & Refresh", click it.

**On the emulator.** Click the green Run arrow. The emulator boots (first run is slow), installs the app, and launches it. You see the same five rows on a phone-shaped window. Scroll — nothing happens with five items, but `LazyColumn` is doing the right thing if you bump `library` to fifty.

If the build fails, look in the **Build** tab at the bottom for the first error and read up — almost always a missing import or a typo in a `Modifier` chain.

## You shipped the exit artifact

You now have a buildable Android Studio project that displays a `List<Book>` on screen. Every page in this tier existed to unlock this file.

---

## You finished a beginner tier. What's next?

Two paths from here.

1. **Go deeper on the same platform.** The intermediate tier on this same site teaches you to ship a thing that persists, tests itself, and talks to the world. If you liked beginner, that's the natural next step.
2. **Pick up an adjacent platform.** The table below routes you across platforms based on what you actually want to build.

| You just finished | Natural next platform | Why |
|---|---|---|
| iOS beginner | iOS intermediate, then Android beginner | Stay native, then learn the other mobile platform with a head start on the Compose/SwiftUI mental model. |
| Android beginner | Android intermediate, then Golang beginner | Backend-for-frontend pairs naturally with a mobile client. |
| Golang beginner | AWS beginner, then Golang intermediate | Deploy your endpoint before adding persistence/tests. |
| Java beginner | Java intermediate, then AWS beginner | JVM persistence + validation first, then deploy. |
| AWS beginner | Golang beginner | Have a backend to deploy. AWS without a service to host is reference, not curriculum. |

Or jump back to the [Hub](https://alibaihaqi.github.io/learning-docs/) and pick a different goal.
