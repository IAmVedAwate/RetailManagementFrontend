import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OrderForm from './OrderForm'
import { useDispatch, useSelector } from 'react-redux';
import { handleGetSubmit } from '../../services/Services';
import { setSubCategories } from '../../store/SubCategorySlice';
import { setCategories } from '../../store/CategorySlice';
import { setWarehouse } from '../../store/WarehouseSlice';
import axios from 'axios';
import { BillContext } from '../../context/BillContext';

function BillForm({bill_id, bill_name}) {
    const { fetchBillsAgain } = useContext(BillContext);
    
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [billName, setBillName] = useState(bill_name);
    const [billId, setBillId] = useState(bill_id);
    const [billTotal, setBillTotal] = useState(0);

    const dispatch = useDispatch();
    const warehouse = useSelector((state) => state.warehouse.warehouse);

    const subCategories = useSelector((state) => state.subCategories.subCategories);
    const categories = useSelector((state) => state.categories.categories);

    const fetchProducts = async (subCatId) => {
        try {
            const response = await handleGetSubmit(`api/Warehouse/all/${subCatId}`, "Warehouse");
            if (response.data.isSuccess) dispatch(setWarehouse(response.data.result));
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

    // Aggregate products across warehouses by product id
    const aggregatedProducts = selectedSubcategory ? Object.values(
        warehouse.reduce((acc, curr) => {
            const productId = curr.product.id;
            if (acc[productId]) {
                // Sum the available quantity across warehouses
                acc[productId].quantity += curr.quantity;
            } else {
                // Clone current object and use its quantity
                acc[productId] = { ...curr, quantity: curr.quantity };
            }
            return acc;
        }, {})
    ) : [];

    const handleAddOrder = async (order) => {
        if (!billId) {
            // Validate bill name on first add.
            if (!billName) {
                alert("Please provide a bill name.");
                return;
            }
            const payload = {
                orders: [
                    {
                        stockId: order.stockId,
                        quantity: order.quantity,
                        totalAmount: order.totalAmount
                    },
                ],
                billName: billName.trim()
            };
            try {
                const response = await axios.post(
                    `https://localhost:44374/api/Bill`,
                    JSON.stringify(payload),
                    {
                        headers: {
                            Authorization: localStorage.getItem('token'),
                            "Content-Type": 'application/json'
                        },
                    }
                );
                
                if (response.data.isSuccess) {
                    setBillTotal(response.data.result[0].total);
                    setBillId(response.data.result[0].billId); // [CHANGE] Save the created bill's ID.
                    fetchBillsAgain();
                    alert(`Bill Created successfully! : ${response.data.result[0].orderId}`);
                    return response.data.result[0].orderId;
                } else {
                    alert(`Failed to Create Bill.`);
                }
                
            } catch (error) {
                console.error("Error creating bill:", error);
            }
        } else {
            const payload = {
                billId: billId, // pass billId along with stockId
                stockId: order.stockId,
                quantity: order.quantity,
                totalAmount: order.totalAmount
            };
            const orderIdParam = await order.orderId || 0;
            console.error(order.orderId);
            try {
                const response = await axios.put(
                    `https://localhost:44374/api/Bill/Order/${orderIdParam}`,
                    payload,
                    {
                        headers: {
                            Authorization: localStorage.getItem('token'),
                            "Content-Type": 'multipart/form-data'
                        },
                    }
                );
        
                console.log(response.data);
                if (response.data.isSuccess) {
                    setBillTotal(response.data.result[0].total);
                    alert(`Bill Created successfully! : ${response.data.result[0].orderId}`);
                    return response.data.result[0].orderId;
                } else {
                    alert(`Failed to Create Bill.`);
                }
            } catch (error) {
                console.error("Error updating bill:", error);
            }
        }
    };

    return (
        <>
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-md-3 mb-2">
                        <div className="card" style={{ height: "85vh" }}>
                            <div className="card-header text-center fw-bold">Categories</div>
                            <div className="card-body p-0" style={{ overflowY: "auto", height: "40%" }}>
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
                                    <div className="card-body p-0" style={{ overflowY: "auto", height: "40%" }}>
                                        <ul className="list-group">
                                            {subCategories.filter((subcat) => subcat.category.id == selectedCategory.id)
                                                .flatMap((subcat) => subcat || [])
                                                .map((subcategory) => (
                                                    <li
                                                        key={subcategory.id}
                                                        style={{ cursor: "pointer" }}
                                                        className="list-group-item"
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
                            <div className="card-footer text-center">
                                <Link to={"/bill/confirmation"} className='btn btn-success' style={{ padding: "20px" }}>
                                    Confirm Your Bill Here
                                </Link>
                            </div>
                            <div className="card-footer text-center">
                                <div className='text text-warning' style={{ padding: "20px" }}>
                                    <p className='h5'>Total Amount: </p><b className='h4'>₹{billTotal}</b>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 py-2 px-2 rounded" style={{ backgroundColor: "white" }}>
                        <div className="d-flex justify-content-between align-items-center pb-2">
                            <div className="col-3">
                                <input 
                                    className="form-control border-0 shadow fw-bold" 
                                    placeholder='Bill Name' 
                                    value={billName}
                                    onChange={(e) => setBillName(e.target.value)} 
                                    disabled={!!billId}
                                />
                                <span className='text-danger'><pre>     Please Give a Bill name</pre> </span>
                            </div>
                            <div>
                                <button className="btn btn-primary me-2">Search <i className="bi bi-search"></i></button>
                                <button className="btn btn-secondary">Filters <i className="bi bi-funnel"></i></button>
                            </div>
                        </div>
                        <div className="row g-3" style={{ overflowY: "auto", height: "75vh" }}>
                            {selectedSubcategory && (
                                <>
                                    {aggregatedProducts.map((entity) => (
                                        <OrderForm
                                            key={entity.product.id}
                                            productEntity={entity}
                                            onAddOrder={handleAddOrder}
                                            changeTotal={setBillTotal}
                                            confirmPage={false}
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

export default BillForm