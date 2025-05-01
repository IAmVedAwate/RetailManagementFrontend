import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// import ProtectedRoute from './auth/ProtectedRoute';
import CategoryCreate from './components/Admin/CategoryCreate';
import CategoryIndex from './components/Admin/CategoryIndex';
import CategoryEdit from './components/Admin/CategoryEdit';
import CategoryDelete from './components/Admin/CategoryDelete';
import ProductIndex from './components/Admin/ProductIndex';
import ProductDelete from './components/Admin/ProductDelete';
import HomeDetails from './components/Store/HomeDetails';
import HomeIndex from './components/Store/HomeIndex';
import Login from './components/Auth/Login';
import CreateAccount from './components/Auth/CreateAccount';
import PlaceOrderConfirmation from './components/Store/PlaceOrderConfirmation';
import DeliveryOrderList from './components/Delivery/DeliveryOrderList';
import SubCategoryCreate from './components/Admin/SubCategoryCreate';
import SubCategoryIndex from './components/Admin/SubCategoryIndex';
import SubCategoryEdit from './components/Admin/SubCategoryEdit';
import SubCategoryDelete from './components/Admin/SubCategoryDelete';
import AdvertisementIndex from './components/Admin/AdvertisementIndex';
import AdvertisementCreate from './components/Admin/AdvertisementCreate';
import AdvertisementEdit from './components/Admin/AdvertisementEdit';
import AdvertisementDelete from './components/Admin/AdvertisementDelete';
import WarehouseForm from './components/Retailer/WarehouseForm';
import BillForm from './components/Store/BillForm';
import WarehouseIndex from './components/Retailer/WarehouseIndex';
import BillConfirmation from './components/Store/BillConfirmation';
import ProductEdit from './components/Admin/ProductEdit';
import ProductCreate from './components/Admin/ProductCreate';
import DeliveryOrderDetail from './components/Delivery/DeliveryOrderDetail';
import BillListInNav from './components/Store/BillListInNav';
import ReturnCreate from './components/Delivery/ReturnCreate';
import MyDeliveries from './components/Delivery/MyDeliveries';
function RouteManager() {
  
  return (
    <Routes>
      <Route path="/category/create" element={
        <CategoryCreate />
        } />
      <Route path="/category/index" element={
        <CategoryIndex />
        } />
        <Route path="/category/edit/:categoryid" element={
        <CategoryEdit />
        } />
         <Route path="/category/delete/:categoryid" element={
        <CategoryDelete />
        } />
         <Route path="/product/index" element={
        <ProductIndex />
        } />
          <Route path="/product/delete/:productid" element={
        <ProductDelete/>
        } />
          <Route path="/product/create" element={
        <ProductCreate/>
        } />
        <Route path="/product/edit/:productid" element={
        <ProductEdit/>
        } />
        <Route path="/subcategory/create" element={
        <SubCategoryCreate />
        } />
      <Route path="/subcategory/index" element={
        <SubCategoryIndex />
        } />
        <Route path="/subcategory/edit/:subcategoryid" element={
        <SubCategoryEdit />
        } />
         <Route path="/subcategory/delete/:subcategoryid" element={
        <SubCategoryDelete />
        } />
        <Route path="/advertisement/index" element={
        <AdvertisementIndex/>
        } />
        
        <Route path="/advertisement/create" element={
        <AdvertisementCreate/>
        } />
        <Route path="/advertisement/edit/:advertisementid" element={
        <AdvertisementEdit/>
        } />
        <Route path="/advertisement/delete/:advertisementid" element={
        <AdvertisementDelete/>
        } />
          <Route path="/home/details/:prodId" element={
        <HomeDetails/>
        } />
        <Route path="/navUpdate/:checker" element={
        <BillListInNav/>
        } />
        
           <Route path="/home/index" element={
        <HomeIndex/>
        } />
        <Route path="/" element={
        <HomeIndex/>
        } />
        
            <Route path="/login" element={
        <Login/>
        } />
            <Route path="/create/account" element={
        <CreateAccount/>
        } />
           <Route path="/warehouse/index" element={
        <WarehouseIndex/>
        } />
           <Route path="/warehouse/edit" element={
        <WarehouseForm/>
        } />
          <Route path="/bill/create" element={
        <BillForm/>
        } />
         <Route path="/bill/confirm/:billIndex" element={
        <BillConfirmation/>
        } />
           <Route path="/bill/placeorder/:billIndex" element={
        <PlaceOrderConfirmation/>
        } />
           <Route path="/delivery/index" element={
        <DeliveryOrderList/>
        } />
        <Route path="/return/create/:orderid" element={
        <ReturnCreate/>
        } />
        <Route path="/delivery/accepted" element={
        <MyDeliveries/>
        } />
        <Route path="/delivery/details/:deliveryId" element={
        <DeliveryOrderDetail/>
        } />
      {/* <Route path="/login" element={<Login />} />
      
      <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRoles={['Admin']}>
            <AdminDashboard />
        </ProtectedRoute>} /> */}
        
    </Routes>
  );
};


export default RouteManager
