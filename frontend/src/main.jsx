import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/reset.css'
import './styles/globals.scss'
import App from './App'
import AppLoader from './components/AppLoader'

function RootApp() {
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const done = () => setLoading(false)
    if (document.readyState === 'complete') {
      done()
    } else {
      window.addEventListener('load', done, { once: true })
    }
    return () => window.removeEventListener('load', done)
  }, [])

  if (loading) return <AppLoader />

  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
)
