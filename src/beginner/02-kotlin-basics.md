---
title: Kotlin basics — variables and types
tier: beginner
platform: android
position: 2
---

# Kotlin basics — variables and types

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Beginner › Kotlin basics

**Goal**

Learn the minimum Kotlin vocabulary needed to read every later page in this tier. After this page you will know how to declare variables, write a `main` function, and name the types you'll use to model the list items.

**Prerequisites**

- [Android Studio installed](./01-install-android-studio.md)

## How to run the snippets

Every snippet on this page runs in the [Kotlin Playground](https://play.kotlinlang.org/) — paste, click Run. You don't need Android Studio for these.

## A program

A Kotlin program starts at a function called `main`:

```kotlin
fun main() {
    println("Hello, Mei!")
}
```

- `fun` declares a function.
- `main` is the function name the runtime calls first.
- `println` writes a line to standard output.

## Variables: val and var

Kotlin has two ways to declare a variable.

- `val` — the value cannot be reassigned (read-only).
- `var` — the value can be reassigned.

```kotlin
fun main() {
    val name = "Aarav"
    var count = 0
    count = count + 1
    println("$name has $count messages")
}
```

Run output:

```
Aarav has 1 messages
```

Reassigning a `val` is a compile error. Prefer `val` unless you have a reason to mutate.

## Types

Kotlin infers types from the value. You can also write them explicitly:

```kotlin
val name: String = "Sofia"
val age: Int = 28
val height: Double = 1.65
val isAdmin: Boolean = false
```

The four types you'll meet in this tier:

| Type | What it holds | Example |
|---|---|---|
| `Int` | whole number | `42` |
| `Double` | decimal number | `3.14` |
| `Boolean` | true or false | `true` |
| `String` | text | `"hello"` |

For the full list, see the [Kotlin basic types reference](https://kotlinlang.org/docs/basic-types.html). The four above cover this tier.

## String templates

A `$variable` inside a string interpolates its value. Use `${expression}` when the expression is more than a name:

```kotlin
fun main() {
    val name = "Olu"
    val notifications = 5
    println("$name has $notifications notifications")
    println("Tomorrow $name will have ${notifications + 3}")
}
```

Output:

```
Olu has 5 notifications
Tomorrow Olu will have 8
```

**For frontend developers**

`val` and `var` in Kotlin map closely to `const` and `let` in modern JavaScript. String templates use `$name` and `${expr}` instead of JavaScript's `${name}` everywhere — the bare-name form is the difference.

**Next** → [Kotlin operators](./03-operators.md)
