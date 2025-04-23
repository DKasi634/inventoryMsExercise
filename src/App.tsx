// src/App.tsx
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainNavigation from "@/routes/main-navigation.route";
import SignUpPage from "@/pages/auth/signup.page";
import SignInPage from "@/pages/auth/signin.page";
import ProductsPage from "@/pages/products-page";
import ProductDetail from "@/pages/auth/single-product.page";
import ProductEdit from "@/pages/product-edit.page";
import OrdersPage from "@/pages/orders-page";
import OrderEdit from "@/pages/order-edit.page";
import OrderCreate from "@/pages/order-create.page";
import OrderDetail from "@/pages/order-detail.page";
import ProductCreate from "@//pages/product-create-page";
import Dashboard from "@/pages/dashboard.page";
import LeftNavigation from "@/routes/left-navigateion.route"; // Import the new LeftNavigation

function App() {
  return (
    <div className="flex h-screen">
      {/* Left Navigation */}
      <LeftNavigation />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<MainNavigation />}>
            <Route index element={<ProductsPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products/:uid" element={<ProductDetail />} />
            <Route path="products/:uid/edit" element={<ProductEdit />} />
            <Route path="products/create" element={<ProductCreate />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="orders/:id" element={<OrderDetail />} />
            <Route path="orders/new" element={<OrderCreate />} />
            <Route path="orders/:id/edit" element={<OrderEdit />} />
            <Route path="register" element={<SignUpPage />} />
            <Route path="login" element={<SignInPage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;