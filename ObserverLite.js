const REGISTRY_KEY = Symbol.for('ObserverLiteRegistry')

export class ObserverLite {

  constructor(settings = {}) {
    this.id = Math.floor(Math.random() * 999999999999)
    this.settings = settings
  
    const globalRegistry = globalThis[REGISTRY_KEY] ||= {}
  
    if (settings.key) {
      if (globalRegistry[settings.key]) {
        return globalRegistry[settings.key]
      } else {
        globalRegistry[settings.key] = this
      }
    }
  }

  once() {
    return new Promise(resolve => {
      if (this.onceDone) {
        resolve(this.onceDone)
      }
      const subscription = this.subscribe(data => {
        data = data || true
        this.onceDone = data
        resolve(data)
        this.unsubscribe(subscription)
      })
    })
  }

  setOnce(data) {
    data = data || true
    this.onceDone = data
  }

  next(...args) {
    if (!this.onceDone) {
      this.setOnce(...args)
    }
    if (this.subject?.length) {
      const subs = [...this.subject]
      subs.forEach(({ callback }) => {
        callback(...args)
      })
    }
  }

  subscribe(callbackFn) {
    this.subject = this.subject || []
    const subscription = {
      callback: callbackFn,
      id: Math.floor(100000000000000 + Math.random() * 900000000000000)
    }
    this.subject.push(subscription)
    return subscription
  }

  unsubscribe(subscription) {
    if (!subscription || typeof subscription.id !== 'number') {
      console.warn('Invalid subscription passed to unsubscribe()')
      return
    }
    const exists = this.subject?.some(({ id }) => id === subscription.id)
    if (!exists) {
      console.warn('Subscription not found. Cannot unsubscribe.')
      return
    }
    this.subject = this.subject.filter(({ id }) => id !== subscription.id)
  }

  unsubscribeAll(resetOnce) {
    this.subject?.forEach(sub => this.unsubscribe(sub))
    if (resetOnce) {
      this.onceDone = false
    }
  }

}
