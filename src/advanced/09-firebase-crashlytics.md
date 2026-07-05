---
title: Firebase Crashlytics
tier: advanced
platform: android
position: 9
---

# Firebase Crashlytics

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Advanced › Firebase Crashlytics

**Goal**

Add Firebase Crashlytics for crash reporting and Firebase Performance Monitoring to track app startup time and network request latency.

**Prerequisites**

- [UI tests with Compose Test](./08-compose-ui-tests.md)
- Firebase project already configured (from the Firebase Auth page)

## Gradle setup

```kotlin
dependencies {
    // Crashlytics
    implementation("com.google.firebase:firebase-crashlytics-ktx")

    // Performance Monitoring
    implementation("com.google.firebase:firebase-perf")

    // Performance Gradle plugin (project-level)
    // classpath("com.google.firebase:perf-plugin:1.4.2")

    // Crashlytics Gradle plugin (project-level)
    // classpath("com.google.firebase:firebase-cruds:3.0.3")
}
```

Crashlytics requires the Firebase Gradle plugin. In your project-level `build.gradle.kts`:

```kotlin
plugins {
    id("com.google.firebase.crashlytics") version "3.0.3" apply false
}
```

In app-level:

```kotlin
plugins {
    id("com.google.firebase.crashlytics")
}
```

## Report a non-fatal

```kotlin
import com.google.firebase.crashlytics.FirebaseCrashlytics

// Log caught exceptions without crashing
try {
    repository.refresh()
} catch (e: IOException) {
    FirebaseCrashlytics.getInstance().recordException(e)
}
```

## Log custom keys

Add context to crashes for debugging:

```kotlin
FirebaseCrashlytics.getInstance().apply {
    setCustomKey("user_id", userId)
    setCustomKey("item_count", items.size)
    log("User opened detail screen for item $itemId")
}
```

## Force a crash to test

```kotlin
// Only for testing — remove in production
Button(onClick = {
    FirebaseCrashlytics.getInstance().crash()
}) {
    Text("Test Crash")
}
```

## View in Firebase Console

1. Open [Firebase Console](https://console.firebase.google.com)
2. Select your project → **Crashlytics**
3. After a crash, it appears within minutes with:
   - Stack trace
   - Device model and OS version
   - Custom keys set before the crash
   - Log lines before the crash

## Performance Monitoring

```kotlin
import com.google.firebase.perf.FirebasePerformance
import com.google.firebase.perf.metrics.Trace

// Trace an operation
val trace = FirebasePerformance.getInstance().newTrace("item_refresh")
trace.start()
try {
    repository.refresh()
} finally {
    trace.stop()
}

// HTTP request tracing (OkHttp interceptor)
// Add: implementation("com.google.firebase:firebase-perf-okhttp:16.3.3")
```

## Checkpoint

```bash
# Force a crash in the debug build
# Open Firebase Console → Crashlytics
# Crash appears within 1-5 minutes with full stack trace and device info
# Performance traces appear in the Performance dashboard
```

**Next:** [Google Play publishing](./10-google-play-publishing.md) — bundle, sign, and release.
