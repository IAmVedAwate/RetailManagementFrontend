import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { handleGetSubmit, handlePostSubmit } from "../../services/Services";

const DeliveryComplete = () => {
  const { deliveryId } = useParams();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);

  const fetchOrderDetails = async () => {
    const response = await handleGetSubmit(`api/Delivery/${deliveryId}`, "Delivery Details");
    if (response?.data?.result) {
      setOrderData(response.data.result);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const handleCompleteDelivery = async () => {
    const response = await handlePostSubmit(`api/Delivery/Complete/${deliveryId}`, null, "application/json", "Delivery Completion");
    if (response?.data?.statusCode === 200) {
      alert("Delivery marked as complete!");
      navigate("/delivery/list");
    } else {
      alert(response?.data?.errorMessages || "Failed to complete delivery");
    }
  };

  return (
    <div className="container">
      <div className="card-header rounded-top-4 bg-gradient ml-0 p-3" style={{ backgroundColor: "#a3dcff" }}>
        <div className="row">
          <div className="col-6">
            <h1>Delivery Confirmation</h1>
          </div>
          <div className="col-6 text-end">
            <Link to="/delivery/index" className="btn btn-secondary">Back to List</Link>
          </div>
        </div>
      </div>

      <div className="card-body bg-white p-4">
        {orderData ? (
          <div className="row g-4">
            {/* Store Info */}
            <div className="col-md-6">
              <h4>Store Information:</h4>
              <p><strong>Store Name:</strong> {orderData.storeData.storeName}</p>
              <p><strong>Phone:</strong> {orderData.storeData.phone}</p>
              <p><strong>Address:</strong> {orderData.storeData.address}</p>
              <p><strong>Instructions:</strong> {orderData.instructions}</p>
              <p><strong>Google Map Location:</strong> {orderData.googleMapLocation}</p>
            </div>

            {/* Order Items */}
            <div className="col-md-6">
              <h4>Order Summary:</h4>
              <ul className="list-group">
                {orderData.ordersFromBill.map((item, idx) => (
                  <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{item.stock.product.productName}</strong>
                      <div className="text-muted">Qty: {item.quantity}</div>
                    </div>
                    <span>₹{item.totalAmount}</span>
                  </li>
                ))}
                <li className="list-group-item bg-light d-flex justify-content-between">
                  <strong>Total:</strong>
                  <strong>₹{orderData.ordersFromBill.reduce((total, item) => total + item.totalAmount, 0)}</strong>
                </li>
              </ul>
            </div>

            {/* Completion Action */}
            <div className="d-flex justify-content-between align-items-center mt-4 border-top pt-3">
              <p className="mb-0 text-muted">Status: <strong>{orderData.status}</strong></p>
              {orderData.status === "Assigned" ? (
                <button className="btn btn-success fw-bold" onClick={handleCompleteDelivery}>
                  Mark as Delivered
                </button>
              ) : orderData.status === "Completed" ? (
                <button className="btn btn-outline-success" disabled>
                  Already Delivered
                </button>
              ): <></>}
            </div>
          </div>
        ) : (
          <p className="text-center">Loading order details...</p>
        )}
      </div>
    </div>
  );
};

export default DeliveryComplete;
