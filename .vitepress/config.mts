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
      { text: 'Intermediate', link: '/intermediate/' },
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
      {
        text: 'Intermediate',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/intermediate/' },
          { text: '01 Why state', link: '/intermediate/01-why-state' },
          { text: '02 UiState and ViewModel', link: '/intermediate/02-uistate-and-viewmodel' },
          { text: '03 Async repository', link: '/intermediate/03-repository-async' },
          { text: '04 Collect state in Compose', link: '/intermediate/04-collect-state' },
          { text: '05 Loading and error UI', link: '/intermediate/05-loading-error-ui' },
          { text: '06 Navigate to detail', link: '/intermediate/06-navigate-to-detail' },
          { text: '07 Run and preview', link: '/intermediate/07-run-and-preview' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/alibaihaqi' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/alibaihaqi/' }
    ]
  }
})
