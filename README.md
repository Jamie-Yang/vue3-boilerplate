# vue3-boilerplate

A Vue 3 starter with Vue Router 5, Pinia 4, TypeScript 6 and Webpack 5.

## Requirements

- Node.js `^22.18.0 || >=24.11.0`
- pnpm 10

## Getting started

```bash
pnpm install --frozen-lockfile
pnpm dev
```

The development server listens on port `8080` by default.

## Commands

| Command           | Description                                                               |
| ----------------- | ------------------------------------------------------------------------- |
| `pnpm dev`        | Start the development server.                                             |
| `pnpm build`      | Create a production bundle in `dist/`. Clears the output directory first. |
| `pnpm type-check` | Check TypeScript and Vue files without generating a bundle.               |
| `pnpm lint`       | Run Prettier, ESLint and Stylelint with formatting and automatic fixes.   |

## Project structure

```text
├─ public                 # Static files copied to the output directory.
├─ service
│  ├─ commands            # Development and build entry points.
│  ├─ config              # Webpack configuration.
│  └─ project.config.js   # Port, public paths and output directory.
├─ src
│  ├─ assets              # Shared images, fonts and styles.
│  ├─ components          # Shared Vue components.
│  ├─ router              # Routes; uses hash history.
│  ├─ stores              # Pinia stores.
│  └─ views               # Pages and their local components and assets.
```

The `@/` import alias points to `src/`.

## Configuration

- Set the development port, development/production public paths and output directory in `service/project.config.js`.
- Configure target browsers in `.browserslistrc`.
- Static files belong in `public/`; `public/index.html` is the HTML template.

## Environment variables

- `.env` contains shared values.
- `.env.development` and `.env.production` contain values for their respective commands.
- `.env.local` and `.env.<mode>.local` contain local overrides and are ignored by Git.
- Existing environment variables take precedence. File values take precedence in this order: `.env.<mode>.local`, `.env.<mode>`, `.env.local`, `.env`.

Variables prefixed with `VUE_APP_` are embedded in client code and can be read through `process.env.VUE_APP_*`. Do not put secrets in these variables. `NODE_ENV` and `PUBLIC_PATH` are also available in client code.

```ts
const apiBaseUrl = process.env.VUE_APP_API_BASE_URL
```

Restart the development server after changing environment files or build configuration.
