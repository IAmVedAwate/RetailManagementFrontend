import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { handleFileChange, handleGetSubmit, handleInputChange, handlePostSubmit } from '../../services/Services';
import { setSubCategories } from '../../store/SubCategorySlice';

function ProductCreate() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state) => state.products.products);
    const subCategories = useSelector((state) => state.subCategories.subCategories);
    const [productData, setProductData] = useState(
        {
            productName: "",
            productDescription: "",
            retailPrice: 0,
            mrp: 0,
            quantityInBox: 0,
            isReplaceable: true,
            isRecommended: false,
            isFamous: false,
            subCategoryId: 0,
            file: null
        }
    )

    useEffect(() => {
        if (subCategories.length <= 0) {
            const fetchsubCategories = async (e) => {
                const subCategoriesResponse = await handleGetSubmit('api/admin/SubCategory', "SubCategory");
                dispatch(setSubCategories(subCategoriesResponse.data.result))
            };
            fetchsubCategories();
        }
    }, [subCategories, dispatch]);

    const handleSubmit = async () => {
        try {
            const payload = new FormData();
            console.error(productData);
            
            for (const key in productData) {
                if (key === 'file' && productData[key]) {
                    payload.append(key, productData[key]);
                } else {
                    payload.append(key, productData[key]);
                }
            }
            await handlePostSubmit("api/admin/Product", payload, "multipart/form-data", "Product");
        } catch (error) {
            console.error('Error during Appending Entities:', error);
        }
    };

    return (

        <><div className="container">
            <div className="card shadow border-0 my-4">
                <div className="card-header bg-gradient ml-0 py-3" style={{ backgroundColor: "#a3dcff" }}>
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2 className="py-2">Create Product</h2>
                        </div>
                    </div>
                </div>
                <div className="card-body p-4 bg-secondary">
                    <form onSubmit={handleSubmit} className="row" encType="multipart/form-data">

                        <div className="row">
                            <div className='col-1'></div>
                            <div className="col-10">
                                <div className="border bg-white p-3">
                                    <div className="form-floating py-2 col-12">
                                        <input
                                            className="form-control border-0 shadow"
                                            name="productName"
                                            defaultValue={productData.productName}
                                            onChange={(e) => handleInputChange(e, setProductData)}
                                        />
                                        <label className="ms-2">Name</label>
                                        <span className="text-danger"></span>
                                    </div>
                                    <div className="py-2 col-12">
                                        <label className="ms-2 text-muted">Description</label>
                                        <textarea
                                            name="productDescription"
                                            defaultValue={productData.productDescription}
                                            onChange={(e) => handleInputChange(e, setProductData)}
                                            className="form-control border-0 shadow"></textarea>
                                    </div>
                                    <div className="row">
                                        <div className="form-floating py-2 col-4">
                                            <input
                                                name="retailPrice"
                                                defaultValue={productData.retailPrice}
                                                onChange={(e) => handleInputChange(e, setProductData)}
                                                className="form-control border-0 shadow" />
                                            <label className="ms-2">Retail Price</label>
                                            <span className="text-danger"></span>
                                        </div>
                                        <div className="form-floating py-2 col-4">
                                            <input
                                                name="mrp"
                                                defaultValue={productData.mrp}
                                                onChange={(e) => handleInputChange(e, setProductData)}
                                                className="form-control border-0 shadow" />
                                            <label className="ms-2">MRP</label>
                                            <span className="text-danger"></span>
                                        </div>
                                        <div className="form-floating py-2 col-4">
                                            <input
                                                name="quantityInBox"
                                                defaultValue={productData.quantityInBox}
                                                onChange={(e) => handleInputChange(e, setProductData)}
                                                className="form-control border-0 shadow" />
                                            <label className="ms-2">QuantityInBox</label>
                                            <span className="text-danger"></span>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-3">
                                            <div className="form-floating py-2 col-12">
                                                <select className="form-select border-0 shadow"
                                                    name="isReplaceable"
                                                    defaultValue={productData.isReplaceable}
                                                    onChange={(e) => handleInputChange(e, setProductData)}
                                                >
                                                    <option disabled>Is Replaceable</option>
                                                    <option value={true}>True</option>
                                                    <option value={false}>False</option>
                                                </select>
                                                <label className="ms-2">Is Replaceable</label>
                                                <span className="text-danger"></span>
                                            </div></div>
                                        <div className="col-3">
                                            <div className="form-floating py-2 col-12">
                                                <select className="form-select border-0 shadow"
                                                    name="isRecommended"
                                                    defaultValue={productData.isRecommended}
                                                    onChange={(e) => handleInputChange(e, setProductData)}
                                                >
                                                    <option disabled>Is Recommended</option>
                                                    <option value={true}>True</option>
                                                    <option value={false}>False</option>
                                                </select>
                                                <label className="ms-2">Is Recommended</label>
                                                <span className="text-danger"></span>
                                            </div></div>
                                        <div className="col-3">
                                            <div className="form-floating py-2 col-12">
                                                <select className="form-select border-0 shadow"
                                                    name="isFamous"
                                                    defaultValue={productData.isFamous}
                                                    onChange={(e) => handleInputChange(e, setProductData)}
                                                >
                                                    <option disabled>Is Famous</option>
                                                    <option value={true}>True</option>
                                                    <option value={false}>False</option>
                                                </select>
                                                <label className="ms-2">Is Famous</label>
                                                <span className="text-danger"></span>
                                            </div></div>
                                        <div className="col-3">
                                            <div className="form-floating py-2 col-12">
                                                <select className="form-select border-0 shadow"
                                                    name="subCategoryId"
                                                    onChange={(e) => handleInputChange(e, setProductData)}
                                                >
                                                    <option>--Select Category--</option>
                                                    {subCategories.map((subcategory) => (
                                                        <option key={`subCatId${subcategory.id}`} value={subcategory.id}>{subcategory.subCategoryName}</option>
                                                    ))}
                                                </select>
                                                <label className="ms-2">Category</label>
                                                <span className="text-danger"></span>
                                            </div></div>
                                    </div>


                                    <div className="form-floating py-2 col-12">
                                        <input type="file" name="file"
                                            onChange={(e) => handleFileChange(e, setProductData)}
                                            className="form-control border-0 shadow" />
                                        <label className="ms-2"></label>
                                    </div>
                                    <div className="row pt-2">
                                        <div className="col-6 col-md-3">
                                            <button type="submit" className="btn btn-primary form-control">Create</button>
                                        </div>
                                        <div className="col-6 col-md-3">
                                            <Link to={"/product/index"} className="btn btn-outline-primary border  form-control">
                                                Back to List
                                            </Link>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>

        </>

    )
}

export default ProductCreate