import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { ChartDataProvider } from './state/weatherDataContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChartDataProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ChartDataProvider>
  </React.StrictMode>,
)
