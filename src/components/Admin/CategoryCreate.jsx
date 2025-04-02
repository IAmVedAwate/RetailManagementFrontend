import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {handleInputChange, handlePostSubmit} from '../../services/Services';

function CategoryCreate() {
  const [categoryData, setCategoryData] = useState({
    categoryName: '',
    categoryDescription: '',
  })
  const handleSubmit = async ()=>{
    await handlePostSubmit("api/Admin/Category",categoryData, "multipart/form-data", "Category" );
  }
  
  return (


    <div className="container">
      <div class="card-header rounded-top-4 bg-gradient ml-0 p-3" style={{ backgroundColor: "#a3ffcb" }}>
        <h1>New Category</h1>
      </div>
      <div class="card-body bg-secondary p-4">
        <form onSubmit={handleSubmit}>
          <div className="border p-3 mt-4" style={{ backgroundColor: "white", borderRadius: "20px 20px 20px 20px" }}>
            <div className="text-danger"></div>
            <div className="mb-3">
              <label className="mb-2">Category Name: </label>
              <input className="form-control"
                name='categoryName'
                onChange={(e)=>handleInputChange(e, setCategoryData)} />
              <span className="text-danger"></span>
            </div>
            <div className="mb-3">
              <label className="mb-2">Description: </label>
              <input className="form-control"
                name='categoryDescription'
                onChange={(e)=>handleInputChange(e, setCategoryData)} />
              <span className="text-danger"></span>
            </div>
            <div className="row">
              <div className="col-6">
                <button type="submit" className="btn btn-success form-control" style={{ width: "150px" }}>Create</button>
              </div>
              <div className="col-6">
                <Link to={"/category/index"} className="btn btn-secondary"  >Back to the List </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

  )
}

export default CategoryCreate;


