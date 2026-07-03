---
title: Run and preview
tier: intermediate
platform: android
position: 7
---

# Run and preview

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Intermediate › Run and preview

**Goal**

Add the required Gradle dependencies, wire `AppNav` into `MainActivity`, add a `@Preview`, and confirm the full flow works in the emulator. This is the tier exit artifact checkpoint.

**Prerequisites**

- All previous intermediate pages (01–06).

## Gradle dependencies

Open `app/build.gradle.kts` and add these three lines inside the `dependencies { }` block:

```kotlin
implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.0")
implementation("androidx.lifecycle:lifecycle-runtime-compose:2.8.0")
implementation("androidx.navigation:navigation-compose:2.7.7")
```

Then sync the project (**File → Sync Project with Gradle Files** or the elephant icon in the toolbar).

| Artifact | What it provides |
|---|---|
| `lifecycle-viewmodel-compose` | `viewModel()` composable, `ViewModel` base class |
| `lifecycle-runtime-compose` | `collectAsStateWithLifecycle` |
| `navigation-compose` | `NavHost`, `composable`, `rememberNavController` |

## MainActivity

Replace the `setContent` body in `MainActivity.kt`:

```kotlin
package com.example.firstapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.MaterialTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                AppNav()
            }
        }
    }
}
```

## Preview

Add a `@Preview` to `BookList` so you can inspect the list UI without booting the emulator:

```kotlin
import androidx.compose.ui.tooling.preview.Preview

@Preview(showBackground = true)
@Composable
fun BookListPreview() {
    MaterialTheme {
        BookList(
            books = listOf(
                Book(1, "The Go Programming Language", "Donovan & Kernighan"),
                Book(2, "Kotlin in Action", "Jemerov & Isakova"),
            ),
            onBookClick = {},
        )
    }
}
```

The preview pane renders the two rows immediately. Tap interactions (clicking a row) only work on the emulator.

## Run in the emulator (manual step)

This is a manual emulator check — no automated test runs in this tier.

1. Click the green **Run** arrow in Android Studio.
2. The emulator boots, installs the app, and opens the list screen.
3. **Expected:** a spinner appears for roughly 600 ms (the simulated delay), then the three book titles render in a scrollable list.
4. Tap any title.
5. **Expected:** the detail screen slides in, shows "Loading…" briefly, then shows the title and author.
6. Press the system **Back** button.
7. **Expected:** you are back on the list screen.

If the build fails, check the **Build** tab for the first error. Common issues: a missing import, a Gradle sync not completed, or a Kotlin version that does not support `data object`.

## You finished the intermediate tier

You now have a two-screen Android app backed by a ViewModel, a StateFlow-driven UiState, an async repository, and Navigation Compose. The architecture scales directly to a real network backend: replace `BookRepository.getBooks()` with a Retrofit call and the rest of the code is unchanged.

---

## What's next?

| Goal | Route |
|---|---|
| Add a real network backend | Android networking tier (Retrofit + OkHttp) |
| Add a local database | Android persistence tier (Room) |
| Build a backend for this app | [Golang beginner](https://alibaihaqi.github.io/learning-docs/) |
| Deploy the backend | [AWS beginner](https://alibaihaqi.github.io/learning-docs/) |

Or go back to the [Hub](https://alibaihaqi.github.io/learning-docs/) and pick a different goal.
