---
title: Android Advanced — persistence, DI, auth, tests, and Play Store
tier: advanced
platform: android
---

# Android Advanced

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Advanced

## What you'll build

You extend the intermediate ViewModel/StateFlow app with Room database persistence, Hilt dependency injection, Firebase Authentication, DataStore preferences, WorkManager background sync, unit and UI tests, CI/CD, Crashlytics, and Google Play publishing.

## Prerequisites

- Complete the [Intermediate tier](../intermediate/) (ViewModel + StateFlow + Navigation Compose)
- Android Studio Hedgehog or later
- A Firebase project (for Auth, Crashlytics; free tier)

## The ladder

1. [01 Why Room](./01-why-room.md) — from network-only to SQLite persistence
2. [02 Add Room](./02-add-room.md) — DAO, database, repository integration
3. [03 Dependency injection with Hilt](./03-hilt-di.md) — ViewModel injection, module setup
4. [04 Firebase Authentication](./04-firebase-auth.md) — email/password and Google sign-in
5. [05 DataStore preferences](./05-datastore.md) — key-value preferences with Flow
6. [06 WorkManager](./06-workmanager.md) — background sync and periodic work
7. [07 Unit tests](./07-unit-tests.md) — JUnit, Turbine for Flow, Room in-memory
8. [08 UI tests with Compose Test](./08-compose-ui-tests.md) — ComposeTestRule, sematics
9. [09 Firebase Crashlytics](./09-firebase-crashlytics.md) — crash reporting and analytics
10. [10 Google Play publishing](./10-google-play-publishing.md) — bundle, sign, release

**Start** → [01 Why Room](./01-why-room.md)
