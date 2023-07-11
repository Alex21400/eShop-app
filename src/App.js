import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import './App.css';
import RootLayout from './pages/layouts/RootLayout';
import { useSelector } from 'react-redux';

// pages
import Home from './pages/home/Home';
import Contact from './pages/contact/Contact';
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';
import Reset from './pages/authentication/Reset';
import Admin from './pages/admin/Admin';
import ProductDetails from './components/product/productDetails/ProductDetails';
import Cart from './pages/cart/Cart'
import CheckoutDetails from './pages/checkout/CheckoutDetails';
import Checkout from './pages/checkout/Checkout';
import CheckoutSuccess from './pages/checkout/CheckoutSuccess';
import OrderDetails from './pages/orderDetails/OrderDetails';
import ReviewProduct from './components/reviewProducts/ReviewProduct';
import OrderHistory from './pages/orderHistory/OrderHistory'
import NotFound from './pages/notFound/NotFound';


//admin components
import AdminHome from './components/admin/home/AdminHome'
import ViewProducts from './components/admin/viewProducts/ViewProducts'
import AddProduct from './components/admin/addProduct/AddProduct'
import Orders from './components/admin/orders/Orders'
import AdminOrderDetails from './components/admin/orderDetails/AdminOrderDetails';
import NotAdmin from './components/admin/orderDetails/AdminOrderDetails'


function App() {
  const { email } = useSelector(state => state.auth)
  const adminEmail = email === 'krimiusma0@gmail.com' || 'saki.94@hotmail.com' ? true : false

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='contact' element={<Contact />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='reset-password' element={<Reset />} />
      <Route path='product-details/:id' element={<ProductDetails />} />
      <Route path='cart' element={<Cart />} />
      <Route path='checkout-details' element={<CheckoutDetails />} />
      <Route path='checkout' element={<Checkout />} />
      <Route path='checkout-success' element={<CheckoutSuccess />} />
      <Route path='order-history' element={<OrderHistory />} />
      <Route path='order-details/:id' element={<OrderDetails />} />
      <Route path='review-product/:id' element={<ReviewProduct />} />
      <Route path='*' element={<NotFound />} />
      {/* // Admin routes */}
      <Route path='admin' element={adminEmail ? (<Admin />) : (<NotAdmin />)}>
        <Route path='home' element={<AdminHome />}/>
        <Route path='view-products' element={<ViewProducts />}/>
        <Route path='add-product/:id' element={<AddProduct />} />
        <Route path='orders' element={<Orders />} />
        <Route path='order-details/:id' element={<AdminOrderDetails />} />
      </Route>
    </Route>
  ))

  return (
    <div >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

// Logo - #e8743f orange
// Bg - #251D3A
