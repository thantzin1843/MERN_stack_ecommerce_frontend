import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CarItemProvider } from '../context/cartItemContext.jsx'
import { SearchContextProvider } from '../context/searchContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CarItemProvider>
      <SearchContextProvider>
          <App />
      </SearchContextProvider>
    </CarItemProvider>
  </StrictMode>,
)
