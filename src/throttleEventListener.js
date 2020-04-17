export function throttleEventListener(event, property, callback) {
  let last_value = 0
  let ticking = false

  window.addEventListener(event, () => {
    if (property) {
      last_value = window[property]
    }

    if (!ticking) {
      window.requestAnimationFrame(() => {
        callback(last_value);
        ticking = false
      })

      ticking = true
    }
  }, false);
}
