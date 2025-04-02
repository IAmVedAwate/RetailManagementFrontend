import React from "react";
import { Link } from "react-router-dom";

const DeliveryOrderDetail = () => {

  return (
    <div className="container">
    <div className="card-header rounded-top-3 bg-gradient ml-0 p-3" style={{ backgroundColor: "#a3dcff" }}>

    <div className="row">
        <div className="col-6">
            <h1>Delivery Details</h1>
        </div>
        <div className="col-6 text-end">
            <Link to={"/"} className="btn btn-outline-dark">Back To Home</Link>
        </div>
    </div>
    </div>

  <div className="card-body p-5 bg-white shadow">
    <form method="post">
      <div className="row g-4">
        <div className="col-md-6">
          <h4>Shipping Details:</h4>
          <div className="mb-3">
              <label className="form-label fw-bold">
                Name
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">
                Phone
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                placeholder="Phone"
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">
                Street
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                placeholder="Street"
              />
            </div>
            <div className="row">
            <div className="mb-3 col-4">
              <label className="form-label fw-bold">
                City
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                placeholder="City"
              />
            </div>
            <div className="mb-3 col-4">
              <label className="form-label fw-bold">
                State
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                placeholder="State"
              />
            </div>
            <div className="mb-3 col-4">
              <label className="form-label fw-bold">
                Postal Code
              </label>
              <input
                disabled
                type="text"
                className="form-control"
                placeholder="Postal Code"
              />
            </div>
            </div>
          <div className="mx-5 my-3 text-center border shadow rounded-4">
            <img 
            className="w-50 mx-5"
            src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=480,h=480/app/assets/products/large_images/jpeg/995ba895-152a-4995-a400-64a68639c104.jpg?ts=1717412396" 
            alt="" />
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-md-6">
          <div className="p-3 bg-light rounded shadow-sm">
            <h4>Order Summary:</h4>
            <ul className="list-group">
              {[
                { name: "Product 1", quantity: 2, price: "₹200" },
                { name: "Product 2", quantity: 1, price: "₹300" },
              ].map((item, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h5 className="mb-0">{item.name}</h5>
                    <small className="text-muted">Quantity: {item.quantity}</small>
                  </div>
                  <span className="text-muted h5">{item.price}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between align-items-center bg-light">
                <strong className="h5">Total (Rupees)</strong>
                <strong className="h5">₹500</strong>
              </li>
            </ul>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-4 p-3 border-top">
        <p className="mb-0">
        </p>
        <button
          type="submit"
          className="btn btn-success fw-bold"
        >
          Completed
        </button>
      </div>
          
        </div>
      </div>
    </form>
  </div>

    </div>
  );
};

export default DeliveryOrderDetail;
