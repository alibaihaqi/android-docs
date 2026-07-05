---
title: Why Room
tier: advanced
platform: android
position: 1
---

# Why Room

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Advanced › Why Room

**Goal**

Understand why local persistence is critical and how Room compares to raw SQLite.

**Prerequisites**

- Intermediate tier completed (ViewModel + repository + Navigation Compose)

## The persistence problem

The intermediate app fetches from a public API every time. This means:
- No offline access
- Slow startup (network fetch before any content)
- No user data persistence (favorites, bookmarks)

## Why Room

Room is Google's recommended persistence layer on Android. It wraps SQLite and provides:

- **Compile-time SQL verification** — no runtime SQL syntax errors
- **Kotlin coroutines + Flow** — DAO methods are `suspend` or return `Flow`
- **Automatic migration** — schema changes are declarative
- **No boilerplate** — an annotation processor generates the implementation

Raw SQLite (`SQLiteOpenHelper`) requires manual cursor management, `ContentValues`, and raw SQL strings. Room handles all of that.

## Gradle setup

```kotlin
// build.gradle.kts (app module)
plugins {
    id("com.google.devtools.ksp") version "2.0.21-1.0.28"
}

android {
    // ...
}

dependencies {
    val roomVersion = "2.6.1"
    implementation("androidx.room:room-runtime:$roomVersion")
    implementation("androidx.room:room-ktx:$roomVersion")
    ksp("androidx.room:room-compiler:$roomVersion")
}
```

## Checkpoint

```bash
./gradlew app:build  # or build in Android Studio
# BUILD SUCCESSFUL — Room compiler generates code
```

Next: [Add Room](./02-add-room.md) — define entities, DAOs, and wire into the repository.
