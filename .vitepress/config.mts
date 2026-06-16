import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/android-docs/',
  cleanUrls: true,
  lang: 'en-US',
  lastUpdated: true,
  srcDir: 'src',

  locales: {
    root: {
      label: 'English',
      lang: 'en'
    },
    // fr: {
    //   label: 'French',
    //   lang: 'fr', // optional, will be added  as `lang` attribute on `html` tag
    // }
  },

  title: 'Android Documentation',
  description: 'Android Documentation Collection',

  head: [
    ['link', { rel: 'icon', href: 'https://www.alibaihaqi.com/favicon.ico' }]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Introduction', link: '/introduction/' },
      { text: 'Beginner', link: '/beginner/' },
    ],

    search: {
      provider: 'local',
    },

    footer: {
      copyright: 'Copyright © 2023 - Present by Fadli Al Baihaqi'
    },

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Introduction', link: '/introduction/' },
          { text: 'Getting Started', link: '/introduction/getting-started' }
        ]
      },
      {
        text: 'Beginner',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/beginner/' },
          { text: '01 Install Android Studio', link: '/beginner/01-install-android-studio' },
          { text: '02 Kotlin basics: variables and types', link: '/beginner/02-kotlin-basics' },
          { text: '03 Kotlin operators', link: '/beginner/03-operators' },
          { text: '04 Functions and lambdas', link: '/beginner/04-functions-and-lambdas' },
          { text: '05 Classes and data classes', link: '/beginner/05-classes' },
          { text: '06 What Jetpack Compose is', link: '/beginner/06-what-compose-is' },
          { text: '07 Basic composables', link: '/beginner/07-basic-composables' },
          { text: '08 Modifiers', link: '/beginner/08-modifiers' },
          { text: '09 State', link: '/beginner/09-state' },
          { text: '10 LazyColumn', link: '/beginner/10-lazy-column' },
          { text: '11 One-screen list app', link: '/beginner/11-one-screen-list-app' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/alibaihaqi' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/alibaihaqi/' }
    ]
  }
})
