import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "client/src/components/ui/**",
      "**/*.d.ts",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["client/**/*.{ts,tsx}"],
    plugins: { react, "react-hooks": reactHooks },
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: "18" } },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  {
    files: [
      "server/**/*.ts",
      "script/**/*.ts",
      "prisma/**/*.ts",
      "api/**/*.js",
      "*.config.{ts,js,mjs,cjs}",
    ],
    languageOptions: { globals: { ...globals.node } },
  },
  {
    files: ["server/**/*.ts"],
    ignores: ["server/utils/money.ts"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "BinaryExpression[operator='/'][right.value=100] > CallExpression[callee.object.name='Math'][callee.property.name='round']",
          message:
            "Math.round(x * 100) / 100 is float rounding. Use round()/toNumber() from server/utils/money.",
        },
        {
          selector:
            "CallExpression[callee.name=/^(Number|parseFloat)$/] > MemberExpression[property.name=/^(price|amount|balance|revenue|serviceFee|grossAmount|netAmount|expertNetAmount|commissionAmount|discountAmount|monthlyPrice|yearlyPrice|availableBalance|pendingBalance|walletBalance|totalSpent|avgBooking|avgSpent)$/]",
          message:
            "Number()/parseFloat() on a money field silently converts Decimal to float. Use toNumber() from server/utils/money, or fromJson() for untyped JSON.",
        },
      ],
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // surfaced as warnings (non-blocking) to discourage new unsafe types
      // without failing the build on the existing, reviewed usages
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-namespace": ["error", { allowDeclarations: true }],
    },
  },
  prettier
);
