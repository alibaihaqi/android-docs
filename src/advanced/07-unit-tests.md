---
title: Unit tests
tier: advanced
platform: android
position: 7
---

# Unit tests

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Advanced › Unit tests

**Goal**

Write unit tests for the ViewModel, Repository, and Room DAO using JUnit, Turbine for Flow testing, and an in-memory Room database.

**Prerequisites**

- [WorkManager](./06-workmanager.md)

## Gradle test dependencies

```kotlin
dependencies {
    testImplementation("junit:junit:4.13.2")
    testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-test:1.9.0")
    testImplementation("app.cash.turbine:turbine:1.2.0")
    testImplementation("androidx.room:room-testing:2.6.1")
    testImplementation("io.mockk:mockk:1.13.14")
}
```

## Room DAO test

In-memory Room is fast and isolated — no device needed:

```kotlin
import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import kotlinx.coroutines.test.runTest
import org.junit.After
import org.junit.Before
import org.junit.Test

class ItemDaoTest {
    private lateinit var db: AppDatabase
    private lateinit var dao: ItemDao

    @Before
    fun setUp() {
        db = Room.inMemoryDatabaseBuilder(
            ApplicationProvider.getApplicationContext(),
            AppDatabase::class.java
        ).build()
        dao = db.itemDao()
    }

    @After
    fun tearDown() = db.close()

    @Test
    fun upsertAndObserve() = runTest {
        dao.upsertAll(listOf(ItemEntity(id = 1, title = "test", detail = "desc")))

        dao.observeAll().test {
            val items = awaitItem()
            assert(items.size == 1)
            assert(items[0].title == "test")
            cancelAndIgnoreRemainingEvents()
        }
    }
}
```

## ViewModel test with Turbine

```kotlin
import app.cash.turbine.test
import io.mockk.coEvery
import io.mockk.mockk
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.test.runTest
import org.junit.Test

class ItemViewModelTest {

    @Test
    fun `items are exposed from repository`() = runTest {
        val repo = mockk<ItemRepository>()
        val testItems = listOf(ItemEntity(id = 1, title = "x", detail = "y"))
        coEvery { repo.observeItems() } returns flowOf(testItems)

        val vm = ItemViewModel(repo)

        vm.items.test {
            assert(awaitItem() == testItems)
            cancelAndIgnoreRemainingEvents()
        }
    }

    @Test
    fun `toggleFavorite delegates to repository`() = runTest {
        val repo = mockk<ItemRepository>(relaxed = true)
        val vm = ItemViewModel(repo)

        vm.toggleFavorite(42)

        coEvery { repo.toggleFavorite(42) }
    }
}
```

## Run tests

```bash
./gradlew test
# or in Android Studio: right-click test → Run
```

## Checkpoint

```bash
./gradlew test
# PASSED: ItemDaoTest, ItemViewModelTest
# All tests complete, 0 failures
```

**Next:** [UI tests with Compose Test](./08-compose-ui-tests.md) — ComposeTestRule, semantics.
