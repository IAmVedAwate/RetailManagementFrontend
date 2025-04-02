import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setCategories } from '../../store/CategorySlice';
import { handleGetSubmit, handleInputChange, handlePutSubmit } from '../../services/Services';

function CategoryEdit() {
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
  }, [categories, dispatch]);

  const handleEdit = async (e) => {
    e.preventDefault();
    await handlePutSubmit(`api/Admin/Category/${categoryid}`, categoryData, "multipart/form-data", "Category");
    navigate('/category/index');
  };

  return (
    <>
      <div className="container">
        <div className="card-header rounded-top-4 bg-gradient ml-0 p-3" style={{ backgroundColor: '#a3ffcb' }}>
          <h1>Edit Category</h1>
        </div>
        <div className="card-body bg-secondary p-4">
          <form onSubmit={handleEdit}>
            <div className="border p-3 mt-4" style={{ backgroundColor: 'white', borderRadius: '20px 20px 20px 20px' }}>
              <div className="mb-3">
                <label className="mb-2">Category Name: </label>
                <input
                  className="form-control"
                  name='categoryName'
                  defaultValue={categoryData.categoryName}
                  onChange={(e) => handleInputChange(e, setCategoryData)}
                />
              </div>
              <div className="mb-3">
                <label className="mb-2">Description: </label>
                <input
                  className="form-control"
                  name='categoryDescription'
                  defaultValue={categoryData.categoryDescription}
                  onChange={(e) => handleInputChange(e, setCategoryData)}
                />
              </div>
              <div className="row">
                <div className="col-6">
                  <button type="submit" className="btn btn-success form-control" style={{ width: '150px' }}>
                    Edit
                  </button>
                </div>
                <div className="col-6">
                  <Link to="/category/index" className="btn btn-secondary">
                    Back to the List
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CategoryEdit;
