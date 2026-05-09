import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CartProvider from './context/CartContext.tsx'
import './index.css'
import App from './App.tsx'
import AuthProvider from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <AuthProvider>
        <App />
      </AuthProvider>  
    </CartProvider>
  </StrictMode>

)
