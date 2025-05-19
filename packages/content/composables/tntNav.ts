import type { ContentNavigationItem, PageCollections } from "@nuxt/content"
import type { NavigationMenuItem } from "@nuxt/ui"

const mapContentNavToUI = (items: ContentNavigationItem[]): NavigationMenuItem[] => {
  return items.map(item => {
    return {
      label: item.title as string,
      description: item.description as string,
      icon: item.icon as string,
      to: item.path as string,
      children: item.children && !item.hideChildren ? mapContentNavToUI(item.showIndex ? item.children : item.children.filter(c => c.path !== item.path)) : undefined,
      defaultOpen: true,
      sort: item.stem,
    }
  })
}

export const queryNav = async (collection?: keyof PageCollections) => {
  const nav = []

  if (collection) {
    const collectionNav = await queryCollectionNavigation(collection, ['icon', 'description'])
    nav.push(...mapContentNavToUI(collectionNav))
  } else for (const coll of useRuntimeConfig().public.collections as (keyof PageCollections)[]) {
    const collectionNav = await queryCollectionNavigation(coll, ['icon', 'description'])
    nav.push(...mapContentNavToUI(collectionNav))
  }

  return nav.sort((a, b) => {
    const aSort = (a as { sort: string }).sort
    const bSort = (b as { sort: string }).sort
    return aSort < bSort ? -1 : aSort > bSort ? 1 : 0
  })
}

export const tntNav = async (nav: NavigationMenuItem[] | boolean, collection?: keyof PageCollections) => {
  let navItems: NavigationMenuItem[]

  if (typeof nav === "boolean" && nav === true) {
    const data = await queryNav(collection)

    navItems = data
  } else {
    navItems = nav || []
  }

  return navItems
}
