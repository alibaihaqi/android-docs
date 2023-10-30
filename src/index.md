---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Android Documentation"
  tagline: Build your android application
  actions:
    - theme: brand
      text: Introduction
      link: /introduction/
    - theme: alt
      text: Getting Started
      link: /introduction/getting-started

features:
  - title: Basic Kotlin Knowledge
    details: Understand the kotlin basic
    link: /basic-kotlin/
  - title: Jetpack Compose
    details: Develop project with Jetpack Compose
    link: /jetpack-compose/
#   - title: Feature C
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-name-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
}
</style>