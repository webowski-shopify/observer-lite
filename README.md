# ObserverLite

A lightweight, dependency-free global observer (pub/sub) utility for state sharing and events across components or modules.

Works in **browsers**, **Node.js**, and **Web Workers** with zero dependencies. Includes optional **UMD build** for direct `<script>` usage.

---

## 🚀 Features

- 🧠 Global singleton support (via optional `key`)  
  Using the same `key` across modules/components enables shared state/events via a singleton ObserverLite instance.
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

const observer = new ObserverLite()

const sub$ = observer.subscribe(data => {
  console.log('User loaded:', data)
})

// broadcast to observers
observer.next({ name: 'Alice' })  // Logs: User loaded: { name: 'Alice' }

// remove a subscription
observer.unsubscribe(sub$)

// remove all subscriptions
observer.unsubscribeAll()

```

---

### 🔁 Wait for a one-time event (`once`)

```js
const observer = new ObserverLite()

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

### 🔁 More Examples

```js

// a producer class
class SomeProducerClass(){
  constructor(){
    // create an observer for this class to pass data to
    this.observer = new ObserverLite({key:'SomeData$'})

    // broadcast the class instance so other modules/components can access it as a shared singleton
    new ObserverLite({ key: 'SomeProducerClass$' }).next(this)

    this.getSomeData()
  }

  getSomeData(){
    fetch('/api/data')
    .then( ({data}) => {
      // broadcast 
      this.observer.next(data)
    })
  }
}


class SomeUiComponent extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    // get the 
    this.SomeDataObserver = new ObserverLite({key:'SomeData$'})
    this.onInit()
  }

  async onInit(){
    // wait for the producers data initial fetch
    const initData = await this.SomeDataObserver.once()
    this.onUpdate(initData)
    // subscribe for other updates
    this.SomeDataObserver$ = this.SomeDataObserver.subscribe((data) => {
      this.onUpdate(data)
    })
  }

  onUpdate(data){
    // some stuff with the data
    console.log(data)
  }

  disconnectedCallback(){
    // clean up by removing observer
    this.SomeDataObserver.unsubscribe(this.SomeDataObserver$)
  }

}

class AnotherUiComponent extends HTMLElement {

  constructor() {
    super();
    // lets give this componant its own observer instance
    this.ObserverLite = new ObserverLite()
  }

  subscribe(callback) {
    return this.ObserverLite.subscribe(callback)
  }

  next(data) {
    this.ObserverLite.next(data)
  }

  connectedCallback() {
    this.onInit()
  }

  async onInit(){
    // get the producter as a singleton 
    this.SomeProducerClass =  await new ObserverLite({key:'SomeProducerClass$'}).once()

    this.addEventListener('submit',(e) => {
      // trigger a function in the class, which in turn broadcasts 
      this.SomeProducerClass.getSomeData()
    })

    this.addEventListener('change',(event) => {
      // update anything subscribed to this componant
      this.next(event)
    })

  }

  disconnectedCallback(){
    // clean up by removing observers
    this.ObserverLite.unsubscribeAll()
  }

}

// subscribe to the componants observer
const AnotherUiComponentChange$ = document.querySelector('another-ui-componant')?.subscribe((data) => {
  console.log('DATA CHANGE',data)
})



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

| Method                              | Description                                          |
|-------------------------------------|------------------------------------------------------|
| `new ObserverLite({ key? })`        | Create or reuse a global instance by optional `key` |
| `.subscribe(callback)`              | Subscribe to events, returns a `subscription`       |
| `.unsubscribe(subscription)`        | Unsubscribe a specific subscription                 |
| `.unsubscribeAll()`                 | Remove all subscriptions                            |
| `.next(...args)`                    | Trigger event with data                             |
| `.once()`                           | Wait for first event — Promise/await support        |
| `.setOnce(data)`                    | Manually set data for `.once()`                     |


## 🧑‍🎤 Author

**WEBOWSKI**  
GitHub: [@webowski-shopify](https://github.com/webowski-shopify)

---

## 📄 License

MIT — free to use, modify, and distribute.

---

## ⭐️ Star the Repo!

If you find this useful, drop a ⭐️ on [GitHub](https://github.com/webowski-shopify/observer-lite)!
