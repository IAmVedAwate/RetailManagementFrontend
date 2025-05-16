import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleGetSubmit, handlePostSubmit } from "../../services/Services";
import DeliveryOrder from "./DeliveryOrder";

const DeliveryOrderList = () => {
    const [orders, setOrders] = useState([]);
    const handleAccept = async (orderId) => {
        const selectedOrder = orders.find((order) => order.deliveryId === orderId);
    
        if (!selectedOrder) {
          alert("Order not found");
          return;
        }
    
        const response = await handlePostSubmit(`api/Delivery/${orderId}`,null,"application/json","Delivery");
    
        if (response?.data?.statusCode == 200) {
          // Optionally refresh the list or disable the button
          alert("Order Accepted");
        }
        else alert(response?.data?.errorMessages)
      };
    // Fetch delivery orders on component mount
    useEffect(() => {
      fetchDeliveryOrders();
    }, [orders]);
  
    const fetchDeliveryOrders = async () => {
      const response = await handleGetSubmit("api/Delivery", "Delivery Orders");
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
              <h1>Delivery List</h1>
            </div>
          </div>
        </div>
        <div className="card-body bg-white p-4">
          <DeliveryOrder onlyShow={true} orders={orders} handleAccept={handleAccept} fetchDeliveryOrders={fetchDeliveryOrders}/>
        </div>
      </div>
    );
  };
  
export default DeliveryOrderList;
