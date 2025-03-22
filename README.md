# ObserverLite

A lightweight, dependency-free global observer (pub/sub) utility for state sharing and events across components or modules.

Works in **browsers**, **Node.js**, and **Web Workers** with zero dependencies. Includes optional **UMD build** for direct `<script>` usage.

---

## 🚀 Features

- 🧠 Global singleton support (via `key`)
- 🔄 Subscribe / Unsubscribe / Unsubscribe All
- ⏳ Promise-based `once()` for async waiting
- 🪶 Tiny and fast — pure JavaScript
- 🌍 Works in any environment (via `globalThis`)

---

## 📦 Install

```bash
npm install observer-lite
```

---

## 🧑‍💻 Usage (npm / modules)

```js
import { ObserverLite } from 'observer-lite'

const obs = new ObserverLite({ key: 'userLoaded' })

obs.subscribe(data => {
  console.log('User loaded:', data)
})

obs.next({ name: 'Alice' })  // Logs: User loaded: { name: 'Alice' }
```

### 🔁 Wait for a one-time event:

```js
obs.once().then(data => {
  console.log('Once:', data)
})
```

---

## 🌐 Usage in Browser (UMD Build)

```html
<script src="ObserverLite.umd.min.js"></script>
<script>
  const obs = new ObserverLite({ key: 'myEvent' })
  obs.subscribe(data => console.log('Received:', data))
  obs.next('Hello from browser!')
</script>
```

---

## 🗂 File Overview

| File                      | Description                                |
|--------------------------|--------------------------------------------|
| `ObserverLite.js`        | Main module (ESM/CommonJS)                 |
| `ObserverLite.umd.js`    | UMD build (non-minified)                   |
| `ObserverLite.umd.min.js`| Minified UMD build for browser             |

---

## 🛠 API

| Method                    | Description                                   |
|---------------------------|-----------------------------------------------|
| `new ObserverLite({key})` | Create or reuse a global instance by `key`    |
| `.subscribe(callback)`    | Subscribe to events                           |
| `.unsubscribe(sub)`       | Unsubscribe a specific subscription           |
| `.unsubscribeAll()`       | Remove all subscriptions                      |
| `.next(...args)`          | Trigger event with data                       |
| `.once()`                 | Wait for first event, returns Promise         |
| `.setOnce(data)`          | Manually set data for `once()`                |

---

## 🧑‍🎤 Author

**Your Name**  
GitHub: [@yourusername](https://github.com/webowski-shopify)

---

## 📄 License

MIT — free to use, modify, and distribute.

---

## ⭐️ Star the Repo!

If you find this useful, drop a ⭐️ on [GitHub](https://github.com/webowski-shopify/observer-lite)!
