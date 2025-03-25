import withNuxt from "./.nuxt/eslint.config.mjs";
import js from "@eslint/js";
import ts from "typescript-eslint";
import eslintPluginVue from "eslint-plugin-vue";
import eslintPluginJsonc from "eslint-plugin-jsonc";
import eslintPluginTailwind from "eslint-plugin-tailwindcss";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

export default withNuxt(
  js.configs.recommended,
  ...ts.configs.recommended,
  ...eslintPluginVue.configs["flat/recommended"],
  ...eslintPluginJsonc.configs["flat/recommended-with-jsonc"],
  ...eslintPluginTailwind.configs["flat/recommended"],
  eslintPluginPrettier,
  {
    files: ["**/*.js", "**/*.ts", "**/*.vue", "**/*.jsx", "**/*.tsx"],
    languageOptions: {
      globals: {
        M: "readonly",
      },
    },
    rules: {
      "no-console": "off",
      "vue/multi-word-component-names": "off",
      "tailwindcss/no-custom-classname": "off",
    },
    ignores: ["**/*.min.css", "**/*.min.js"],
  },
);
