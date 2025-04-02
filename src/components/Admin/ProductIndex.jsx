import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setProducts } from '../../store/ProductSlice';
import { handleGetSubmit } from '../../services/Services';

function ProductIndex() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const capitalise= (inputStr)=> `${inputStr}`.slice(0,1).toUpperCase()+`${inputStr}`.slice(1).toLowerCase()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await handleGetSubmit("api/admin/Product", "Product");
        if (response.data.isSuccess) dispatch(setProducts(response.data.result));
      } catch (error) {
        console.error("An error occurred while fetching Products:", error.message);
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <div className="card shadow rounded-top-4 my-4">
        <div className="card-header rounded-top-4 bg-gradient ml-0 p-3" style={{ backgroundColor: "#a3dcff" }}>
          <div className="row">
            <div className="col-6">
              <h1>Product List</h1>
            </div>
            <div className="col-6 text-end">

              <Link to={"/product/create"} className="btn btn-success">Add New Product</Link>
            </div>
          </div>
        </div>
        <div className="card-body p-4">
          <div className="row pb-3">
            <div className="col-6">
            </div>
          </div>

          <table id="tblData" className="table table-bordered table-striped" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Retail Price</th>
                <th>MRP</th>
                <th>QuantityInBox</th>
                <th>Is Replaceable</th>
                <th>Is Recommended</th>
                <th>Is Famous</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((pro) => (
                <tr key={`proIndex${pro.id}`}>
                  <td>{pro.productName}</td>
                  <td>{pro.retailPrice}</td>
                  <td>{pro.mrp}</td>
                  <td>{pro.quantityInBox}</td>
                  <td>{capitalise(pro.isReplaceable)}</td>
                  <td>{capitalise(pro.isRecommended)}</td>
                  <td>{capitalise(pro.isFamous)}</td>
                  <td>{pro.subCategoryId}</td>
                  <td style={{ width: "160px" }} className="text-center">
                    <Link to={`/product/edit/${pro.id}`} className="btn btn-danger px-3 mx-2"><i className="bi bi-plus-circle-fill"></i></Link>
                    <Link to={`/product/delete/${pro.id}`} className="btn btn-primary px-3 mx-2"><i className="bi bi-trash-fill"></i></Link>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default ProductIndex;





