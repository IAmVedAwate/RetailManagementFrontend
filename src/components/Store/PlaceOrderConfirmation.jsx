import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setBills } from "../../store/BillSlice";
import { useDispatch, useSelector } from "react-redux";
import { handleGetSubmit, handleInputChange, handlePostSubmit } from "../../services/Services";

const PlaceOrderConfirmation = () => {
  const { billIndex } = useParams();
  const dispatch = useDispatch();
  const bill = useSelector((state) => state.bills.bills);
  const navigate = useNavigate();
  const [billTotal, setBillTotal] = useState(null);

  const [orderPlaceData, setOrderPlaceData] = useState({
    billIndex: billIndex,
    phone2: "",
    instructions: "",
    googleMapLocation: "",
  });

  // Fetch bills and set total
  const fetchBills = async () => {
    const response = await handleGetSubmit(`api/Bill/Order?index=${billIndex}`, "Orders From Bill");
    dispatch(setBills(response.data.result));
    setBillTotal(response.data.result[0]?.bill.totalAmount);
  };

  useEffect(() => {
    fetchBills();
  }, []);

  // Request geolocation from browser and store as string in googleMapLocation
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationString = `${position.coords.latitude},${position.coords.longitude}`;
          setOrderPlaceData(prev => ({ ...prev, googleMapLocation: locationString }));
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not available in your browser.");
    }
  }, []);

  // Submit order data using JSON content type
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      await handlePostSubmit(`api/Delivery`, orderPlaceData, "application/json", "Order Place");
      // You might want to navigate or give feedback after success
      console.log(orderPlaceData);
      
      navigate("/home/index");
    } catch (error) {
      console.error("Error placing order:", error.message);
    }
  };

  return (
    <div className="container">
      <div className="card-header rounded-top-3 bg-gradient ml-0 p-3" style={{ backgroundColor: "#a3dcff" }}>
        <div className="row">
          <div className="col-6">
            <h1>Confirm Your Order</h1>
          </div>
          <div className="col-6 text-end">
            <Link to={`/bill/confirm/${billIndex}`} className="btn btn-success">Back To Bill</Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="card-body p-5 bg-white shadow">
        {bill ? (
          <form onSubmit={handlePlaceOrder}>
            <div className="row g-4">
              {/* Shipping Details */}
              <div className="col-md-6">
                <h4>Shipping Details:</h4>
                <div className="mb-3">
                  <label htmlFor="storeName" className="form-label fw-bold">Store Name</label>
                  <input
                    type="text"
                    id="storeName"
                    name="storeName"
                    defaultValue={bill[0].bill.storeUser.storeName}
                    disabled
                    className="form-control"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNamber" className="form-label fw-bold">Phone</label>
                  <input
                    type="text"
                    id="phoneNamber"
                    name="phoneNamber"
                    defaultValue={bill[0].bill.storeUser.phone}
                    disabled
                    className="form-control"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone2" className="form-label fw-bold">Phone2</label>
                  <input
                    type="text"
                    id="phone2"
                    name="phone2"
                    value={orderPlaceData.phone2}
                    onChange={(e) => handleInputChange(e, setOrderPlaceData)}
                    className="form-control"
                    placeholder="Enter your another phone number if any"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label fw-bold">Address</label>
                  <textarea
                    type="text"
                    id="address"
                    name="address"
                    defaultValue={bill[0].bill.storeUser.address}
                    disabled
                    className="form-control"
                    placeholder="Enter your address"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="instructions" className="form-label fw-bold">Instructions</label>
                  <textarea
                    type="text"
                    id="instructions"
                    name="instructions"
                    value={orderPlaceData.instructions}
                    onChange={(e) => handleInputChange(e, setOrderPlaceData)}
                    className="form-control"
                    placeholder="Enter your Instructions"
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="col-md-6">
                <div className="p-3 bg-light rounded shadow-sm">
                  <h4>Order Summary:</h4>
                  <ul className="list-group">
                    {bill.map((order, index) => (
                      <li
                        key={`order${index}`}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <h5 className="mb-0">{order.stock.product.productName}</h5>
                          <small className="text-muted">Quantity: {order.quantity}</small>
                        </div>
                        <span className="text-muted h5">₹{order.totalAmount}</span>
                      </li>
                    ))}
                    <li className="list-group-item d-flex justify-content-between align-items-center bg-light">
                      <strong className="h5">Total (Rupees)</strong>
                      <strong className="h5">₹{billTotal}</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="d-flex justify-content-between align-items-center mt-4 p-3 border-top">
              <p className="mb-0"></p>
              <button type="submit" className="btn btn-success fw-bold">
                Place Order
              </button>
            </div>
          </form>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default PlaceOrderConfirmation;
