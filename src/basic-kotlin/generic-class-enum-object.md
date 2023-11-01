# Class, Enum, and Object

## Class

TBD

## Enum

There's a situation when you want to add the input but there's a change to mistype, and make a bug. For example, you have a `class` of `Person`, and one of the properties is `country`

```kt
class Person (
  val name: String,
  val country: String,
)
```

In this case, there's a potential bug if you input it differently.
- `Indonesia`
- `indonesia`
- `Indonesiaa`
- etc

Then, you could use another option like `enum` to make it simpler. Then, you can replace the data type from `String` to the `enum` class

```kt
enum class Country {
  INDONESIA, SINGAPORE, MALAYSIA, THAILAND, JAPAN // else if you want to add it more
}

class Person (
  val name: String,
  val country: Country,
)

fun main() {
  val person = Person("John", Country.INDONESIA)

  println(person) // Person@1b2c6ec2
}
```

The problem is the output only show the class and unique identifier. You could solve it by add `data` before the class `Person`

```kt
enum class Country {
  INDONESIA, SINGAPORE, MALAYSIA, THAILAND, JAPAN // else if you want to add it more
}

data class Person (
  val name: String,
  val country: Country,
)

fun main() {
  val person = Person("John", Country.INDONESIA)

  println(person) // Person(name=John, country=INDONESIA)
}
```

::: tip Information
A data class needs one parameter (at least) in the constructor, and the constructor parameters can only be used `val` or `var`, cannot use `abstract`, `open`, `sealed`, or `inner`
:::

## Object

TBD