# vue3-boilerplate

A Vue 3 Starter Boilerplate with Vue Router 4, Pinia 2, Typescript 5, Webpack 5, Prettier and More.

**And not using the Vue CLI.**

## Architecture

```text
├─ public           // static assets.
├─ service          // commands and webpack configurations.
├─ src
│  ├─ assets        // assets such as images or font files.
│  ├─ components    // universal Vue components.
│  ├─ router        // view's routers config.
│  ├─ stores        // Pinia stores.
│  ├─ typings       // typescript .d.ts files.
│  └─ views         // pages.
```

## Commands

```bash
# Start development server.
yarn dev

# Compile production bundle.
yarn build
```
