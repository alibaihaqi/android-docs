---
title: Basic composables — Text, Column, Row
tier: beginner
platform: android
position: 7
---

# Basic composables — Text, Column, Row

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Beginner › Basic composables

**Goal**

Compose a screen from `Text`, `Column`, and `Row`. After this page you will know how to stack and arrange the three building blocks every later screen uses.

**Prerequisites**

- [What Jetpack Compose is](./06-what-compose-is.md)

## The three composables

- `Text(text = "…")` emits a single line of text. The other parameters style it.
- `Column { … }` stacks its children vertically, top to bottom.
- `Row { … }` lays its children out horizontally, left to right.

Both `Column` and `Row` take a content lambda — the trailing-lambda syntax from page 04. Children inside the braces are emitted in order.

## A two-row layout

Replace the `Greeting` function in `MainActivity.kt` with:

```kotlin
@Composable
fun Greeting() {
    Column {
        Row {
            Text(text = "Title:")
            Text(text = " Clean Code")
        }
        Row {
            Text(text = "Author:")
            Text(text = " Robert C. Martin")
        }
    }
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    Greeting()
}
```

Open the preview pane. You should see two stacked rows, each with two `Text` items side by side. If nothing updates, click **Build & Refresh** in the preview pane header.

## Alignment and arrangement

Both `Column` and `Row` accept arguments that control how children sit:

- `verticalArrangement` (on `Column`) and `horizontalArrangement` (on `Row`) — the space between children.
- `horizontalAlignment` (on `Column`) and `verticalAlignment` (on `Row`) — how children align on the cross axis.

```kotlin
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.ui.Alignment

@Composable
fun Greeting() {
    Column(
        verticalArrangement = Arrangement.spacedBy(8.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text(text = "Title: Clean Code")
        Text(text = "Author: Robert C. Martin")
    }
}
```

`Arrangement.spacedBy(8.dp)` puts 8 *density-independent pixels* (`dp`) of space between each child. `dp` is Android's resolution-independent unit — 8.dp looks the same physical size on any screen. Import `androidx.compose.ui.unit.dp` if Android Studio doesn't add it for you.

For the full surface of these composables, see the [Compose layout reference](https://developer.android.com/develop/ui/compose/layouts). What we used above is enough for the exit artifact.

**Next** → [Modifiers](./08-modifiers.md)
