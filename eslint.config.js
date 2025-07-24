import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginSecurity from "eslint-plugin-security";
import tsParser from "@typescript-eslint/parser";  // you may need this for parser in legacy .eslintrc.js, but flat config uses languageOptions
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.mocha,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 12,        // or 2021
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      parser: "@typescript-eslint/parser",
    },

    plugins: {
      js,
      react: pluginReact,
      security: pluginSecurity,
      "@typescript-eslint": null, // no direct import, managed by parser usually
    },

    extends: [
      "js/recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:security/recommended",
    ],

    rules: {
      "security/detect-eval-with-expression": "error",
    },
  },
]);
