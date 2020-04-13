const localIPRegexp = /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
const hostName = window.location.hostname

const isLocalhost = Boolean(
  hostName === 'localhost' ||
  hostName === '[::1]' ||
  hostName.match(localIPRegexp)
)

const envPublicURL = process.env.PUBLIC_URL
const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href)

export function register (config) {
  const isProd = process.env.NODE_ENV === 'production'
  const hasServiceWorker = 'serviceWorker' in navigator
  if (isProd && hasServiceWorker) {
    if (publicUrl.origin !== window.location.origin) {
      return
    }
    window.addEventListener('load', () => {
      const swUrl = `${envPublicURL}/service-worker.js`
      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config)
        navigator.serviceWorker.ready.then(() => {
          console.log('App served cache-first by service worker')
        })
      } else {
        registerValidSW(swUrl, config)
      }
    })
  }
}

function registerValidSW (swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing
        if (installingWorker == null) {
          return
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log(
                'New content available to be used' +
                  'when all tabs for this page are closed.'
              )
              if (config && config.onUpdate) {
                config.onUpdate(registration)
              }
            } else {
              console.log('Content is cached for offline use.')
              if (config && config.onSuccess) {
                config.onSuccess(registration)
              }
            }
          }
        }
      }
    })
    .catch(error => {
      console.error('Error during service worker registration:', error)
    })
}

function checkValidServiceWorker (swUrl, config) {
  window
    .fetch(swUrl, { headers: { 'Service-Worker': 'script' } })
    .then(response => {
      const notFound = response.status === 404
      const contentType = response.headers.get('content-type')
      const contentNotNull = contentType != null
      const noJavaScript = contentType.indexOf('javascript') === -1
      if (notFound || (contentNotNull && noJavaScript)) {
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload()
          })
        })
      } else {
        registerValidSW(swUrl, config)
      }
    })
    .catch(() => {
      console.log('No internet connection. App running in offline mode.')
    })
}

export function unregister () {
  const hasServiceWorker = 'serviceWorker' in navigator
  if (hasServiceWorker) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister()
      })
      .catch(error => {
        console.error(error.message)
      })
  }
}
