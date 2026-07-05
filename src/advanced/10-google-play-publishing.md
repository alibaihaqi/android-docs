---
title: Google Play publishing
tier: advanced
platform: android
position: 10
---

# Google Play publishing

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Advanced › Google Play publishing

**Goal**

Generate a signed app bundle, upload to Google Play Console, manage internal/closed/open testing tracks, and publish to production.

**Prerequisites**

- [Firebase Crashlytics](./09-firebase-crashlytics.md)
- A Google Play Console account ($25 one-time fee)

## Build types

Ensure your `build.gradle.kts` has a release build type:

```kotlin
android {
    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
}
```

"Minify enabled" shrinks, obfuscates, and optimizes the code. "Shrink resources" removes unused resources.

## App signing

Two approaches:

**Play App Signing (recommended):** Google manages the signing key. You upload an upload key, Google signs the final APK/AAB with your app signing key.

1. Generate an upload key:

```bash
keytool -genkey -v -keystore upload-keystore.jks \
  -alias upload-key -keyalg RSA -keysize 2048 \
  -validity 10000
```

2. Configure in `build.gradle.kts`:

```kotlin
android {
    signingConfigs {
        create("release") {
            storeFile = file("upload-keystore.jks")
            storePassword = System.getenv("STORE_PASSWORD")
            keyAlias = "upload-key"
            keyPassword = System.getenv("KEY_PASSWORD")
        }
    }
    buildTypes {
        release {
            signingConfig = signingConfigs["release"]
        }
    }
}
```

## Generate the bundle

```bash
./gradlew bundleRelease
# Output: app/build/outputs/bundle/release/app-release.aab
```

## Upload to Google Play Console

1. Go to [Google Play Console](https://play.google.com/console)
2. Create a new app (or select existing)
3. Go to **Testing** → **Internal testing**
4. Click **Create new release**
5. Upload the `.aab` file
6. Fill in the release notes
7. Save → Review → Start rollout to Internal testing

## Testing tracks

| Track | Description |
|-------|-------------|
| **Internal** | Up to 100 testers, no review required. Fastest feedback loop |
| **Closed (alpha)** | Invite-only, configurable tester list. Useful for friends and QA |
| **Open (beta)** | Public link, anyone can join. Good for wider testing |
| **Production** | Available to all users on Google Play |

## CI/CD publishing

For automated uploads, use Gradle Play Publisher or `bundletool`:

```bash
# Using bundletool to generate APKs from AAB:
java -jar bundletool.jar build-apks \
  --bundle=app-release.aab \
  --output=app.apks \
  --ks=upload-keystore.jks \
  --ks-key-alias=upload-key

# Install directly on device:
java -jar bundletool.jar install-apks --apks=app.apks
```

## Production checklist

- [ ] Crashlytics verified with a test crash
- [ ] Performance traces showing startup time < 2s
- [ ] ProGuard/R8 rules correct (no missing class crashes)
- [ ] Store listing completed (description, screenshots, category)
- [ ] Content rating questionnaire filled
- [ ] Privacy policy URL added (required if collecting any user data)

## Checkpoint

```bash
./gradlew bundleRelease
# BUILD SUCCESSFUL in 45s
# app-release.aab ready at app/build/outputs/bundle/release/
# Upload to Play Console → Internal testing → install on test device
```

**You've completed the Android Advanced tier.** The intermediate ViewModel/StateFlow app is now a production-quality Android app with Room persistence, Hilt DI, Firebase Auth, DataStore, WorkManager, unit/UI tests, Crashlytics performance monitoring, and Google Play publishing.
