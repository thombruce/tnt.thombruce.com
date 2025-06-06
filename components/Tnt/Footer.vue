<script setup lang="ts">
import { tv } from 'tailwind-variants'

const copyright = tntTranslate('nuxtSiteConfig.copyright', useAppConfig().site?.copyright)

const { ui: { pattern: backgroundPattern } } = useAppConfig()

const { /* color = 'neutral', */ variant = undefined } = defineProps<{
  // color?: 'neutral' | 'primary'
  variant?: 'bordered' | 'solid' | 'ghost'
  // TODO: Size - it would be nice to allow larger text; given that this
  //       ought to be a fixed/sticky element though, we must give consideration
  //       to the space occupied when positioning other content.
}>()

const footer = computed(() => tv({
  base: 'w-full',
  variants: {
    variant: {
      bordered: 'bg-muted border-t border-accented',
      solid: 'bg-(--ui-bg)',
      ghost: 'bg-transparent',
    },
  },
  compoundVariants: [
    {
      variant: ['solid', 'ghost'],
      class: 'border-none',
    },
  ],
  defaultVariants: {
    variant: 'bordered',
  },
}))
</script>

<template lang="pug">
div(:class="footer({ variant })")
  UContainer(
    class="flex \
          items-center \
          justify-between"
  )
    div(class="py-2 grow text-center")
      p(v-if="copyright" class="text-sm text-muted") {{ copyright }}
      p(v-if="backgroundPattern" class="text-sm text-muted")
        a(href="https://heropatterns.com/") Hero Patterns
        |
        | by Steve Schoger (
        a(href="https://creativecommons.org/licenses/by/4.0/") CC By 4.0
        | )
</template>
