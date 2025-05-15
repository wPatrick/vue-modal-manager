# Vue Modal Manager

Ein flexibler, globaler Modal-Manager für Vue 3 (Composition API, TypeScript, TailwindCSS).

## Features
- Öffne beliebige Komponenten als Modal
- Promise-basierte API (asynchrone Rückgabe von Daten)
- Verschachtelte Modals (Nesting) und Datenübergabe
- Modernes UI mit TailwindCSS
- Globales State-Management via Composable

## Demo
Siehe `demo/Dashboard.vue` und die Beispielmodals in `demo/`.

## Verwendung
```ts
import { useModalManager } from './composables/useModalManager';
const { openModal } = useModalManager();
const result = await openModal(MyComponent, { foo: 'bar' });
```

## Lizenz
MIT
