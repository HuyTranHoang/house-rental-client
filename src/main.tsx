import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './font.css'
import './index.css'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/utils/i18n/i18n.ts'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
      <App />
      </I18nextProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
