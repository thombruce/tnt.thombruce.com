// @ts-check
import withNuxt from '.nuxt/eslint.config.mjs'

export default withNuxt([{
  rules: {
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 0
  }
}])
