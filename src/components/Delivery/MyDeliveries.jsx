import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleGetSubmit, handlePostSubmit } from "../../services/Services";
import DeliveryOrder from "./DeliveryOrder";

function MyDeliveries() {
    const [orders, setOrders] = useState([]);
    
    // Fetch delivery orders on component mount
    useEffect(() => {
      fetchDeliveryOrders();
    }, []);
  
    const fetchDeliveryOrders = async () => {
      const response = await handleGetSubmit("api/Delivery/Accepted", "Delivery Orders");
      if (response?.data?.result) {
        setOrders(response.data.result);
      }
    };
  
    
  
    return (
      <div className="container">
        <div
          className="card-header rounded-top-4 bg-gradient ml-0 p-3"
          style={{ backgroundColor: "#a3dcff" }}
        >
          <div className="row">
            <div className="col-6">
              <h1>Accepted Delivery List</h1>
            </div>
          </div>
        </div>
        <div className="card-body bg-white p-4">
          <DeliveryOrder orders={orders} fetchDeliveryOrders={fetchDeliveryOrders}/>
        </div>
      </div>
    );
  };


export default MyDeliveries