---
title: Firebase Authentication
tier: advanced
platform: android
position: 4
---

# Firebase Authentication

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Advanced › Firebase Authentication

**Goal**

Add Firebase Authentication with email/password and Google sign-in. Persist auth state and expose it reactively to the UI.

**Prerequisites**

- [Dependency injection with Hilt](./03-hilt-di.md)
- A Firebase project (console.firebase.google.com)
- `google-services.json` placed in `app/`

## Gradle setup

```kotlin
// project-level build.gradle.kts
plugins {
    id("com.google.gms.google-services") version "4.4.2" apply false
}

// app-level build.gradle.kts
plugins {
    id("com.google.gms.google-services")
}

dependencies {
    implementation(platform("com.google.firebase:firebase-bom:33.7.0"))
    implementation("com.google.firebase:firebase-auth")
    implementation("com.google.android.gms:play-services-auth:21.2.0")
}
```

## AuthRepository

```kotlin
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow

class AuthRepository {
    private val auth = FirebaseAuth.getInstance()

    val currentUser: FirebaseUser? = auth.currentUser

    fun observeAuthState(): Flow<FirebaseUser?> = callbackFlow {
        val listener = FirebaseAuth.AuthStateListener { trySend(it.currentUser) }
        auth.addAuthStateListener(listener)
        awaitClose { auth.removeAuthStateListener(listener) }
    }

    suspend fun signIn(email: String, password: String): Result<Unit> = runCatching {
        auth.signInWithEmailAndPassword(email, password).await()
    }

    suspend fun createAccount(email: String, password: String): Result<Unit> = runCatching {
        auth.createUserWithEmailAndPassword(email, password).await()
    }

    fun signOut() = auth.signOut()
}
```

## Hilt module for Auth

```kotlin
@Module
@InstallIn(SingletonComponent::class)
object AuthModule {
    @Provides @Singleton
    fun provideAuthRepository(): AuthRepository = AuthRepository()
}
```

## AuthViewModel

```kotlin
@HiltViewModel
class AuthViewModel @Inject constructor(
    private val authRepository: AuthRepository
) : ViewModel() {

    val authState: StateFlow<FirebaseUser?> =
        authRepository.observeAuthState()
            .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), null)

    fun signIn(email: String, password: String) = viewModelScope.launch {
        authRepository.signIn(email, password)
    }
}
```

## Auth-aware UI

```kotlin
@Composable
fun RootScreen() {
    val authState by authViewModel.authState.collectAsStateWithLifecycle()

    if (authState != null) {
        ItemScreen()
    } else {
        LoginScreen(onSignIn = { email, pass -> viewModel.signIn(email, pass) })
    }
}
```

## Checkpoint

```bash
# Run on emulator
# App shows login screen on first launch
# Create account → automatically signed in → list screen appears
# Kill and restart — session persists (Firebase token auto-refreshes)
```

**Next:** [DataStore preferences](./05-datastore.md) — key-value preferences with Flow.
