# ObserverLite

A lightweight, dependency-free global observer (pub/sub) utility for state sharing and events across components or modules.

Works in **browsers**, **Node.js**, and **Web Workers** with zero dependencies. Includes optional **UMD build** for direct `<script>` usage.

---

## 🚀 Features

- 🧠 Global singleton support (via `key`)
- 🔄 Subscribe / Unsubscribe / Unsubscribe All
- ⏳ Promise-based `once()` for async waiting or `await` usage
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

const observer = new ObserverLite({ key: 'userLoaded' })

const sub$ = observer.subscribe(data => {
  console.log('User loaded:', data)
})

observer.next({ name: 'Alice' })  // Logs: User loaded: { name: 'Alice' }
```

---

### 🔁 Wait for a one-time event (`once`) — Async/Await

```js
const observer = new ObserverLite({ key: 'dataReady' })

// Option 1: Promise
observer.once().then(data => {
  console.log('Once (then):', data)
})

// Option 2: async/await
const getData = async () => {
  const data = await observer.once()
  console.log('Once (await):', data)
}

getData()

// Trigger the data
observer.next('Loaded!')
```

---

## 🌐 Usage in Browser (UMD Build)

```html
<script src="ObserverLite.umd.min.js"></script>
<script>
  const observer = new ObserverLite({ key: 'myEvent' })
  const sub$ = observer.subscribe(data => console.log('Received:', data))
  observer.next('Hello from browser!')
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
| `.subscribe(callback)`    | Subscribe to events, returns `sub$`           |
| `.unsubscribe(sub$)`      | Unsubscribe a specific subscription           |
| `.unsubscribeAll()`       | Remove all subscriptions                      |
| `.next(...args)`          | Trigger event with data                       |
| `.once()`                 | Wait for first event — Promise/await support  |
| `.setOnce(data)`          | Manually set data for `once()`                |

---

## 🧑‍🎤 Author

**Your Name**  
GitHub: [@webowski-shopify](https://github.com/webowski-shopify)

---

## 📄 License

MIT — free to use, modify, and distribute.

---

## ⭐️ Star the Repo!

If you find this useful, drop a ⭐️ on [GitHub](https://github.com/webowski-shopify/observer-lite)!
