# Function and Lambda

## Function

We can write function in Kotlin by using `fun` keyword.

::: details Function Examples
These are question when I learn `function` in `Jetpack Compose` modules.

For this case, the function required param `numberOfMessages` as an input.
```kotlin
fun main() {
    val morningNotification = 51
    val eveningNotification = 135
    
    printNotificationSummary(morningNotification)
    printNotificationSummary(eveningNotification)
}


fun printNotificationSummary(numberOfMessages: Int) {
    if (numberOfMessages < 100) {
        println("You have ${numberOfMessages} notifications.")
    } else {
        println("Your phone is blowing up! You have 99+ notifications.")
    }
}
```

For this case, `ticketPrice` function require 2 parameters, `age` and `isMonday` or not. Discount on Monday `only` applied for `adult`

```kotlin
fun main() {
    val child = 5
    val adult = 28
    val senior = 87
    
    val isMonday = true
    
    println("The movie ticket price for a person aged $child is \$${ticketPrice(child, isMonday)}.")
    println("The movie ticket price for a person aged $adult is \$${ticketPrice(adult, isMonday)}.")
    println("The movie ticket price for a person aged $senior is \$${ticketPrice(senior, isMonday)}.")
}
 
fun ticketPrice(age: Int, isMonday: Boolean): Int {
    return when(age) {
        in 0..12 -> 15
        in 13..60 -> if (isMonday) 25 else 30
        in 61..100 -> 20
        else -> -1
    }
}
```
:::

## Lambda

Lambda function and anonymous functions are **function literals**. Function literals are functions that are not declared but are passed immediately as an expression.

::: details Lambda Examples
These are question when I learn `lambda` in `Jetpack Compose` modules.

This question has implement lambda on `printFinalTemperature` function where we can put it in the last parameter

```kotlin
fun main() {
    // Fill in the code.
    // 27.0 degrees Celsius is 80.60 degrees Fahrenheit.
	// 350.0 degrees Kelvin is 76.85 degrees Celsius.
	// 10.0 degrees Fahrenheit is 260.93 degrees Kelvin.
	// Celsius to Fahrenheit: ° F = 9/5 (° C) + 32
	// Kelvin to Celsius: ° C = K - 273.15
	// Fahrenheit to Kelvin: K = 5/9 (° F - 32) + 273.15
    
    printFinalTemperature(27.0, "Celsius", "Fahrenheit") {
		val F = it * 9 / 5 + 32
        F
    }
    printFinalTemperature(350.0, "Kelvin", "Celsius") {
        it - 273.15
    }
    printFinalTemperature(10.0, "Fahrenheit", "Kelvin") {
        (it - 32) * 5 / 9 + 273.15
    }
}

fun printFinalTemperature(
    initialMeasurement: Double, 
    initialUnit: String, 
    finalUnit: String, 
    conversionFormula: (Double) -> Double
) {
    val finalMeasurement = String.format("%.2f", conversionFormula(initialMeasurement)) // two decimal places
    println("$initialMeasurement degrees $initialUnit is $finalMeasurement degrees $finalUnit.")
}
```

This question is related to `class` implementation.

```kotlin
fun main() {    
    val amanda = Person("Amanda", 33, "play tennis", null)
    val atiqah = Person("Atiqah", 28, "climb", amanda)
    
    amanda.showProfile()
    atiqah.showProfile()
}

class Person(val name: String, val age: Int, val hobby: String?, val referrer: Person?) {
    fun showProfile() {
       println("Name: $name")
       println("Age: $age")
       
        var hasReferrer = "Doesn't have a referrer."
        if (referrer?.name != null) {
            val referrerName = referrer.name
            val referrerHobby = referrer.hobby
            hasReferrer = "Has a referrer named $referrerName, who likes to $referrerHobby."
        }
        if (hobby != null) {
            println("Likes to $hobby. $hasReferrer")
        } else {
            println("$hasReferrer")
        }
    }
}

// Name: Amanda
// Age: 33
// Likes to play tennis. Doesn't have a referrer.

// Name: Atiqah
// Age: 28
// Likes to climb. Has a referrer named Amanda, who likes to play tennis.
```

This question is related to `auctionPrice` function who has optional param `bid`. If there's a bid, we need to return the bid value or fallback to minimum price bid.

```kotlin
fun main() {
    val winningBid = Bid(5000, "Private Collector")
    
    println("Item A is sold at ${auctionPrice(winningBid, 2000)}.")
    println("Item B is sold at ${auctionPrice(null, 3000)}.")
}

class Bid(val amount: Int, val bidder: String)
 
fun auctionPrice(bid: Bid?, minimumPrice: Int): Int {
   // Fill in the code.
   return bid?.amount ?: minimumPrice // Ternary in Kotlin
}

// Item A is sold at 5000.
// Item B is sold at 3000.
```
:::
