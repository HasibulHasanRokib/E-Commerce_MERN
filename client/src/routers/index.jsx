import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from '../layout/navbar'
import Home from '../pages/home'
import Designers from '../pages/designers'
import Products from '../pages/products'
import Contact from '../pages/contact'
import About from '../pages/about'
import Login from '../pages/auth/login'
import Register from '../pages/auth/register'
import Error from '../pages/error'

import AdminLayout from '../pages/admin/adminLayout'
import Dashboard from '../pages/admin/dashboard'
import PortfolioPage from '../pages/portfolioPage'
import Portfolio from '../pages/admin/portfolio/portfolio'
import AddPortfolio from '../pages/admin/portfolio/addPortfolio'
import AllPortfolio from '../pages/admin/portfolio/allPortfolio'
import UpdatePortfolio from '../pages/admin/portfolio/updatePortfolio'
import AllProducts from '../pages/admin/products/allProducts'
import ServicesPage from '../pages/servicesPage'
import AddProduct from '../pages/admin/products/addProduct'
import ProductView from '../components/productView'
import UpdateProduct from '../pages/admin/products/updateProduct'
import CartPage from '../pages/cartPage'
import AllUsers from '../pages/auth/allUsers'
import AddDesigner from '../pages/admin/desigers/add-designer'
import AllDesigners from '../pages/admin/desigers/all-designers'
import UpdateDesigner from '../pages/admin/desigers/update-designer'
import HomeLayout from '../pages/homeLayout'
import Profile from '../pages/auth/profile'
import AuthLayout from '../pages/auth/authLayout'
import UpdateProfile from '../pages/auth/updateProfle'
import CheckoutPage from '../pages/checkout-page'
import ConfirmOrder from '../pages/confirm-order'
import OrderPage from '../pages/auth/orderPage'
import AllOrders from '../pages/admin/orders/all-orders'
import UpdateOrders from '../pages/admin/orders/update-orders'
import OutOfStocks from '../pages/admin/products/outOfStocks'
import DeliveredOrder from '../pages/admin/orders/delivered-order'
import ConfirmedOrders from '../pages/admin/orders/comfirmed-order'
import AuthService from '../pages/auth/authService'
import AdminServices from '../pages/admin/adminServices'
import Requests from '../pages/admin/requests'
import ScrollToTop from '../components/scrollToTop'
import ForgotPassword from '../pages/auth/forgot-password'
import ResetPassword from '../pages/auth/reset-password'

const Index = () => {
    return (
    <BrowserRouter>
    <ScrollToTop/>
    <Navbar/>
      <Routes>
        <Route element={<HomeLayout/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/portfolio' element={<PortfolioPage/>}/>
        <Route path='/portfolio/:slug' element={<Portfolio/>}/>
        <Route path='/interior-designers' element={<Designers/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/checkout-page' element={<CheckoutPage/>}/>
        <Route path='/services' element={<ServicesPage/>}/> 
        <Route path='/cart' element={<CartPage/>}/> 
        <Route path='/product-view/:slug' element={<ProductView/>}/> 
        <Route path='/confirm-order/:id' element={<ConfirmOrder/>}/> 
        </Route>
         
         <Route element={<AuthLayout/>}> 
         <Route path='/profile/:id' element={<Profile/>}/>
         <Route path='/update-profile/:id' element={<UpdateProfile/>}/>
         <Route path='/orders/user/:id' element={<OrderPage/>}/> 
         <Route path='/service/user/:id' element={<AuthService/>}/> 
         
         </Route>

        <Route path='/auth/login' element={<Login/>}/> 
        <Route path='/auth/register' element={<Register/>}/> 
        <Route path='/auth/forgot-password' element={<ForgotPassword/>}/> 
        <Route path='/auth/reset-password/:token' element={<ResetPassword/>}/> 
        <Route path='*' element={<Error/>}/> 

       
        <Route element={<AdminLayout/>}>
        <Route path='/admin/dashboard' element={<Dashboard/>}/>
        <Route path='/admin/add-portfolio' element={<AddPortfolio/>}/>
        <Route path='/admin/all-portfolio' element={<AllPortfolio/>}/>
        <Route path='/admin/update-portfolio/:id' element={<UpdatePortfolio/>}/>
        <Route path='/admin/all-users' element={<AllUsers/>}/>
        <Route path='/admin/all-products' element={<AllProducts/>}/>
        <Route path='/admin/stock-out-products' element={<OutOfStocks/>}/>
        <Route path='/admin/add-product' element={<AddProduct/>}/>
        <Route path='/admin/update-product/:id' element={<UpdateProduct/>}/>
        <Route path='/admin/add-designer' element={<AddDesigner/>}/>
        <Route path='/admin/all-designers' element={<AllDesigners/>}/>
        <Route path='/admin/update-designer/:id' element={<UpdateDesigner/>}/>
        <Route path='/admin/all-orders' element={<AllOrders/>}/>
        <Route path='/admin/delivered-orders' element={<DeliveredOrder/>}/>
        <Route path='/admin/confirmed-orders' element={<ConfirmedOrders/>}/>
        <Route path='/admin/update-orders/:id' element={<UpdateOrders/>}/>
        <Route path='/admin/services' element={<AdminServices/>}/>
        <Route path='/admin/request' element={<Requests/>}/>
        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default Index
