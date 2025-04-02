import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { setSubCategories } from '../../store/SubCategorySlice';
import { handleDeleteSubmit, handleGetSubmit } from '../../services/Services';
import { setCategories } from '../../store/CategorySlice';

function SubCategoryDelete() {
  const { subcategoryid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subCategories = useSelector((state) => state.subCategories.subCategories);
  const categories = useSelector((state) => state.categories.categories);

  const [subCategoryData, setSubCategoryData] = useState(
    {
      subCategoryName: "",
      categoryId: 0,
      categoryName: ""
    }
  )
    // Fetch Subcategories
    useEffect(() => {
      const fetchSubCategories = async (e) => {
        if (subCategories.length > 0) {
          // Use existing Redux store data
          const selectedSubCategory = subCategories.find(
            (subCat) => subCat.id === parseInt(subcategoryid)
          );
          if (selectedSubCategory) {
            setSubCategoryData((prevData) => ({
              ...prevData,
              subCategoryName: selectedSubCategory.subCategoryName,
              categoryId: selectedSubCategory.categoryId,
            }));
          }
        } else {
          // Fetch subcategories from the server
          try {
            const response = await handleGetSubmit("api/Admin/SubCategory", "SubCategory");
            if (response.data.isSuccess) {
              dispatch(setSubCategories(response.data.result));
  
              const selectedSubCategory = response.data.result.find(
                (subCat) => subCat.id === parseInt(subcategoryid)
              );
              if (selectedSubCategory) {
                setSubCategoryData((prevData) => ({
                  ...prevData,
                  subCategoryName: selectedSubCategory.subCategoryName,
                  categoryId: selectedSubCategory.categoryId,
                }));
              }
            }
          } catch (error) {
            console.error("Error fetching subcategories:", error);
            alert("Failed to fetch subcategories.");
          }
        }
      };
  
      fetchSubCategories();
    }, [dispatch, subCategories, subcategoryid]);
  
    // Fetch Categories
    useEffect(() => {
      const fetchCategories = async (e) => {
        if (categories.length === 0) {
          try {
            const response = await handleGetSubmit("api/Admin/Category", "Category");
            if (response.data.isSuccess) {
              dispatch(setCategories(response.data.result));
            }
          } catch (error) {
            console.error("Error fetching categories:", error);
            alert("Failed to fetch categories.");
          }
        }
      };
  
      fetchCategories();
    }, [dispatch, categories]);
  
    // Update Category Name
    useEffect(() => {
      if (categories.length > 0 && subCategoryData.categoryId) {
        const category = categories.find((cat) => cat.id === subCategoryData.categoryId);
        if (category) {
          setSubCategoryData((prevData) => ({
            ...prevData,
            categoryName: category.categoryName,
          }));
        }
      }
    }, [categories, subCategoryData.categoryId]);
  

  const handleDelete = async () => {
    await handleDeleteSubmit(`api/Admin/SubCategory/${subcategoryid}`,"SubCategory");
    navigate("/subcategory/index");
  };

  return (
    <>
      <div className="container">
        <div
          className="card-header rounded-top-4 bg-gradient ml-0 p-3"
          style={{ backgroundColor: '#ffa3a3' }}
        >
          <h1>Delete SubCategory</h1>
        </div>
        <div className="card-body bg-secondary p-4">
          <form onSubmit={handleDelete}>
            <div
              className="border p-3 mt-4"
              style={{ backgroundColor: 'white', borderRadius: '20px 20px 20px 20px' }}
            >
              <div className="mb-3">
                <label className="mb-2">SubCategory Name: </label>
                <input disabled defaultValue={subCategoryData.subCategoryName} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="mb-2">Category: </label>
                <input disabled defaultValue={subCategoryData.categoryName} className="form-control" />
              </div>
              <div className="row">
                <div className="col-6">
                  <button
                    type="submit"
                    className="btn btn-danger form-control"
                    style={{ width: '150px' }}
                  >
                    Delete
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

export default SubCategoryDelete;
