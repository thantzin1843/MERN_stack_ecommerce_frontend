import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserLayout from "./components/layout/UserLayout"
import Home from "./pages/Home"
import { Toaster } from "sonner"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import Collection from "./pages/Collection"
import Checkout from "./components/cart/Checkout"
import OrderConfirmationPage from "./components/cart/OrderConfirmationPage"
import OrderDetail from "./components/cart/OrderDetail"
import MyOrders from "./components/cart/MyOrders"
import { Provider } from "react-redux"
import store from "./redux/store"
import AdminLayout from "./admin/pages/AdminLayout"
import Dashboard from "./admin/pages/Dashboard"
import ProductListPage from "./admin/pages/ProductListPage"
import CreateProduct from "./admin/pages/product/CreateProduct"
import DetailProductPage from "./pages/DetailProductPage"
import EditProduct from "./admin/pages/product/EditProduct"
import OrderListPage from "./admin/pages/order/OrderListPage"
import AdminOrderDetail from "./admin/pages/order/OrderDetail"
import AdminProfile from "./admin/pages/profile/AdminProfile"
import UserProfile from "./pages/UserProfile"
import MyOrderPage from "./components/products/MyOrderPage"
import UserListPage from "./admin/pages/UserListPage"

function App() {
  return (
  <Provider store={store}>
    <BrowserRouter future={{v7_startTransition:true, v7_relativeSplatPath: true, }}>
    <Toaster position="top-right"/>
    <Routes>
      {/* user layout */}
      <Route path="/" element={<UserLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="login" element = {<Login/>} />
        <Route path="register" element = {<Register/>} />
        <Route path="profile" element = {<Profile/>} >
          <Route path="change_password" element = {<UserProfile/>} />
          <Route path="my-orders" element = {<MyOrderPage/>} />
        </Route>
        <Route path="products/list" element = {<Collection/>} />
        <Route path="products/:id" element = {<DetailProductPage/>} />
        <Route path="checkout" element = {<Checkout/>} />
        <Route path="order-confirmation-page/:id" element = {<OrderConfirmationPage/>} />
        <Route path="order/:id" element = {<OrderDetail/>} />
      </Route>

      {/* admin layout */}
      <Route path="admin" element={<AdminLayout/>}>
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="product/list" element={<ProductListPage/>}/>
        <Route path="product/createForm" element={<CreateProduct/>}/>
        <Route path="products/editPage/:id" element={<EditProduct/>}/>
        <Route path="user/list" element={<UserListPage/>}/>
        <Route path="order/list" element={<OrderListPage/>}/>
        <Route path="order/:id" element = {<AdminOrderDetail/>} />
        <Route path="profile" element={<AdminProfile/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
