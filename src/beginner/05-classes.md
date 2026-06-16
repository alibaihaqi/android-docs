---
title: Classes and data classes
tier: beginner
platform: android
position: 5
---

# Classes and data classes

[Hub](https://alibaihaqi.github.io/learning-docs/) › Android › Beginner › Classes and data classes

**Goal**

Model a list item with a `data class`. After this page you will have the `Book` type the exit artifact's list will render.

**Prerequisites**

- [Variables and types](./02-kotlin-basics.md)
- [Functions and lambdas](./04-functions-and-lambdas.md)

## A class

A class bundles named properties into one type. Kotlin has no `new` keyword — you call the class like a function:

```kotlin
class Person(val name: String, val age: Int)

fun main() {
    val hina = Person("Hina", 31)
    println(hina.name) // Hina
    println(hina.age)  // 31
}
```

- Properties declared in the constructor with `val` are read-only and visible from outside (`hina.name`).
- Use `var` instead of `val` if you want to reassign the property after construction.

Print the object itself and you get garbage:

```kotlin
println(hina) // Person@7291c18f
```

That's the JVM's default `toString`. To make objects useful as values, mark the class `data`.

## A data class

A `data class` is a class meant to hold values. The compiler generates `toString`, `equals`, `hashCode`, and `copy` for you.

```kotlin
data class Book(val title: String, val author: String)

fun main() {
    val a = Book("The Pragmatic Programmer", "Hunt & Thomas")
    val b = Book("The Pragmatic Programmer", "Hunt & Thomas")

    println(a)        // Book(title=The Pragmatic Programmer, author=Hunt & Thomas)
    println(a == b)   // true  — structural equality, generated for you
}
```

Rules:

- A data class needs at least one constructor parameter.
- All constructor parameters must be `val` or `var`.

For everything you can do with classes (inheritance, interfaces, sealed types, generics), see the [Kotlin classes reference](https://kotlinlang.org/docs/classes.html). At this tier we only need plain data classes.

## The type we'll render

This is the type the exit artifact will display:

```kotlin
data class Book(val title: String, val author: String)

val library = listOf(
    Book("The Pragmatic Programmer", "Hunt & Thomas"),
    Book("Clean Code", "Robert C. Martin"),
    Book("Designing Data-Intensive Applications", "Martin Kleppmann"),
    Book("The Mythical Man-Month", "Frederick P. Brooks"),
    Book("Refactoring", "Martin Fowler"),
)

fun main() {
    library.forEach { println("${it.title} — ${it.author}") }
}
```

`listOf(...)` builds a read-only `List<Book>`. `forEach { ... }` calls the lambda once per element with `it` bound to that element.

Output:

```
The Pragmatic Programmer — Hunt & Thomas
Clean Code — Robert C. Martin
Designing Data-Intensive Applications — Martin Kleppmann
The Mythical Man-Month — Frederick P. Brooks
Refactoring — Martin Fowler
```

Keep this list — page 11 reuses it inside the Compose app.

**Next** → [What Jetpack Compose is](./06-what-compose-is.md)
