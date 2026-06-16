---
title: Kotlin operators
tier: beginner
platform: android
position: 3
---

# Kotlin operators

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Beginner › Kotlin operators

**Goal**

Read and write Kotlin arithmetic, comparison, and logical expressions. After this page you will recognise every operator that appears in this tier's code samples.

**Prerequisites**

- [Variables and types](./02-kotlin-basics.md)

## Arithmetic

The five arithmetic operators behave the same as in most languages:

| Operator | Meaning |
|---|---|
| `+` | add |
| `-` | subtract |
| `*` | multiply |
| `/` | divide |
| `%` | remainder |

```kotlin
fun main() {
    val a = 100
    val b = 6
    println(a + b) // 106
    println(a / b) // 16  — Int / Int truncates
    println(a % b) // 4
}
```

Integer division truncates. If you want a decimal result, convert at least one side:

```kotlin
fun main() {
    val a = 100
    val b = 6
    println(a.toDouble() / b) // 16.666666666666668
}
```

## Assignment

`=` assigns. The compound forms (`+=`, `-=`, `*=`, `/=`, `%=`) require a `var`:

```kotlin
fun main() {
    var total = 10
    total += 5
    total *= 2
    println(total) // 30
}
```

## Comparison

Comparisons return `Boolean`:

| Operator | Meaning |
|---|---|
| `==` | equal |
| `!=` | not equal |
| `>` | greater than |
| `<` | less than |
| `>=` | greater or equal |
| `<=` | less or equal |

Kotlin's `==` is structural equality (same value). Reference equality uses `===` and you almost never need it at this tier.

```kotlin
fun main() {
    val price = 25
    println(price == 25) // true
    println(price >= 30) // false
}
```

## Logical

Three logical operators combine `Boolean` values:

| Operator | Meaning |
|---|---|
| `&&` | both true |
| `\|\|` | either true |
| `!` | invert |

```kotlin
fun main() {
    val age = 28
    val isMonday = true
    val getsDiscount = age in 13..60 && isMonday
    println(getsDiscount) // true
}
```

`age in 13..60` is the range check — handy for the lookups you'll see in the next page's lambda example.

**Next** → [Functions and lambdas](./04-functions-and-lambdas.md)
