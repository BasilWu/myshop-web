// apps/web/eslint.config.mjs
import js from '@eslint/js';
import next from '@next/eslint-plugin-next';

export default [
  // 忽略項目：取代舊的 .eslintignore
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'dist/**',
      'out/**',
      'public/**' // 如果想讓 public 也不掃描
    ],
  },

  // JS 基本規則
  js.configs.recommended,

  // Next 官方規則（含 core-web-vitals）
  next.configs['core-web-vitals'],

  // 這段讓 TS / JSX 檔案被辨識（即使沒有另外設定 ts parser）
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    rules: {
      // 這裡可加你想要的客製規則
    },
  },
];