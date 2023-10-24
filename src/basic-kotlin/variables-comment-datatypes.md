# Variables

For variables, the declaration might be different Java and Kotlin. This is only cover for Kotlin but will update after I learn it with different language in different section. You can use [Kotlin Playground](https://developer.android.com/training/kotlinplayground) to explore how to write code with Kotlin.

## Getting Started

Do you familiar with this? Yes, when you start learn programming language, you might start with `Hello, World!` or `Hello World`.

```kotlin
fun main() {
    println("Hello, world!")
}
```

- `fun`: represents a function
- `main`: it's the function name, usually used run the main application (same implementation in `Go` as well)
- `println`: it's used to print the information you want to log, it ends with add the new line.
    - `print`: you can also use print to show the log but it doesn't add new line, so the log will be on the same line if you also put the log after.

## Variables

For variable declaration, we can use `val` or `var`. What's the difference?
- `val`: used for variable that the value will be `static` (cannot be changed) or constant.
- `var`: used for variable that can be `modified`/`changed`.

::: code-group
```kotlin [val]
fun main() {
    val name: String = "John"
    println(name)
    
    name = "Doe" // Error: Val cannot be reassigned
    println(name)
}
```

```kotlin [var]
fun main() {
    var name: String = "John"
    println(name)
    
    name = "Doe" // Error: Val cannot be reassigned
    println(name)
}

// The output is:
// John
// Doe
```
:::

There are different ways to declare the variable.

```kotlin
val name: String = "John" // explicitly declare the data type
val age = 17 // kotlin will assign the data type based on value you putts
```

## Comments

The implementation for comments relatively same with other programming languages.

### Single-Line Comments

To implement it, you can use with two forward slashes (`//`). You put it `above` or `after` the variable, function, etc. You can also use multiple single line comments if you want (or you can use `multi-line comments`)

For example,
```kotlin
fun main() {
    // This is variable for name
    var name: String = "John"

    println(name) // This is used to print the text
}
```

### Multi-Line Comments

To implement `multi-line`, you might need the specific space for the comments. You can start and close with forward slashes and asterisk `(/* */)` (order matters, open it with `/*` and close it with `*/`)

For example,
```kotlin
fun main() {
    /*
    * This is variable for name
    */ 
    var name: String = "John"

    println(name)
}
```

## Data Types

There are a lot data types in Kotlin (might not complete here).

Data types are divided into different groups:

- Number
- Boolean
- Character
- String

### Number Types

Number itself divided into 2 (two) groups, `Integer` and `Floating Point`.
- `Integer`: has 4 (four) different types (`Byte`, `Short`, `Int`, and `Long`), if you're not defined the types, might fallback to `Int`
- `Floating Point`: has 2 (two) different types (`Float` and `Double`), if you're not defined the types, might fallback to `Double`

| **Name** |    **Group**   |                  **Range**                  |
|:--------:|:--------------:|:-------------------------------------------:|
|  `Byte`  |     Integer    |                 -128 to 127                 |
|  `Short` |     Integer    |               -32768 to 32767:              |
|   `Int`  |     Integer    |          -2147483648 to 2147483647          |
|  `Long`  |     Integer    | -9223372036854775807 to 9223372036854775807 |
|  `Float` | Floating Point |   precision only for 6 to 7 decimal digits  |
| `Double` | Floating Point |        precision only about 15 digits       |

### Boolean Type

The `Boolean` data types are `true` and `false`

### Character Type

The `Char` type can only store a `single` character and must surrounded by `single` quotes. It could only take value `A-Z` and `a-z`.

For example
```kotlin
fun main() {
    var char: Char = 'J'

    println(char)
}
```

### String Type

The `String` type can store sequence of characters like example in the beginning of the page

```kotlin
fun main() {
    val hello: String = "Hello World!"
    println(hello)
}
```