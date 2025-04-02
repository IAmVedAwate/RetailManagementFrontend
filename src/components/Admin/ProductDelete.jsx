import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { handleDeleteSubmit, handleGetSubmit } from '../../services/Services';
import { setProducts } from '../../store/ProductSlice';

function ProductDelete() {

    const { productid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state) => state.products.products);
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
            file: null,
            image: null,
            subCategoryName: ""
        }
    )

    useEffect(() => {
        const fetchProduct = async () => {
            // Set form values if subcategory exists
            if (products.length <= 0) {
                const response = await handleGetSubmit("api/Admin/Product", "Product");
                dispatch(setProducts(response.data.result));
            }

            const selectedProducts = products.find(
                (pro) => pro.id == parseInt(productid)
            );
            if (selectedProducts) {
                setProductData(() => ({
                    productName: selectedProducts.productName,
                    productDescription: selectedProducts.productDescription,
                    retailPrice: selectedProducts.retailPrice,
                    mrp: selectedProducts.mrp,
                    quantityInBox: selectedProducts.quantityInBox,
                    isReplaceable: selectedProducts.isReplaceable,
                    isRecommended: selectedProducts.isRecommended,
                    isFamous: selectedProducts.isFamous,
                    subCategoryId: selectedProducts.subCategoryId,
                    file: null,
                    image: selectedProducts.image,
                    subCategoryName: selectedProducts.subCategory.subCategoryName,
                }));
            }
        }
        fetchProduct();
    }, [products, productid]);

    const handleDelete = async () => {
        await handleDeleteSubmit(`api/admin/Product/${productid}`, "Product");
        navigate("/product/index");
    };
  return (
    <><div className="container">
            <div className="card shadow border-0 my-4">
                <div className="card-header bg-gradient ml-0 py-3" style={{ backgroundColor: "#ffa3a3" }}>
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2 className="py-2">Delete Product</h2>
                        </div>
                    </div>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleDelete} className="row" encType="multipart/form-data">
                    <div className="row">
                            <div className="col-9">
                                <div className="border bg-white p-3">
                                    <div className="form-floating py-2 col-12">
                                        <input disabled
                                            className="form-control border-0 shadow"
                                            name="productName"
                                            defaultValue={productData.productName}
                                        />
                                        <label className="ms-2">Name</label>
                                        <span className="text-danger"></span>
                                    </div>
                                    <div className="py-2 col-12">
                                        <label className="ms-2 text-muted">Description</label>
                                        <textarea
                                            disabled
                                            name="productDescription"
                                            defaultValue={productData.productDescription}
                                            className="form-control border-0 shadow"></textarea>
                                    </div>
                                    <div className="row">
                                        <div className="form-floating py-2 col-4">
                                            <input disabled
                                                name="retailPrice"
                                                value={productData.retailPrice}
                                                className="form-control border-0 shadow" />
                                            <label className="ms-2">Retail Price</label>
                                            <span className="text-danger"></span>
                                        </div>
                                        <div className="form-floating py-2 col-4">
                                            <input disabled
                                                name="mrp"
                                                value={productData.mrp}
                                                className="form-control border-0 shadow" />
                                            <label className="ms-2">MRP</label>
                                            <span className="text-danger"></span>
                                        </div>
                                        <div className="form-floating py-2 col-4">
                                            <input disabled
                                                name="quantityInBox"
                                                value={productData.quantityInBox}
                                                className="form-control border-0 shadow" />
                                            <label className="ms-2">QuantityInBox</label>
                                            <span className="text-danger"></span>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-4">
                                            <div className="form-floating py-2 col-12">
                                                <select disabled className="form-select border-0 shadow"
                                                    name="isReplaceable"
                                                    value={productData.isReplaceable}
                                                >
                                                    <option value={true}>True</option>
                                                    <option value={false}>False</option>
                                                </select>
                                                <label className="ms-2">Is Replaceable</label>
                                                <span className="text-danger"></span>
                                            </div></div>
                                        <div className="col-4">
                                            <div className="form-floating py-2 col-12">
                                                <select disabled className="form-select border-0 shadow"
                                                    name="isRecommended"
                                                    value={productData.isRecommended}
                                                >
                                                    <option value={true}>True</option>
                                                    <option value={false}>False</option>
                                                </select>
                                                <label className="ms-2">Is Recommended</label>
                                                <span className="text-danger"></span>
                                            </div></div>
                                        <div className="col-4">
                                            <div className="form-floating py-2 col-12">
                                                <select disabled className="form-select border-0 shadow"
                                                    name="isFamous"
                                                    value={productData.isFamous}
                                                >
                                                    <option value={true}>True</option>
                                                    <option value={false}>False</option>
                                                </select>
                                                <label className="ms-2">Is Famous</label>
                                                <span className="text-danger"></span>
                                            </div></div>

                                    </div>

                                    <div className="row">
                                        <div className="col-4">
                                            <div className="form-floating py-2 col-12">
                                                <select disabled className="form-select border-0 shadow"
                                                    name="subCategoryId"
                                                    value={productData.subCategoryId}
                                                >
                                                    <option value={productData.subCategoryId}>{productData.subCategoryName}</option>
                                                </select>
                                                <label className="ms-2">Category</label>
                                                <span className="text-danger"></span>
                                            </div></div>
                                        
                                    </div>

                                    <div className="row pt-2">
                                        <div className="col-6 col-md-3">
                                            <button type="submit" className="btn btn-danger form-control">Delete</button>
                                        </div>
                                        <div className="col-6 col-md-3">
                                            <Link to={"/product/index"} className="btn btn-outline-primary border  form-control">
                                                Back to List
                                            </Link>
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <div className="col-3">
                                <div className="border p-1 m-2 text-center">
                                    <img src={productData.image} width="100%"
                                        style={{ borderRadius: "5px", border: "1px solid #bbb9b9" }} />
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

export default ProductDelete



