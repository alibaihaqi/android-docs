# General Info

To start a new project with Kotlin, open your `Android Studio`. You'll see this view.

![New Project](/assets/jetpack-compose/new-project.png)

You can start with `Empty Activity` and click `Next`.

![New Project Config](/assets/jetpack-compose/new-project-config.png)

In this section, you'll fill:
- `Application Name`
- `Package Name`: usually use domain `example.com` and reverse it `com.example` + application name (when you write the application name, it will generate lower case application name)
- `Save Location`: Place to save your application
- `Minimum SDK`: Minimum SDK that you applied for the application, it will impact the user can download the application.
- `Build Configuration Language`: Build configuration for the application, you can use
    - Kotlin DSL (build.gradle.kts) (Recommended)
    - Kotlin DSL (build.gradle.kts) + Gradle Version Catalog (Experimental)
    - Groovy DSL (build.gradle)

::: warning
If you get error `The path '/Users' is not writable. Please choose a new location`, please check if the destination is existed.
:::