import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';
import Orders from './admin/Orders';
import Profile from './user/Profile';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import NotFound from './core/NotFound';
import PostItemPage from './core/PostItemPage';
import Interested from './user/Interested';
import ManageUsers from './admin/ManageUsers';
import Stats from './admin/Stats';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Home} exact />
        
        <Route path="/user/Interested" component={Interested} exact />
        <Route path='/shop' component={Shop} exact />
        <Route path='/signin' component={Signin} exact />
        <Route path='/signup' component={Signup} exact />
        <PrivateRoute path='/user/dashboard' component={Dashboard} exact />
        <AdminRoute path='/admin/dashboard' component={AdminDashboard} exact />
        <AdminRoute path='/create/category' component={AddCategory} exact />
        <AdminRoute path='/admin/users' component={ManageUsers} exact />
        <Route path='/create/product' component={AddProduct} exact />
        <Route path='/product/:productId' component={Product} exact />
        <Route path='/cart' component={Cart} exact />
        <AdminRoute path='/admin/orders' component={Orders} exact />
        <PrivateRoute path='/profile/:userId' component={Profile} exact />
        <Route path='/admin/products' component={ManageProducts} exact />
        <Route
          path='/admin/product/update/:productId'
          component={UpdateProduct}
          exact
        />
        <Route path="/admin/stats" component={Stats} exact />
        
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
