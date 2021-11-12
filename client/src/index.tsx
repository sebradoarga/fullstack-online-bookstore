import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from './redux/reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension'

const middleware = [thunk]

const getLocalStorage = () => {
  const persistedStateString = localStorage.getItem('persistedState')
  const persistedState = persistedStateString
    ? JSON.parse(persistedStateString)
    : []

  return persistedState
}

const store = createStore(
  reducers,
  getLocalStorage(),
  composeWithDevTools(applyMiddleware(...middleware))
)

store.subscribe(() => {
  localStorage.setItem('persistedState', JSON.stringify(store.getState()))
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
