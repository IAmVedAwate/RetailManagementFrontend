import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setSubCategories } from '../../store/SubCategorySlice';
import { setCategories } from '../../store/CategorySlice';
import { handleGetSubmit, handleInputChange, handlePutSubmit } from '../../services/Services';

function SubCategoryEdit() {
  const { subcategoryid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subCategories = useSelector((state) => state.subCategories.subCategories);
  const categories = useSelector((state) => state.categories.categories);

  const [subCategoryData, setSubCategoryData] = useState(
    {
      subCategoryName: "",
      categoryId: 0,
    }
  )

  useEffect(() => {
    // Fetch subcategories if not present in Redux
    const fetchSubCategories = async (e) => {
      if (subCategories.length <= 0) {
        try {
          const response = await handleGetSubmit("api/Admin/SubCategory", "SubCategory");
          if (response.data.isSuccess) {
            dispatch(setSubCategories(response.data.result));
          }
        } catch (error) {
          console.error('Error fetching subcategories:', error);
          alert('Failed to fetch subcategories.');
        }
      }
    };

    // Fetch categories if not present in Redux
    const fetchCategories = async (e) => {
      if (categories.length <= 0) {
        try {
          const response = await handleGetSubmit("api/Admin/Category", "Category");
          if (response.data.isSuccess) {
            dispatch(setCategories(response.data.result));
          }
        } catch (error) {
          console.error('Error fetching categories:', error);
          alert('Failed to fetch categories.');
        }
      }
    };

    fetchSubCategories();
    fetchCategories();
  }, [dispatch, subCategories.length, categories.length]);

  useEffect(() => {
    // Set form values if subcategory exists
    const selectedSubCategory = subCategories.find(
      (subCat) => subCat.id == parseInt(subcategoryid)
    );
    if (selectedSubCategory) {
      setSubCategoryData(() => ({
        subCategoryName: selectedSubCategory.subCategoryName,
        categoryId: selectedSubCategory.categoryId,
      }));
    }
    console.error(selectedSubCategory);
  }, [subCategories, subcategoryid]);

  const handleEdit = async (e) => {
    e.preventDefault();
    await handlePutSubmit(`api/Admin/SubCategory/${subcategoryid}`, subCategoryData, 'multipart/form-data', "SubCategory");
    navigate("/subcategory/index")

  };

  return (
    <>
      <div className="container">
        <div
          className="card-header rounded-top-4 bg-gradient ml-0 p-3"
          style={{ backgroundColor: '#a3ffcb' }}
        >
          <h1>Edit SubCategory</h1>
        </div>
        <div className="card-body bg-secondary p-4">
          <form onSubmit={handleEdit}>
            <div
              className="border p-3 mt-4"
              style={{ backgroundColor: 'white', borderRadius: '20px' }}
            >
              <div className="mb-3">
                <label className="mb-2">SubCategory Name: </label>
                <input
                  className="form-control"
                  name='subCategoryName'
                  defaultValue={subCategoryData.subCategoryName}
                  onChange={(e) => handleInputChange(e, setSubCategoryData)}
                />
              </div>
              <div className="mb-3">
                <label className="mb-2">Category: </label>
                <select
                  className="form-select"
                  name='categoryId'
                  value={subCategoryData.categoryId}
                  onChange={(e) => handleInputChange(e, setSubCategoryData)}
                >
                  {categories.map((category) => (
                    <option key={`catId${category.id}`} {...subCategoryData.categoryId == category.id ? "seleted" : ""} value={category.id}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="row">
                <div className="col-6">
                  <button
                    type="submit"
                    className="btn btn-success form-control"
                    style={{ width: '150px' }}
                  >
                    Edit
                  </button>
                </div>
                <div className="col-6">
                  <Link to="/subcategory/index" className="btn btn-secondary">
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

export default SubCategoryEdit;
