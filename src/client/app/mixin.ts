import { App, defineAsyncComponent } from 'vue'
import { joinPath } from './utils'
import { SiteDataRef } from './composables/siteData'
import { PageDataRef } from './composables/pageData'
import { Content } from './components/Content'
import { ClientOnly } from './components/ClientOnly'

export function mixinGlobalComputed(
  app: App,
  site: SiteDataRef,
  siteByRoute: SiteDataRef,
  page: PageDataRef
): void {
  Object.defineProperties(app.config.globalProperties, {
    $site: {
      get() {
        return site.value
      }
    },

    $siteByRoute: {
      get() {
        return siteByRoute.value
      }
    },

    $themeConfig: {
      get() {
        return siteByRoute.value.themeConfig
      }
    },

    $page: {
      get() {
        return page.value
      }
    },

    $frontmatter: {
      get() {
        return page.value.frontmatter
      }
    },

    $title: {
      get() {
        return page.value.title
          ? page.value.title + ' | ' + siteByRoute.value.title
          : siteByRoute.value.title
      }
    },

    $description: {
      get() {
        return page.value.description || siteByRoute.value.description
      }
    },

    $withBase: {
      value(path: string) {
        return joinPath(site.value.base, path)
      }
    }
  })
}

export function mixinGlobalComponents(app: App) {
  app.component('Content', Content)
  app.component('ClientOnly', ClientOnly)
  app.component(
    'Debug',
    import.meta.env.PROD
      ? () => null
      : defineAsyncComponent(() => import('./components/Debug.vue'))
  )
}
