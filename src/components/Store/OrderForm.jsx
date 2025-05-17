import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { handleDeleteSubmit, handleGetSubmit } from '../../services/Services';
import { setBills } from '../../store/BillSlice';



function OrderForm({ bill_index, productEntity , onAddOrder, changeTotal, quantityTemp, confirmPage, directOrderId, onDeleteOrder }) {
    const dispatch = useDispatch();
    const [orderId, setOrderId] = useState(null);
    const bills = useSelector((state) => state.bills.bills);
    const [orderData, setOrderData] = useState({
        productId: productEntity.product.id,
        quantity: quantityTemp ? quantityTemp: 1,
        price: productEntity.product.retailPrice,
    });
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchBills = async (e) => {
            try {
                if(bill_index){
                    const response = await handleGetSubmit(`api/Bill/Order?index=${bill_index}`, "Bill");
                    if (response.data.isSuccess) {
                        dispatch(setBills(response.data.result));
                        const order = response.data.result.find((bill) => bill.stock.productId === productEntity.productId);
                        if(order || order?.id) setOrderData({
                            ...orderData,
                            quantity: order.quantity,
                            
                        });
                        setOrderId(order?.id)
                        console.log(order);
                        console.log(productEntity);
                    }
                }
            } catch (error) {
                console.error("An error occurred while fetching subcategories:", error.message);
            }
        };

        fetchBills();
        
    }, []);
    
        

    
    
    const incrementQuantity = () => {
        if (orderData.quantity < productEntity.quantity) {
            setOrderData((prev) => ({
                ...prev,
                quantity: prev.quantity + 1,
            }));
            setError('');
        } else {
            setError(`Maximum available quantity is ${productEntity.quantity}`);
        }
    };

    const decrementQuantity = () => {
        setOrderData((prev) => ({
            ...prev,
            quantity: prev.quantity > 1 ? prev.quantity - 1 : prev.quantity,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let val = parseInt(value) || 0;
        if (name === 'quantity') {
            if (val > productEntity.quantity) {
                setError(`Maximum available quantity is ${productEntity.quantity}`);
                val = productEntity.quantity;
            } else {
                setError('');
            }
        }
        setOrderData((prev) => ({
            ...prev,
            [name]: name === 'quantity' ? val : value,
        }));
    };

    return (
        <>
        { productEntity?.quantity > 0 ? 
        <>
        <div className="col-12">
            <div className="card shadow-sm bg-secondary">
                <div className="row g-0 align-items-center">
                    <div className="col-md-2 p-2">
                        <div className="bg-white d-flex justify-content-center align-items-center" style={{ height: "150px" }}>
                            <img
                                style={{ height: "100px" }}
                                src={productEntity.product.image}
                                alt="Image" />
                        </div>
                    </div>
                    <div className="col-md-2 p-3">
                        <p className="mb-1"><strong>{productEntity.product.productName}</strong></p>
                        <p className='mb-1'><small>Category: {productEntity.product.subCategory?.subCategoryName}</small></p>
                        <p className="text-muted mb-1">Available: {productEntity?.quantity}</p>
                        <p className='mb-1'><small>By: <b>{productEntity.warehouse?.warehouseName}</b></small></p>
                    </div>
                    <div className="col-3">
                        <div className="d-flex align-items-center">
                            <button
                                type="button"
                                className="btn btn-outline-primary rounded py-1 px-3"
                                onClick={decrementQuantity}
                            >
                                <i className="bi bi-dash-square"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-primary rounded py-1 px-3"
                                onClick={incrementQuantity}
                            >
                                <i className="bi bi-plus-square"></i>
                            </button>
                            <input
                                onChange={handleInputChange}
                                value={orderData.quantity}
                                type="number"
                                name="quantity"
                                className="form-control mx-1"
                                style={{ width: '60px' }} />
                            <b className="h5 px-1 text-center pt-1">x {productEntity.product.retailPrice}</b>
                        </div>
                        {error && <span className="text-danger">{error}</span>}
                    </div>
                    <div className="col-1">
                        <b className="h5 text-secondary text-decoration-line-through" style={{ opacity: "50%" }}>MRP: {productEntity.product.mrp}</b>
                    </div>
                    <div className="col-2 ps-5">
                        <b className="h5">Total: {productEntity.product.retailPrice * orderData.quantity}</b>
                    </div>
                    <div className="col-md-2 p-3 text-center">
                        <div className='row'>
                            <div className='col-6'>
                            <button className={orderId>0 || confirmPage ? "btn btn-success w-100": "btn mx-4 btn-danger w-100"}
                        onClick={(e) => {
                            e.preventDefault();
                            const order = {
                                stockId: productEntity.id, // [CHANGE] Using warehouseId as stockId.
                                quantity: orderData.quantity,
                                totalAmount: productEntity.product.retailPrice * orderData.quantity,
                                orderId: directOrderId ? directOrderId : orderId
                            };
                            let output = onAddOrder(order); // [CHANGE] Call parent handler to add order.
                            output.then(value => {
                                setOrderId(value);
                                console.log(value); // Logs the extracted number
                            });
                            
                            
                        }}
                        >{orderId>0 || confirmPage ? <i className="bi bi-pen"></i>: <>Add</>}</button>
                            </div>
                            <div className='col-6'>
                            <>
                        {orderId>0 || confirmPage ? <button
                        onClick={async (e)=>{
                            e.preventDefault();
                            const response = await handleDeleteSubmit(`api/Bill/Order/${directOrderId? directOrderId : orderId}`,"Order From Bill")
                            setOrderId(null);
                            if(directOrderId) onDeleteOrder();
                            changeTotal(response.data?.result[0].total);
                        }}    
                        className="btn btn-danger w-100"><i className="bi bi-trash3-fill"></i></button>: <></>}                        
                        </>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </div>
        </>: <></>}
        </>
    )
}

export default OrderForm