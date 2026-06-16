---
title: LazyColumn
tier: beginner
platform: android
position: 10
---

# LazyColumn

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Beginner › LazyColumn

**Goal**

Render a `List<T>` as a scrolling vertical list. After this page you will be able to display every element of any list with one composable.

**Prerequisites**

- [Data classes](./05-classes.md)
- [Basic composables](./07-basic-composables.md)
- [Modifiers](./08-modifiers.md)

## Why not just Column

`Column` lays out every child at composition time. With ten items that's fine; with ten thousand the app stalls. `LazyColumn` only composes the rows that are visible on screen and recycles them as you scroll — the same idea as `RecyclerView` in the older View system, or `FlatList` in React Native.

For everything `LazyColumn` can do (sticky headers, content padding, item keys, custom layout managers), see the [Compose lists docs](https://developer.android.com/develop/ui/compose/lists). The piece we need now is `items`.

## Iterating a list

`LazyColumn` takes a content lambda whose receiver exposes an `items` function:

```kotlin
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items

@Composable
fun NameList() {
    val names = listOf("Mei", "Aarav", "Sofia", "Olu", "Hina")
    LazyColumn {
        items(names) { name ->
            Text(text = name)
        }
    }
}
```

What each piece does:

- `items(names)` registers one row per element of `names`.
- `{ name -> Text(text = name) }` is the row template — called once per element with that element bound to `name`. Same lambda shape as `forEach` from page 05.

`items` is imported from `androidx.compose.foundation.lazy.items`. Android Studio adds the import on first use.

## With a data class

Swap `List<String>` for `List<Book>` and the shape is identical:

```kotlin
data class Book(val title: String, val author: String)

@Composable
fun BookList() {
    val library = listOf(
        Book("The Pragmatic Programmer", "Hunt & Thomas"),
        Book("Clean Code", "Robert C. Martin"),
        Book("Refactoring", "Martin Fowler"),
    )
    LazyColumn {
        items(library) { book ->
            Text(text = "${book.title} — ${book.author}")
        }
    }
}
```

Each row is just a `Text`. Page 11 wraps that row in a styled composable, gives `LazyColumn` a `Modifier.fillMaxSize()`, and that is the exit artifact.

**Next** → [One-screen list app](./11-one-screen-list-app.md)
