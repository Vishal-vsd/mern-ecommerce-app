import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProductList from "./components/ProductList";
import NavBar from "./components/NavBar";
import CartPage from "./components/CartPage";
import ProductDetail from "./components/ProductDetail";

function App() {
  return (
    <BrowserRouter>
        <NavBar />
        <Toaster position="top-right" />
        <Routes>
         <Route path="/" element={<ProductList/>}></Route>
         <Route path="/cart" element={<CartPage/>}></Route>
         <Route path="/product/:id" element={<ProductDetail />}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;