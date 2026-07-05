---
title: WorkManager
tier: advanced
platform: android
position: 6
---

# WorkManager

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Advanced › WorkManager

**Goal**

Schedule a periodic background sync with WorkManager that refreshes the item list even when the app is not in the foreground.

**Prerequisites**

- [DataStore preferences](./05-datastore.md)

## Why WorkManager

WorkManager handles deferrable, guaranteed background work. It respects Doze mode, battery optimizations, and API level differences:

| Scenario | What happens |
|----------|-------------|
| App in foreground | Work runs immediately |
| App in background | Work runs when constraints are met |
| Device dozing | WorkManager batches and defers |
| Device reboot | Work is rescheduled automatically |

## SyncWorker

Create `SyncWorker.kt`:

```kotlin
import android.content.Context
import androidx.hilt.work.HiltWorker
import androidx.work.*
import dagger.assisted.Assisted
import dagger.assisted.AssistedInject

@HiltWorker
class SyncWorker @AssistedInject constructor(
    @Assisted context: Context,
    @Assisted workerParams: WorkerParameters,
    private val repository: ItemRepository
) : CoroutineWorker(context, workerParams) {

    override suspend fun doWork(): Result {
        return try {
            repository.refresh()
            Result.success()
        } catch (e: Exception) {
            if (runAttemptCount < 3) Result.retry() else Result.failure()
        }
    }
}
```

## Hilt WorkManager integration

```kotlin
// app-level build.gradle.kts
dependencies {
    implementation("androidx.hilt:hilt-work:1.2.0")
    kapt("androidx.hilt:hilt-compiler:1.2.0")
}
```

## Schedule periodic sync

Create a scheduling helper:

```kotlin
import androidx.work.*

object SyncScheduler {
    private const val WORK_NAME = "periodic_sync"

    fun schedule(context: Context) {
        val constraints = Constraints.Builder()
            .setRequiredNetworkType(NetworkType.CONNECTED)
            .build()

        val request = PeriodicWorkRequestBuilder<SyncWorker>(
            15, TimeUnit.MINUTES
        ).setConstraints(constraints)
            .setBackoffCriteria(
                BackoffPolicy.EXPONENTIAL,
                1, TimeUnit.MINUTES
            )
            .build()

        WorkManager.getInstance(context).enqueueUniquePeriodicWork(
            WORK_NAME,
            ExistingPeriodicWorkPolicy.KEEP,
            request
        )
    }
}
```

Call from the Application class:

```kotlin
@HiltAndroidApp
class App : Application(), Configuration.Provider {
    override fun onCreate() {
        super.onCreate()
        SyncScheduler.schedule(this)
    }

    // Required for Hilt + WorkManager
    override val workManagerConfiguration: Configuration
        get() = Configuration.Builder()
            .setWorkerFactory(HiltWorkFactory(this))
            .build()
}
```

## Observe sync state

```kotlin
WorkManager.getInstance(context)
    .getWorkInfosForUniqueWorkLiveData(WORK_NAME)
    .observe(owner) { infos ->
        val state = infos.firstOrNull()?.state
        // RUNNING, SUCCEEDED, FAILED
    }
```

## Checkpoint

```bash
# Run app, background it (Home button)
# WorkManager syncs every 15 minutes in background
# Kill app, reopen — items from latest sync visible immediately
```

**Next:** [Unit tests](./07-unit-tests.md) — JUnit, Turbine for Flow, Room in-memory.
