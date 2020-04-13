import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

import './index.scss'

const useStrict = false

if (useStrict) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  )
} else {
  ReactDOM.render(<App />, document.getElementById('root'))
}

serviceWorker.unregister()
