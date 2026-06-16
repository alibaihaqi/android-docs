---
title: State with remember and mutableStateOf
tier: beginner
platform: android
position: 9
---

# State with remember and mutableStateOf

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Beginner › State

**Goal**

Hold a value in a composable that survives recomposition and triggers a redraw when it changes. After this page you will know how to wire a button to a counter — the mental model the exit artifact's scroll position uses.

**Prerequisites**

- [What Jetpack Compose is](./06-what-compose-is.md)
- [Basic composables](./07-basic-composables.md)

## Why state needs two pieces

A composable can be called many times — every recomposition is a fresh function call. A plain `var count = 0` resets to `0` each call, so the screen never changes.

Two helpers fix that:

- `mutableStateOf(initial)` makes a value that Compose *watches*. Writing to it triggers recomposition of every composable that read it.
- `remember { … }` keeps the same instance across recompositions of the same composable. Without `remember`, you'd build a fresh state object every call and lose the value.

You almost always use them together: `remember { mutableStateOf(0) }`.

For the full state model (`rememberSaveable`, `derivedStateOf`, hoisting), see the [Compose state docs](https://developer.android.com/develop/ui/compose/state). What's below is enough for the exit artifact.

## A counter

```kotlin
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp

@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }

    Column(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        Text(text = "Count: $count")
        Button(onClick = { count = count + 1 }) {
            Text("Increment")
        }
    }
}

@Preview(showBackground = true)
@Composable
fun CounterPreview() {
    Counter()
}
```

Run on the emulator. Tap **Increment** — the number rises. The preview pane is static; tap interactions only work on the emulator.

## What `by` does

```kotlin
var count by remember { mutableStateOf(0) }
```

The `by` keyword is *property delegation*. Without it you'd write:

```kotlin
val count = remember { mutableStateOf(0) }
Text("Count: ${count.value}")
count.value = count.value + 1
```

With `by`, you read and write `count` directly and the delegate handles `.value`. Both forms work. The `by` form reads more naturally, and the `getValue` / `setValue` imports above are what unlock it.

## The exit artifact doesn't mutate

The one-screen list app on page 11 displays a fixed `List<Book>`. It does not use `mutableStateOf` directly — but `LazyColumn` uses state internally to remember which rows are scrolled into view. Understanding the model is enough; you don't write the state code on page 11.

**Next** → [LazyColumn](./10-lazy-column.md)
