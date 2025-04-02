import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from '../../store/CategorySlice';
import { handleGetSubmit } from '../../services/Services';

function CategoryIndex() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    const fetchCategories = async (e) => {
      try {
        const response = await handleGetSubmit("api/admin/Category", "Category")
        if (response.data.isSuccess) dispatch(setCategories(response.data.result));
      } catch (error) {
        console.error("An error occurred while fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, [dispatch]);
  return (
    <div className="container">
      <div className="card-header rounded-top-4 bg-gradient ml-0 p-3" style={{ backgroundColor: "#a3dcff" }}>
        <div className="row">
          <div className="col-6">
            <h1>Category List</h1>
          </div>
          <div className="col-6 text-end">

            <Link to={"/category/create"} className="btn btn-success">Add New Category</Link>
          </div>
        </div>
      </div>
      <div className="card-body bg-white p-4">

        <div className="row">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th className='w-25'>
                  Category Name
                </th>
                <th>
                  Description
                </th>
                <th>

                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={`catId${category.id}`}>
                  <td>
                    {category.categoryName}
                  </td>
                  <td>
                    {category.categoryDescription}
                  </td>
                  <td style={{ width: "160px" }} className="text-center">
                    <Link to={`/category/edit/${category.id}`} className="btn btn-danger px-3 mx-2"><i className="bi bi-plus-circle-fill"></i></Link>
                    <Link to={`/category/delete/${category.id}`} className="btn btn-primary px-3 mx-2"><i className="bi bi-trash-fill"></i></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}

export default CategoryIndex
