import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import MuiThemeRoot from './shared/Theme'
import AuthProvider from './shared/providers/AuthProvider'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
      <AuthProvider>
          <MuiThemeRoot>
              <App />
          </MuiThemeRoot>
      </AuthProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
