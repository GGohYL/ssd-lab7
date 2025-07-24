// eslint.config.mjs
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginSecurity from "eslint-plugin-security";
import tseslint from "typescript-eslint";
import pluginSecurityNode from "eslint-plugin-security-node";
import pluginNoUnsanitized from "eslint-plugin-no-unsanitized";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // JavaScript and JSX files
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha,
      },
    },
  },

  // TypeScript and TSX files
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: pluginReact,
      security: pluginSecurity,
      "security-node": pluginSecurityNode,
      "no-unsanitized": pluginNoUnsanitized,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,
      ...tseslint.configs.recommended[0].rules,
      ...tseslint.configs.recommendedTypeChecked[0].rules,
      ...tseslint.configs.recommendedTypeChecked[0].rules,
      ...pluginSecurityNode.configs.recommended.rules,
      ...pluginNoUnsanitized.configs.recommended.rules,
      "security/detect-eval-with-expression": "error",
    },
  },

  // Generic fallback config for other files
  {
    plugins: {
      security: pluginSecurity,
      "security-node": pluginSecurityNode,
      "no-unsanitized": pluginNoUnsanitized,
    },
    rules: {
      "security/detect-eval-with-expression": "error",
      ...pluginSecurityNode.configs.recommended.rules,
      ...pluginNoUnsanitized.configs.recommended.rules,
    },
  },
];
