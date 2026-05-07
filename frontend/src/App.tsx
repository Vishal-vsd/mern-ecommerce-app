import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProductList from "./components/ProductList";
import NavBar from "./components/NavBar";
import CartPage from "./components/CartPage";
import ProductDetail from "./components/ProductDetail";
import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [category, setCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  return (
    <BrowserRouter>
        <NavBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          category={category}
          setCategory={setCategory}
          sortOption={sortOption}
          setSortOption={setSortOption}
          />
        <Toaster position="top-right" />
        <Routes>
         <Route path="/" element={<ProductList searchTerm={searchTerm} category={category} sortOption={sortOption}/>}></Route>
         <Route path="/cart" element={<CartPage/>}></Route>
         <Route path="/product/:id" element={<ProductDetail />}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;