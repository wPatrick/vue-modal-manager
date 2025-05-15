# Vue Modal Manager

A robust, flexible, and global modal manager for Vue 3 (Composition API, TypeScript, TailwindCSS). Designed for modern Vue applications, it supports advanced modal workflows and seamless integration with full-stack frameworks like Laravel (Inertia.js).

---

## Features
- **Universal Modal Support:** Open any Vue component as a modal dialog, with full prop support.
- **Promise-based API:** Await modal results for clean, async workflows.
- **Nested Modals:** Open modals from within modals, with data passing between them.
- **Modern UI:** Styled with TailwindCSS, supports dark mode and responsive layouts.
- **Global State Management:** Singleton composable for consistent modal state across your app.
- **TypeScript-first:** Full type safety for props and modal results.

---

## Installation

```bash
npm install <your-modal-manager-package>
# or
yarn add <your-modal-manager-package>
```

Copy the `components/` and `composables/` folders into your project if not using a package manager.

---

## Basic Usage

Register the `ModalManager` component at your app root (e.g., `App.vue`):

```vue
<template>
  <ModalManager />
  <router-view />
</template>

<script setup>
import ModalManager from './components/ModalManager.vue';
</script>
```

Open a modal from anywhere in your app:

```ts
import { useModalManager } from './composables/useModalManager';
import MyModal from './components/MyModal.vue';

const { openModal } = useModalManager();
const result = await openModal(MyModal, { someProp: 'value' });
if (result) {
  // handle modal result
}
```

---

## Advanced Usage

- **Nested Modals:** You can open a modal from within another modal (see `UserCreateModal.vue` and `RoleModal.vue` in the demo).
- **Data Passing:** Pass props to modals and receive results via the Promise API.
- **Custom Widths:** Use the `maxWidth` option for different modal sizes (`'sm' | 'md' | 'lg' | 'xl' | '2xl'`).

---

## Integration with Laravel (Inertia.js + Vue)

This modal manager works seamlessly in Laravel projects using Inertia.js and Vue 3. Here’s how to integrate:

1. **Copy Components:** Place `ModalManager.vue`, `Modal.vue`, and the `useModalManager.ts` composable into your Inertia Vue resources (e.g., `resources/js/Components/` and `resources/js/Composables/`).

2. **Register Globally:** In your `app.js` or main Vue entrypoint:

```js
import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/inertia-vue3';
import ModalManager from './Components/ModalManager.vue';

createInertiaApp({
  // ...existing config...
  setup({ el, App, props, plugin }) {
    const vueApp = createApp({ render: () => h(App, props) });
    vueApp.component('ModalManager', ModalManager);
    vueApp.use(plugin);
    vueApp.mount(el);
  },
});
```

3. **Add to Layout:** Add `<ModalManager />` to your main layout (e.g., `AppLayout.vue`):

```vue
<template>
  <ModalManager />
  <slot />
</template>
```

4. **Use in Pages/Components:**

```ts
import { useModalManager } from '@/Composables/useModalManager';
import MyModal from '@/Components/MyModal.vue';

const { openModal } = useModalManager();
const result = await openModal(MyModal, { foo: 'bar' });
```

---

## Demo

See `demo/Dashboard.vue` and the example modals in `demo/` for real-world usage, including nested modals and data passing.

---

## API Reference

### `useModalManager()`
- `openModal(component, props?, maxWidth?)`: Opens a modal, returns a Promise resolved with modal result.
- `closeModal(id)`: Closes a modal by ID.
- `closeModalWithSuccess(id, data)`: Closes a modal and resolves with data.
- `closeAllModals()`: Closes all open modals.

### Modal Props
- `show` (boolean): Controls modal visibility.
- `maxWidth` (string): Modal width (`'sm' | 'md' | 'lg' | 'xl' | '2xl'`).
- `closeable` (boolean): If false, disables closing by overlay or Escape.

---

## License
MIT
