import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleGetSubmit, handlePostSubmit } from "../../services/Services";

const DeliveryOrderList = () => {
    const [orders, setOrders] = useState([]);
    const [hoverStyle, setHoverStyle]= useState(null)
    const navigate = useNavigate();
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
          <div className="row">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th className="w-50">Instructions</th>
                  <th className="w-50">Address</th>
                  <th className="w-50">Location</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.deliveryId} style={{cursor:"pointer", textDecoration:hoverStyle === order.deliveryId ? "underline" : "none"}} onMouseOver={()=>{setHoverStyle(order.deliveryId)}} onMouseLeave={()=>{setHoverStyle(null)}} onClick={()=>{navigate(`/delivery/details/${order.deliveryId}`);}}>
                      <td>{order.instructions}</td>
                      <td>{order.storeData.address}</td>
                      <td>{order.googleMapLocation}</td>
                      <td className="text-center">
                        {
                            order.status == "Pending" ?
                            <>
                                <button
                          className="btn btn-success px-3 mx-2"
                          onClick={() => {handleAccept(order.deliveryId); fetchDeliveryOrders();}}
                        >
                          <i className="bi bi-check2-circle"></i> Accept
                        </button>
                            </>:
                            <>
                            <button
                          className="btn btn-danger px-3 mx-2"
                          onClick={() => alert("Already Assigned to somebody Else!")}
                        >
                           Accepted
                        </button>
                            </>
                        }
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No delivery orders available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
export default DeliveryOrderList;
