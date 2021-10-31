module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-var-requires': 0,
    "@typescript-eslint/explicit-module-boundary-types": [
      "warn",
      {
        "allowedNames": ["ngOnInit", "ngOnDestroy", "ngAfterViewInit", "ngOnChanges"]
      }
    ]
  },
  globals: {
    defineProps: "writable",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly"
  }

}
