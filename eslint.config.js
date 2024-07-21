import { defineConfig } from '@soybeanjs/eslint-config';

export default defineConfig(
  { vue: true, unocss: true },
  {
    rules: {
      'no-continue': 'off',
      'no-unreachable-loop': 'off',
      'no-nested-ternary': 'warn',
      'no-plusplus': 'off',
      'vue/custom-event-name-casing': 'off',
      'no-bitwise': 0,
      'guard-for-in': 0,
      'vue/multi-word-component-names': [
        'off',
        {
          ignores: ['index', 'App', 'Register', '[id]', '[url]']
        }
      ],
      'vue/no-static-inline-styles': [
        'off',
        {
          allowBinding: true
        }
      ],
      'vue/component-name-in-template-casing': [
        'warn',
        'PascalCase',
        {
          registeredComponentsOnly: false,
          ignores: ['/^icon-/']
        }
      ],
      'unocss/order-attributify': 'off'
    }
  }
);
