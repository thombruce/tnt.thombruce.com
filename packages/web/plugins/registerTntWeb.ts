// Registers tntOgImageComponent composable as a pageFunction
// in appConfig. This is called from TNT Core [...slug].vue.
export default defineNuxtPlugin(() => {
  updateAppConfig({
    pageFunctions: [tntOgImageComponent],
  })
})
