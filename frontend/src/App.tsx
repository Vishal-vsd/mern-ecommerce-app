import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";

import { Toaster }
from "react-hot-toast";

import { useState }
from "react";

import ProductList
from "./components/ProductList";

import CartPage
from "./components/CartPage";

import ProductDetail
from "./components/ProductDetail";

import LoginPage
from "./components/LoginPage";

import RegisterPage
from "./components/RegisterPage";

import CheckoutPage
from "./components/CheckoutPage";

import OrderSuccessPage
from "./components/SuccessPage";

import MyOrdersPage
from "./components/MyOrdersPage";

import PayementPage
from "./components/PaymentPage";

import AdminDashboard
from "./pages/admin/AdminDashboard";

import PublicLayout
from "./layouts/PublicLayout";

import AdminLayout
from "./layouts/AdminLayout";

import AdminProducts 
from "./pages/admin/AdminProducts";



function App() {

const [
searchTerm,

setSearchTerm

]

=
useState("");


const [
category,

setCategory

]

=
useState("all");


const [
sortOption,

setSortOption

]

=
useState("default");



return (

<BrowserRouter>

<Toaster
position="top-center"/>


<Routes>


{/* ---------- PUBLIC ---------- */}

<Route

element={

<PublicLayout

searchTerm={
searchTerm
}

setSearchTerm={
setSearchTerm
}

category={
category
}

setCategory={
setCategory
}

sortOption={
sortOption
}

setSortOption={
setSortOption
}

/>

}

>

<Route

path="/"

element={

<ProductList

searchTerm={
searchTerm
}

category={
category
}

sortOption={
sortOption
}

/>

}

/>


<Route
path="/cart"
element={<CartPage/>}
/>


<Route
path="/checkout"
element={<CheckoutPage/>}
/>


<Route
path="/success"
element={<OrderSuccessPage/>}
/>


<Route
path="/my-orders"
element={<MyOrdersPage/>}
/>


<Route
path="/payment"
element={<PayementPage/>}
/>


<Route
path="/login"
element={<LoginPage/>}
/>


<Route
path="/register"
element={<RegisterPage/>}
/>


<Route
path="/product/:id"
element={<ProductDetail/>}
/>

</Route>



{/* ---------- ADMIN ---------- */}

<Route

path="/admin"

element={
<AdminLayout/>
}

>

<Route

path="dashboard"

element={
<AdminDashboard/>
}

/>

<Route

path="products"

element={
<AdminProducts/>
}

/>

</Route>



</Routes>

</BrowserRouter>

)

}

export default App;