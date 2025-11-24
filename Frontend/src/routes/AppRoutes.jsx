import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../pages/landing/Home.jsx'
import Login from '../pages/auth/Login.jsx'
import Register from '../pages/auth/Register.jsx'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import Overview from '../pages/dashboard/Overview.jsx'
import Orders from '../pages/dashboard/Orders/Orders.jsx'
import Products from '../pages/dashboard/Products/Products.jsx'
import Customers from '../pages/dashboard/Customers.jsx'
import NotFound from '../pages/errors/NotFound.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import EditProfile from '../pages/profile/EditProfile.jsx'
import ChangePassword from '../pages/auth/ChangePassword.jsx'
import DeleteAccount from '../pages/auth/DeleteAccount.jsx'
import About from '../pages/landing/about/About.jsx'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />}></Route>

      {/*Protect all dashboard routes */}
      <Route element={<ProtectedRoute />}>
        <Route path='/editprofile' element={<EditProfile />}></Route>
        <Route path='/changepassword' element={<ChangePassword />}></Route>
        <Route path='/deleteaccount' element={<DeleteAccount />}></Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="customers" element={<Customers />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
