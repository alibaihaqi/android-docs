---
title: DataStore preferences
tier: advanced
platform: android
position: 5
---

# DataStore preferences

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Advanced › DataStore preferences

**Goal**

Replace `SharedPreferences` with Jetpack DataStore for type-safe, coroutine-based key-value storage. Persist user preferences like theme toggle and sort order.

**Prerequisites**

- [Firebase Authentication](./04-firebase-auth.md)

## Why DataStore

`SharedPreferences` has several problems: synchronous disk I/O on the main thread, no type safety, and no reactive observation. DataStore fixes all three with a Flow-based API and automatic data migration.

## Gradle

```kotlin
dependencies {
    implementation("androidx.datastore:datastore-preferences:1.1.2")
}
```

## Preferences DataStore

Create `UserPreferences.kt`:

```kotlin
import android.content.Context
import androidx.datastore.preferences.core.booleanPreferencesKey
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

private val Context.dataStore by preferencesDataStore(name = "user_prefs")

class UserPreferences(private val context: Context) {

    private object Keys {
        val DARK_MODE = booleanPreferencesKey("dark_mode")
        val SORT_ASCENDING = booleanPreferencesKey("sort_ascending")
    }

    val darkMode: Flow<Boolean> = context.dataStore.data.map { prefs ->
        prefs[Keys.DARK_MODE] ?: false
    }

    val sortAscending: Flow<Boolean> = context.dataStore.data.map { prefs ->
        prefs[Keys.SORT_ASCENDING] ?: true
    }

    suspend fun setDarkMode(enabled: Boolean) {
        context.dataStore.edit { prefs ->
            prefs[Keys.DARK_MODE] = enabled
        }
    }

    suspend fun setSortAscending(ascending: Boolean) {
        context.dataStore.edit { prefs ->
            prefs[Keys.SORT_ASCENDING] = ascending
        }
    }
}
```

## Wire with Hilt

```kotlin
@Module
@InstallIn(SingletonComponent::class)
object PreferencesModule {
    @Provides @Singleton
    fun provideUserPreferences(app: Application): UserPreferences =
        UserPreferences(app)
}
```

## Use in ViewModel

```kotlin
@HiltViewModel
class SettingsViewModel @Inject constructor(
    private val preferences: UserPreferences
) : ViewModel() {

    val darkMode: StateFlow<Boolean> = preferences.darkMode
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), false)

    fun toggleDarkMode() = viewModelScope.launch {
        val current = preferences.darkMode.first()
        preferences.setDarkMode(!current)
    }
}
```

## Checkpoint

```bash
# Run app, navigate to settings
# Toggle dark mode → UI switches immediately
# Kill and restart → preference persists
```

**Next:** [WorkManager](./06-workmanager.md) — background data sync and periodic work.
