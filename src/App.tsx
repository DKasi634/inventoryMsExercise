
import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainNavigation from './routes/main-navigation.route'
import SignUpPage from './pages/auth/signup.page'
import SignInPage from './pages/auth/signin.page'
import ProductsPage from './pages/products-page'
import ProductDetail from './pages/auth/single-product.page'
import ProductEdit from './pages/product-edit.page'
import OrdersPage from './pages/orders-page'
import OrderEdit from './pages/order-edit.page'
import OrderCreate from './pages/order-create.page'
import OrderDetail from './pages/order-detail.page'

function App() {

  return (
    <Routes>
      <Route path='/' element={<MainNavigation />}>
        <Route index element={<ProductsPage />} />
        <Route path='products' element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products/:id/edit" element={<ProductEdit />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/orders/new" element={<OrderCreate />} />
        <Route path="/orders/:id/edit" element={<OrderEdit />} />
        <Route path='register' element={<SignUpPage />} />
        <Route path='login' element={<SignInPage />} />
      </Route>
    </Routes>
  )
}

export default App
