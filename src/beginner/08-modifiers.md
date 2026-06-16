---
title: Modifiers
tier: beginner
platform: android
position: 8
---

# Modifiers

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Beginner › Modifiers

**Goal**

Use a `Modifier` to set padding, size, and background on a composable. After this page you will know how to make a row tap-target sized and visually separated from its neighbours.

**Prerequisites**

- [Basic composables: Text, Column, Row](./07-basic-composables.md)

## What a modifier is

A `Modifier` is a chain of layout and visual instructions you pass to a composable. Each call returns a new `Modifier` with one more step appended. You build it left-to-right:

```kotlin
Modifier
    .fillMaxWidth()
    .padding(16.dp)
    .background(Color.LightGray)
```

The order matters — `padding` before `background` puts the background inside the padding; `background` before `padding` puts it outside. Read it as "first fill the width, then add padding inside, then paint a background behind everything so far".

For the full list of modifier functions, see the [Compose modifiers reference](https://developer.android.com/develop/ui/compose/modifiers). The ones the exit artifact uses are below.

## The five you'll use

| Modifier | Effect |
|---|---|
| `padding(16.dp)` | space on every side |
| `padding(horizontal = 16.dp, vertical = 8.dp)` | different space per axis |
| `fillMaxWidth()` | take the full width of the parent |
| `fillMaxSize()` | take the full width *and* height |
| `background(Color.LightGray)` | paint a solid colour behind |

## A padded row

```kotlin
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp

@Composable
fun BookRow() {
    Text(
        text = "Clean Code — Robert C. Martin",
        modifier = Modifier
            .fillMaxWidth()
            .background(Color(0xFFEEEEEE))
            .padding(horizontal = 16.dp, vertical = 12.dp),
    )
}

@Preview(showBackground = true)
@Composable
fun BookRowPreview() {
    BookRow()
}
```

In the preview, the row stretches edge to edge, the background fills it, and the text sits with 16.dp on the sides and 12.dp top and bottom.

## The convention every composable follows

Every composable you write should accept a `modifier: Modifier = Modifier` parameter and pass it to its outermost child. This lets the caller add layout to your composable without you having to anticipate every use:

```kotlin
@Composable
fun BookRow(title: String, modifier: Modifier = Modifier) {
    Text(
        text = title,
        modifier = modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 12.dp),
    )
}
```

Now a caller can write `BookRow("Refactoring", modifier = Modifier.background(Color.LightGray))` and the background applies. The exit artifact follows this convention.

**Next** → [State with remember and mutableStateOf](./09-state.md)
