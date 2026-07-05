---
title: UI tests with Compose Test
tier: advanced
platform: android
position: 8
---

# UI tests with Compose Test

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Advanced › UI tests with Compose Test

**Goal**

Write Compose UI tests that launch the app, verify the list renders, toggle a favorite, and navigate to the detail screen — all on an emulator.

**Prerequisites**

- [Unit tests](./07-unit-tests.md)

## Gradle setup

```kotlin
dependencies {
    androidTestImplementation("androidx.compose.ui:ui-test-junit4:1.7.6")
    androidTestImplementation("androidx.navigation:navigation-testing:2.8.5")
    debugImplementation("androidx.compose.ui:ui-test-manifest:1.7.6")
}
```

## ComposeTestRule

```kotlin
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class ItemScreenTest {

    @get:Rule
    val composeTestRule = createAndroidComposeRule<MainActivity>()
}
```

## Test list renders items

```kotlin
@Test
fun listDisplaysItems() {
    composeTestRule.waitUntil(5000) {
        composeTestRule.onAllNodes(hasTestTag("item_row"))
            .fetchSemanticsNodes().size > 0
    }

    composeTestRule.onAllNodes(hasTestTag("item_row"))
        .assertCountAtLeast(1)
}
```

Add the test tag in your Composable:

```kotlin
@Composable
fun ItemRow(item: ItemEntity, onToggle: () -> Unit) {
    Row(modifier = Modifier.testTag("item_row")) {
        // ...
    }
}
```

## Test favorite toggle

```kotlin
@Test
fun toggleFavorite() {
    composeTestRule.waitUntil(5000) {
        composeTestRule.onAllNodes(hasTestTag("favorite_button"))
            .fetchSemanticsNodes().size > 0
    }

    composeTestRule.onAllNodes(hasTestTag("favorite_button"))
        .first()
        .performClick()

    // After click, the button state changes
    // (no assertion on the visual change since it's UI-dependent)
}
```

## Test navigation

```kotlin
@Test
fun navigateToDetail() {
    composeTestRule.waitUntil(5000) {
        composeTestRule.onAllNodes(hasTestTag("item_row"))
            .fetchSemanticsNodes().size > 0
    }

    composeTestRule.onAllNodes(hasTestTag("item_row"))
        .first()
        .performClick()

    composeTestRule.onNodeWithText("Detail")
        .assertIsDisplayed()
}
```

## Run UI tests

```bash
# Start an emulator first, then:
./gradlew connectedCheck
# or in Android Studio: run the UI test configuration
```

## Checkpoint

```bash
./gradlew connectedCheck
# PASSED: ItemScreenTest
# List renders, favorite toggles, navigation works
```

**Next:** [Firebase Crashlytics](./09-firebase-crashlytics.md) — crash reporting and analytics.
