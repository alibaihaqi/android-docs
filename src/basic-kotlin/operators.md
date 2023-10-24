# Operators

For operators, Kotlin divides into 4 groups:
- Arithmetic Operators
- Assignment Operators


## Arithmetic operators

These are used to perform mathematical operations.

| **Operator** |       **Description**      |
|:------------:|:--------------------------:|
|      `+`     |       Adds 2 numbers       |
|      `-`     |    Subtracts 2 numbers    |
|      `*`     |    Multiplies 2 numbers    |
|      `/`     |      Divides 2 numbers     |
|      `%`     | Returns division remainder |
|     `++`     | Increment the value by one |
|     `--`     |  Decrease the value by one |

::: code-group
```kotlin [Addition]
fun main () {
  val num1: Int = 10
  val num2 = 20

  println(num1 + num2) // 30
}
```

```kotlin [Subtraction]
fun main () {
  val num1: Int = 100
  val num2 = 20

  println(num1 - num2) // 80
}
```

```kotlin [Multiplication]
fun main () {
  val num1: Int = 3
  val num2 = 8

  println(num1 * num2) // 24
}
```

```kotlin [Division]
fun main () {
  val num1: Int = 100
  val num2 = 4

  /*
  * if you divide two numbers with decimal result
  * but doesn't explicitly defined, the result
  * will only show the integer value
  * */
  println(num1 / num2) // 25

  val num3: Int = 100
  val num4 = 6

  // you should change the type from Int to Float/Double
  // depends on your situation
  val result: Float = num3.toFloat() / num4.toFloat()
  println(result) // 16.666666
}
```

```kotlin [Modulus]
fun main () {
  val num1: Int = 10
  val num2 = 2

  println(num1 % num2) // 0

  val num3: Int = 100
  val num4 = 3

  println(num3 % num4) // 1
}
```

```kotlin [Increment]
fun main () {
  var num1: Int = 100

  println(num1++) // 100, you expect to print first then update the value
  println(++num1) // 102, you expect to update the value first then print data

  // why 102? it is the result from previous increment
}
```

```kotlin [Decrement]
fun main () {
  var num1: Int = 100

  println(num1--) // 100, you expect to print first then increase the value
  println(--num1) // 98, you expect to increase the value first then print data

  // why 98? it is the result from previous decrement
}
```
:::

## Assignment Operators

If you want to reassign the value, don't forget to use `var` instead of `val`

| **Operator** |
|:------------:|
|      `=`     |
|     `+=`     |
|     `-=`     |
|     `*=`     |
|     `/=`     |
|     `%=`     |

For example
```kotlin
fun main() {
  var initNum = 10

  initNum += 5
  println(initNum) // 15

  initNum -= 3
  println(initNum) // 12

  initNum *= 5
  println(initNum) // 60

  initNum /= 6
  println(initNum) // 10

  initNum %= 2
  println(initNum) // 0
}
```