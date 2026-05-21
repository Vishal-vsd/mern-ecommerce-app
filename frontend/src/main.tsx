import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CartProvider from './context/CartContext.tsx'
import './index.css'
import App from './App.tsx'
import AuthProvider from './context/AuthContext.tsx'
import ProductProvider from './context/ProductContext.tsx'
import OrderProvider from './context/OrderContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
            <OrderProvider>
              <App/>
            </OrderProvider>
        </ProductProvider>
      </CartProvider>
    </AuthProvider> 
  </StrictMode>

)
