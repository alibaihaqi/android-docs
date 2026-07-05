---
title: Add Room
tier: advanced
platform: android
position: 2
---

# Add Room

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Advanced › Add Room

**Goal**

Define a Room entity, DAO, and database class. Wire the repository to cache API results locally and support offline access.

**Prerequisites**

- [Why Room](./01-why-room.md)

## Entity

Create `ItemEntity.kt`:

```kotlin
import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "items")
data class ItemEntity(
    @PrimaryKey val id: Int,
    val title: String,
    val detail: String,
    val isFavorite: Boolean = false,
    val cachedAt: Long = System.currentTimeMillis()
)
```

## DAO

Create `ItemDao.kt`:

```kotlin
import androidx.room.*
import kotlinx.coroutines.flow.Flow

@Dao
interface ItemDao {
    @Query("SELECT * FROM items ORDER BY id")
    fun observeAll(): Flow<List<ItemEntity>>

    @Query("SELECT * FROM items WHERE id = :id")
    suspend fun getById(id: Int): ItemEntity?

    @Upsert
    suspend fun upsertAll(items: List<ItemEntity>)

    @Query("UPDATE items SET isFavorite = NOT isFavorite WHERE id = :id")
    suspend fun toggleFavorite(id: Int)
}
```

## Database

Create `AppDatabase.kt`:

```kotlin
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import android.content.Context

@Database(entities = [ItemEntity::class], version = 1)
abstract class AppDatabase : RoomDatabase() {
    abstract fun itemDao(): ItemDao

    companion object {
        @Volatile private var INSTANCE: AppDatabase? = null

        fun getInstance(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                INSTANCE ?: Room.databaseBuilder(
                    context, AppDatabase::class.java, "app-db"
                ).build().also { INSTANCE = it }
            }
        }
    }
}
```

## Update Repository

```kotlin
class ItemRepository(
    private val dao: ItemDao,
    private val api: ApiService
) {
    fun observeItems(): Flow<List<ItemEntity>> = dao.observeAll()

    suspend fun refresh() {
        val remote = api.fetchItems()
        dao.upsertAll(remote.map { it.toEntity() })
    }

    suspend fun toggleFavorite(id: Int) = dao.toggleFavorite(id)
}
```

## Checkpoint

```bash
# Run on emulator
# App now shows cached items immediately on launch
# Network refresh happens in background
# Toggle favorites — they survive app restart
```

**Next:** [Dependency injection with Hilt](./03-hilt-di.md) — wire Room, Repository, and ViewModel with Hilt.
