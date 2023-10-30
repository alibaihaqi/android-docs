# Basic Development

After you finished create a new project, you will automatically get a basic structure folder of the project. You will get something like this:

```
.
├─ setting.gradle.kts
├─ local.properties
├─ gradlew
├─ gradlew.bat
├─ gradlew.properties
├─ build.gradle.kts
├─ .gitignore
├─ .gradle/
├─ gradle/
├─ .idea/
└─ app/
```

with main file for the development is under app folder called `MainActivity.kt`.

::: details MainActivity.kt
```kotlin
package com.alibaihaqi.firstapplication

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent

import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.alibaihaqi.firstapplication.ui.theme.FirstApplicationTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            FirstApplicationTheme {
                // A surface container using the 'background' color from the theme
                Surface(modifier = Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                    Greeting("Android")
                }
            }
        }
    }
}

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Hello $name!",
        modifier = modifier
    )
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    FirstApplicationTheme {
        Greeting("Android")
    }
}
```
:::

For Layout, you can use 3 different elements:
- `Container` or `Box`,
- `Column`, and
- `Row`

Examples:
```kotlin
import androidx.compose.runtime.Composable

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
  Column {
    Row {
      Text(
        text = "Row 1",
        modifier = modifier
      )
    }
    Row {
      Text(
        text = "Row 2",
        modifier = modifier
      )
    }
  }
}
```

You can modify the styling through `modifier` or other properties.
