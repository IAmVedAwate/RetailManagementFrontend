import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSubCategories } from '../../store/SubCategorySlice'; 
import { handleGetSubmit } from '../../services/Services';

function SubCategoryIndex() {
  const dispatch = useDispatch();
  const subCategories = useSelector((state) => state.subCategories.subCategories);

  useEffect(() => {
    const fetchSubCategories = async (e) => {
      try {
        const response = await handleGetSubmit("api/admin/SubCategory","SubCategory");
        if (response.data.isSuccess) dispatch(setSubCategories(response.data.result));

      } catch (error) {
        console.error("An error occurred while fetching subcategories:", error.message);
      }
    };

    fetchSubCategories();
  }, [dispatch]);

  return (
    <div className="container">
      <div className="card-header rounded-top-4 bg-gradient ml-0 p-3" style={{ backgroundColor: "#a3dcff" }}>
        <div className="row">
          <div className="col-6">
            <h1>SubCategory List</h1>
          </div>
          <div className="col-6 text-end">
            <Link to="/subcategory/create" className="btn btn-success">Add New SubCategory</Link>
          </div>
        </div>
      </div>
      <div className="card-body bg-white p-4">
        <div className="row">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>SubCategory Name</th>
                <th>Category Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {subCategories.map((subCategory) => (
                <tr key={`subCatId${subCategory.id}`}>
                  <td>{subCategory.subCategoryName}</td>
                  <td>{subCategory.category.categoryName}</td>
                  <td style={{ width: "160px" }} className="text-center">
                    <Link to={`/subcategory/edit/${subCategory.id}`} className="btn btn-danger px-3 mx-2">
                      <i className="bi bi-plus-circle-fill"></i>
                    </Link>
                    <Link to={`/subcategory/delete/${subCategory.id}`} className="btn btn-primary px-3 mx-2">
                      <i className="bi bi-trash-fill"></i>
                    </Link>
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

export default SubCategoryIndex;
