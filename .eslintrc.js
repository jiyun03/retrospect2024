module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript', // Nuxt와 TypeScript에 적합한 설정
    'plugin:vue/vue3-recommended', // Vue 3 권장 설정
    'plugin:prettier/recommended', // Prettier와 ESLint 통합
  ],
  plugins: ['vue'],
  rules: {
    'vue/multi-word-component-names': 'off', // Nuxt 기본 컴포넌트 이름 규칙 허용
  },
}
