import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import { useState } from "react";

import ProductList from "./components/ProductList";

import CartPage from "./components/CartPage";

import ProductDetail from "./components/ProductDetail";

import LoginPage from "./components/LoginPage";

import RegisterPage from "./components/RegisterPage";

import CheckoutPage from "./components/CheckoutPage";

import OrderSuccessPage from "./components/SuccessPage";

import MyOrdersPage from "./components/MyOrdersPage";

import PayementPage from "./components/PaymentPage";

import AdminDashboard from "./pages/admin/AdminDashboard";

import PublicLayout from "./layouts/PublicLayout";

import AdminLayout from "./layouts/AdminLayout";

import AdminProducts from "./pages/admin/AdminProducts";

import AddProductPage from "./pages/admin/AddProductPage";

import AdminRoutes from "./routes/AdminRoutes";
import EditProductPage from "./pages/admin/EditProductPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminOrderDetailPage from "./pages/admin/AdminOrderDetailPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import GuestRoutes from "./routes/GuestRoutes";
import UserRoutes from "./routes/UserRoutes";
import NonAdminRoutes from "./routes/NonAdminRoutes";
import AdminUserDetailPage from "./pages/admin/AdminUserDetailPage";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const [category, setCategory] = useState("all");

  const [sortOption, setSortOption] = useState("default");

  return (
    <BrowserRouter>
      <Toaster position="top-center" />

      <Routes>
        {/* ---------- PUBLIC ---------- */}

        <Route
          element={
            <PublicLayout
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              category={category}
              setCategory={setCategory}
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
          }
        >
          <Route
            path="/"
            element={
              <NonAdminRoutes>
                {" "}
                <ProductList
                  searchTerm={searchTerm}
                  category={category}
                  sortOption={sortOption}
                />
              </NonAdminRoutes>
            }
          />

          <Route
            path="/cart"
            element={
              <NonAdminRoutes>
                <CartPage />
              </NonAdminRoutes>
            }
          />

          <Route
            path="/checkout"
            element={
              <UserRoutes>
                <CheckoutPage />
              </UserRoutes>
            }
          />

          <Route
            path="/success"
            element={
              <UserRoutes>
                <OrderSuccessPage />
              </UserRoutes>
            }
          />

          <Route
            path="/my-orders"
            element={
              <UserRoutes>
                <MyOrdersPage />
              </UserRoutes>
            }
          />

          <Route
            path="/payment"
            element={
              <UserRoutes>
                <PayementPage />
              </UserRoutes>
            }
          />

          <Route
            path="/login"
            element={
              <GuestRoutes>
                <LoginPage />
              </GuestRoutes>
            }
          />

          <Route
            path="/register"
            element={
              <GuestRoutes>
                <RegisterPage />
              </GuestRoutes>
            }
          />

          <Route
            path="/product/:id"
            element={
              <NonAdminRoutes>
                <ProductDetail />
              </NonAdminRoutes>
            }
          />
        </Route>

        {/* ---------- ADMIN ---------- */}

        <Route
          path="admin"
          element={
            <AdminRoutes>
              <AdminLayout />
            </AdminRoutes>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />

          <Route path="products" element={<AdminProducts />} />

          <Route path="products/add" element={<AddProductPage />} />

          <Route path="products/edit/:id" element={<EditProductPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />

          <Route path="orders/:id" element={<AdminOrderDetailPage />} />

          <Route path="users" element={<AdminUsersPage />} />
          <Route path="users/:id" element={<AdminUserDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
