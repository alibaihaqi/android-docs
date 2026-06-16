---
title: What Jetpack Compose is
tier: beginner
platform: android
position: 6
---

# What Jetpack Compose is

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Beginner › What Jetpack Compose is

**Goal**

Understand the `@Composable` function model — the one idea every later page builds on. After this page you will know what the `@Composable` annotation does and how the preview gets drawn.

**Prerequisites**

- [Functions and lambdas](./04-functions-and-lambdas.md)
- [Empty Compose project created](./01-install-android-studio.md)

## The model in one sentence

Jetpack Compose is a UI toolkit where you describe the screen by writing Kotlin functions that emit UI elements; Android calls those functions whenever the data they read changes.

Two terms to lock in:

- A *composable* is a Kotlin function annotated `@Composable`. It can call other composables and emit UI. It cannot be called from a normal function.
- *Recomposition* is Android calling your composable again with new data and drawing the result. You don't trigger recomposition manually — state changes do (page 09).

For everything Compose can do, see the [official Compose docs](https://developer.android.com/develop/ui/compose/documentation). The piece we need now is the `@Composable` annotation.

## A starter composable

Open `MainActivity.kt` from the project you created on page 01. The relevant parts:

```kotlin
package com.example.firstapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            Greeting("Android")
        }
    }
}

@Composable
fun Greeting(name: String) {
    Text(text = "Hello $name!")
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    Greeting("Android")
}
```

What each part does:

- `class MainActivity : ComponentActivity()` — the entry point Android launches. One per screen at this tier.
- `setContent { ... }` — tells the activity "use this composable as my UI". The braces are a trailing lambda (page 04).
- `@Composable fun Greeting(name: String)` — a composable function. It takes a `String` and emits a `Text`.
- `@Preview` — the annotation that makes the Android Studio preview pane render this function without launching the emulator. You can have many `@Preview` composables in one file.

## Run it two ways

**In the preview pane.** Open the right-hand split view. Edit the `name` argument inside `GreetingPreview` and the pane updates in under a second. This is the fastest feedback loop in Android — use it for almost everything in this tier.

**On the emulator.** Click the green Run arrow in the toolbar. The first run downloads a system image and starts an emulator (slow once); subsequent runs are fast. You see "Hello Android!" on a phone-shaped window.

**For frontend developers**

The mental model is closer to React than to Vue. A `@Composable` function is a React function component: re-run when its inputs change, return a description of UI. There is no template language — the function body *is* the markup, using trailing lambdas where JSX would have children.

**Next** → [Basic composables: Text, Column, Row](./07-basic-composables.md)
