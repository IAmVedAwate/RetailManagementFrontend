import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../store/ProductSlice';
import StockAddForm from './StockAddForm';
import { handleGetSubmit } from '../../services/Services';
import { setSubCategories } from '../../store/SubCategorySlice';
import { setCategories } from '../../store/CategorySlice';
import { setWarehouse } from '../../store/WarehouseSlice';

function WarehouseForm() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const subCategories = useSelector((state) => state.subCategories.subCategories);
    const categories = useSelector((state) => state.categories.categories);
    const warehouse = useSelector((state) => state.warehouse.warehouse);

    const [warCount, setWarCount] = useState(0);
    const fetchProducts = async (subCatId) => {
        try {
            const response = await handleGetSubmit(`api/admin/Product/${subCatId}`, "Product");            
            
            if (response.data.isSuccess) dispatch(setProducts(response.data.result));
        } catch (error) {
            console.error("An error occurred while fetching Products:", error.message);
        }
    };

    useEffect(() => {
        const fetchSubCategories = async (e) => {
            try {
                const response = await handleGetSubmit("api/admin/SubCategory", "SubCategory");
                if (response.data.isSuccess) dispatch(setSubCategories(response.data.result));

            } catch (error) {
                console.error("An error occurred while fetching subcategories:", error.message);
            }
        };

        fetchSubCategories();
    }, [dispatch]);

    const fetchWarehouse = async()=>{
        const response = await handleGetSubmit("api/Warehouse", "Warehouse");
        dispatch(setWarehouse(response.data.result));
      }
    
      useEffect(() => {
        fetchWarehouse();
      }, []);
    
      const handleActionComplete = () => {
        fetchWarehouse();
      };

    useEffect(() => {
        const fetchCategories = async () => {
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
        <>
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-md-3 mb-4">
                        <div className="card" style={{height: "85vh"}}>
                            <div className="card-header text-center fw-bold">Categories</div>
                            <div className="card-body p-0" style={{overflowY:"auto", height: "40%"}}>
                                <ul className="list-group">
                                    {categories.map((category) => (
                                        <li
                                            key={category.id}
                                            style={{ cursor: "pointer" }}
                                            className="list-group-item"
                                            onClick={() => {
                                                setSelectedCategory(category);
                                                setSelectedSubcategory(null); // Reset subcategory
                                            }}
                                        >
                                            {category.categoryName}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {selectedCategory && (
                                <>
                                    <div className="card-header text-center fw-bold">SubCategories</div>
                                    <div className="card-body p-0" style={{overflowY:"auto", height: "40%"}}>
                                        <ul className="list-group">
                                            {subCategories.filter((subcat) => subcat.category.id == selectedCategory.id)
                                                .flatMap((subcat) => subcat || [])
                                                        .map((subcategory) => (
                                                <li
                                                    key={subcategory.id}
                                                    style={{ cursor: "pointer" }}
                                                    className="list-group-item"
                                                    onClick={() =>{
                                                        setSelectedSubcategory(subcategory);
                                                        fetchProducts(subcategory.id);
                                                    }}
                                                >
                                                    {subcategory.subCategoryName}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            )}
                            <div className="card-footer text-center" height="20%">
                                <strong>Show Info About</strong>
                                <p>How Many Items Added</p>
                                <b>{warehouse?.length + warCount}</b>
                                {/* <p>How Much Quantities Added</p>
                                <b>0</b> */}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9 py-3 px-2 rounded" style={{ backgroundColor: "white"}}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="fw-bold">Products List To Select</h5>
                            <div>
                                <button className="btn btn-primary me-2">Search <i className="bi bi-search"></i></button>
                                <button className="btn btn-secondary">Filters <i className="bi bi-funnel"></i></button>
                            </div>
                        </div>
                        <div className="row g-3 mt-2" style={{overflowY: "auto", height: "75vh"}}>
                            {selectedSubcategory && (
                                <>
                                    {products.map((entity) => (
                                        <StockAddForm
                                            key={entity.id}
                                            id={entity.id}
                                            countAdj={setWarCount}
                                            onActionComplete={handleActionComplete}
                                        />
                                    ))}
                                </>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WarehouseForm