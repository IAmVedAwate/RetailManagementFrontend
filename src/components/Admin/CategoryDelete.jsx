import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { setCategories } from '../../store/CategorySlice';
import { handleDeleteSubmit, handleGetSubmit } from '../../services/Services';

function CategoryDelete() {
  const { categoryid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories.categories);
  const [categoryData, setCategoryData] = useState({
    categoryName: '',
    categoryDescription: '',
  })

  useEffect(() => {
    // Check if categories exist in Redux
    if (categories.length > 0) {
      const selectedCategory = categories.find((cat) => cat.id === parseInt(categoryid));
      if (selectedCategory) {
        setCategoryData(() => ({
          categoryName: selectedCategory.categoryName,
          categoryDescription: selectedCategory.categoryDescription,
        }));
      }
    } else {
      // Fetch categories if Redux store is empty
      const fetchCategories = async (e) => {
        const response = await handleGetSubmit("api/Admin/Category", "Category");
        const selectedCategory = response.data.result.find((cat) => cat.id === parseInt(categoryid));
        if (selectedCategory) {
          setCategoryData(() => ({
            categoryName: selectedCategory.categoryName,
            categoryDescription: selectedCategory.categoryDescription,
          }));
        }
        dispatch(setCategories(response.data.result));
      }
      fetchCategories();
    }
  }, [dispatch]);

  const handleDelete = async () => {
    await handleDeleteSubmit(`api/Admin/Category/${categoryid}`, "Category");
    navigate("/category/index");
  };

  return (
    <>
      <div className="container">
        <div className="card-header rounded-top-4 bg-gradient ml-0 p-3" style={{ backgroundColor: "#ffa3a3" }}>
          <h1>Delete Category</h1>
        </div>
        <div className="card-body bg-secondary p-4">
          <form onSubmit={handleDelete}>
            <div className="border p-3 mt-4" style={{ backgroundColor: "white", borderRadius: "20px 20px 20px 20px" }}>
              <div className="mb-3">
                <label className="mb-2">Category Name: </label>
                <input disabled defaultValue={categoryData.categoryName} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="mb-2">Description: </label>
                <input disabled defaultValue={categoryData.categoryDescription} className="form-control" />
              </div>
              <div className="row">
                <div className="col-6">
                  <button type="submit" className="btn btn-danger form-control" style={{ width: "150px" }}>Delete</button>
                </div>
                <div className="col-6">
                  <Link to={"/category/index"} className="btn btn-secondary">Back to the List </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>


    </>
  )
}

export default CategoryDelete




