import tseslint from "typescript-eslint";

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
  },
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts"],
  },
);
