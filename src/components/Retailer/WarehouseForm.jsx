import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../store/ProductSlice';
import StockAddForm from './StockAddForm';
import { handleGetSubmit } from '../../services/Services';
import { setSubCategories } from '../../store/SubCategorySlice';
import { setCategories } from '../../store/CategorySlice';
import { setWarehouse } from '../../store/WarehouseSlice';
import axios from 'axios'; // <-- Add this for association mining
import FloatingAdvertisement from '../Default/FloatingAdvertisement';

function WarehouseForm() {
    const [showAd, setShowAd] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [associations, setAssociations] = useState([]); // <-- For association mining

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

    // Fetch associations when subcategory changes
    useEffect(() => {
        const fetchAssociations = async () => {
            if (selectedSubcategory) {
                try {
                    const res = await axios.get(`http://127.0.0.1:8000/association/${encodeURIComponent(selectedSubcategory.subCategoryName)}`);
                    if (res.data && Array.isArray(res.data.associations)) {
                        setAssociations(res.data.associations);
                    } else {
                        setAssociations([]);
                    }
                } catch (err) {
                    setAssociations([]);
                }
            } else {
                setAssociations([]);
            }
        };
        fetchAssociations();
    }, [selectedSubcategory]);

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

    const fetchWarehouse = async () => {
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
            <FloatingAdvertisement show={showAd} onClose={() => setShowAd(false)} adLocation="Bill / Retailer" />
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-md-3 mb-4">
                        <div className="card" style={{ height: "85vh" }}>
                            <div className="card-header text-center fw-bold">Categories</div>
                            <div className="card-body p-0" style={{ overflowY: "auto", height: "40%" }}>
                                <ul className="list-group">
                                    {categories.map((category) => (
                                        <li
                                            key={category.id}
                                            style={{ cursor: "pointer" }}
                                            className={
                                                "list-group-item" +
                                                (selectedCategory && selectedCategory.id === category.id
                                                    ? " bg-info bg-opacity-25 fw-bold"
                                                    : "")
                                            }
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
                                    <div className="card-body p-0" style={{ overflowY: "auto", height: "40%" }}>
                                        <ul className="list-group">
                                            {subCategories.filter((subcat) => subcat.category.id == selectedCategory.id)
                                                .flatMap((subcat) => subcat || [])
                                                .map((subcategory) => (
                                                    <li
                                                        key={subcategory.id}
                                                        style={{ cursor: "pointer" }}
                                                        className={
                                                            "list-group-item" +
                                                            (selectedSubcategory && selectedSubcategory.id === subcategory.id
                                                                ? " bg-info bg-opacity-25 fw-bold"
                                                                : "")
                                                        }
                                                        onClick={() => {
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
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9 py-3 px-2 rounded" style={{ backgroundColor: "white" }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="fw-bold">Products List To Select</h5>
                            <div>
                                <button className="btn btn-primary me-2">Search <i className="bi bi-search"></i></button>
                                <button className="btn btn-secondary">Filters <i className="bi bi-funnel"></i></button>
                            </div>
                        </div>
                        {/* Association Mining Suggestions */}
                        {associations.length > 0 && (
                            <div className="mb-3">
                                <span className="fw-bold me-2">Try these also:</span>
                                {associations.map((assoc, idx) => (
                                    <span key={idx} className="badge rounded-pill bg-info text-dark me-2 mb-1" style={{ fontSize: "1rem" }}>
                                        {assoc}
                                    </span>
                                ))}
                            </div>
                        )}
                        <div className="row g-3 mt-2" style={{ overflowY: "auto", height: "75vh" }}>
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

export default WarehouseForm;