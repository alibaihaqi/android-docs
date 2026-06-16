---
title: Functions and lambdas
tier: beginner
platform: android
position: 4
---

# Functions and lambdas

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Beginner › Functions and lambdas

**Goal**

Declare functions with parameters and a return type, and pass a lambda as a parameter. After this page you will be ready to read `@Composable` functions, which are just Kotlin functions with one annotation.

**Prerequisites**

- [Variables and types](./02-kotlin-basics.md)
- [Operators](./03-operators.md)

## Functions

A function declaration names its parameters and its return type:

```kotlin
fun ticketPrice(age: Int, isMonday: Boolean): Int {
    return when (age) {
        in 0..12 -> 15
        in 13..60 -> if (isMonday) 25 else 30
        in 61..100 -> 20
        else -> -1
    }
}

fun main() {
    println(ticketPrice(28, true))  // 25
    println(ticketPrice(5, false))  // 15
}
```

- Parameters look like `name: Type`, separated by commas.
- The return type goes after the parameter list, separated by `:`.
- `when` is Kotlin's switch. Each branch is `value -> result`. The result of the branch is the result of the `when`.

If the function returns nothing, omit the return type (or write `Unit`):

```kotlin
fun greet(name: String) {
    println("Hello, $name")
}
```

## Lambdas

A *lambda* is a function literal — a function written inline as a value. You assign it to a variable or pass it as an argument.

```kotlin
fun main() {
    val double: (Int) -> Int = { n -> n * 2 }
    println(double(5)) // 10
}
```

- The type `(Int) -> Int` says: takes an `Int`, returns an `Int`.
- Inside the braces, `n -> n * 2` is "for input `n`, give back `n * 2`".

When a lambda is the last argument to a function, you can write it outside the parentheses. This is *trailing lambda syntax* — and it's the shape every Compose call uses.

```kotlin
fun printFinalTemperature(
    initial: Double,
    fromUnit: String,
    toUnit: String,
    convert: (Double) -> Double,
) {
    val result = String.format("%.2f", convert(initial))
    println("$initial $fromUnit is $result $toUnit")
}

fun main() {
    printFinalTemperature(27.0, "Celsius", "Fahrenheit") {
        it * 9 / 5 + 32
    }
}
```

Two things to notice:

- The lambda body uses `it` — that's the implicit name for a single-parameter lambda.
- The call site has no `convert = {…}` — the trailing lambda fills that slot.

When you write `Column { Text("hi") }` in the next pages, you're using the same syntax: `Column` takes a content lambda as its last argument.

**For frontend developers**

Trailing-lambda syntax is the closest Kotlin gets to JSX children. Reading `Column { Text("hi") }` as "Column whose children are Text" is the right mental model — the braces are a function passed as the last argument, not a special block.

**Next** → [Classes and data classes](./05-classes.md)
