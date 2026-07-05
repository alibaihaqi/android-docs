---
title: Dependency injection with Hilt
tier: advanced
platform: android
position: 3
---

# Dependency injection with Hilt

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Advanced › Dependency injection with Hilt

**Goal**

Replace manual dependency wiring with Hilt. Annotate the Application, inject ViewModels with `@HiltViewModel`, and provide Room and the repository via Hilt modules.

**Prerequisites**

- [Add Room](./02-add-room.md)

## Gradle setup

```kotlin
// project-level build.gradle.kts
plugins {
    id("com.google.dagger.hilt.android") version "2.53.1" apply false
}

// app-level build.gradle.kts
plugins {
    id("com.google.dagger.hilt.android")
    id("kotlin-kapt")
}

dependencies {
    implementation("com.google.dagger:hilt-android:2.53.1")
    kapt("com.google.dagger:hilt-android-compiler:2.53.1")
    implementation("androidx.hilt:hilt-navigation-compose:1.2.0")
}
```

## Application class

```kotlin
import android.app.Application
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class App : Application()
```

Register in `AndroidManifest.xml`:

```xml
<application
    android:name=".App"
    ...>
```

## Hilt module

```kotlin
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Provides @Singleton
    fun provideDatabase(app: Application): AppDatabase =
        AppDatabase.getInstance(app)

    @Provides
    fun provideItemDao(db: AppDatabase): ItemDao = db.itemDao()

    @Provides @Singleton
    fun provideRepository(dao: ItemDao): ItemRepository =
        ItemRepository(dao, ApiService())
}
```

## Inject ViewModel

```kotlin
import androidx.lifecycle.ViewModel
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class ItemViewModel @Inject constructor(
    private val repository: ItemRepository
) : ViewModel() {

    val items: StateFlow<List<ItemEntity>> =
        repository.observeItems()
            .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    fun refresh() = viewModelScope.launch {
        repository.refresh()
    }

    fun toggleFavorite(id: Int) = viewModelScope.launch {
        repository.toggleFavorite(id)
    }
}
```

## In Compose

```kotlin
@Composable
fun ItemScreen(
    viewModel: ItemViewModel = hiltViewModel()
) {
    val items by viewModel.items.collectAsStateWithLifecycle()
    // ...
}
```

## Checkpoint

```bash
./gradlew app:build
# BUILD SUCCESSFUL — Hilt generates DI code
# App runs without crash, Room + ViewModel wired through Hilt
```

**Next:** [Firebase Authentication](./04-firebase-auth.md) — email/password and Google sign-in.
