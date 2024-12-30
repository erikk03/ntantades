import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {NextUIProvider} from '@nextui-org/react'
import App from './App'
import './index.css'
import { AuthProvider } from './config/AuthContext'
import { FormProvider } from './config/FormContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <AuthProvider>
          <FormProvider>
              <App />
          </FormProvider>
        </AuthProvider>
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>,
)