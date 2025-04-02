import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { setCategories } from '../../store/CategorySlice';
import { handleGetSubmit, handleInputChange, handlePostSubmit } from '../../services/Services';

function SubCategoryCreate() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector((state) => state.categories.categories);
    const [subCategoryData, setSubCategoryData] = useState(
      {
        subCategoryName: "",
        categoryId: 0,
      }
    )

    useEffect(() => {
        if (categories.length <= 0) {
          const fetchCategories = async (e) => {
            const categoriesResponse = await handleGetSubmit('api/admin/Category', "Category");
            dispatch(setCategories(categoriesResponse.data.result))
          };
    
          fetchCategories();
        }
      }, [categories,dispatch]);

      const handleSubmit = async () => {
        try {
          await handlePostSubmit("api/admin/SubCategory",subCategoryData,"multipart/form-data","SubCategory");
        } catch (error) {
          console.error('Error during Appending Entities:', error);
        }
      };

    return (


        <div className="container">
            <div class="card-header rounded-top-4 bg-gradient ml-0 p-3" style={{ backgroundColor: "#a3ffcb" }}>
                <h1>New SubCategory</h1>
            </div>

            <div class="card-body bg-secondary p-4">
                <form onSubmit={handleSubmit}>
                    <div className="border p-3 mt-4" style={{ backgroundColor: "white", borderRadius: "20px 20px 20px 20px" }}>
                        <div className="text-danger"></div>
                        <div className="mb-3">
                            <label className="mb-2">SubCategory Name: </label>
                            <input className="form-control" name='subCategoryName'
                            onChange={(e)=> handleInputChange(e,setSubCategoryData)}
                            />
                            <span className="text-danger"></span>
                        </div>
                        <div className="mb-3">
                            <label className="mb-2">Category: </label>
                            <select
                            name='categoryId'
                            className="form-select"
                            onChange={(e)=> handleInputChange(e,setSubCategoryData)}>
                                <option selected>-- select Category --</option>
                                {categories.map((category) => (
                                <option key={`catId${category.id}`} value={category.id}>{category.categoryName}</option>
                                ))}
                            </select>
                            <span className="text-primary"></span>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <button type="submit" className="btn btn-success form-control" style={{ width: "150px" }}>Create</button>
                            </div>
                            <div className="col-6">
                                <Link to={"/subcategory/index"} className="btn btn-secondary">Back to the List </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default SubCategoryCreate;


