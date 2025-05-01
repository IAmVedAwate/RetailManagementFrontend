import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function DeliveryOrder({orders, handleAccept, fetchDeliveryOrders}) {
  const [hoverStyle, setHoverStyle]= useState(null);
  const navigate = useNavigate();

  return (
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
                    <tr key={order.deliveryId}>
                      <td style={{cursor:"pointer", textDecoration:hoverStyle === order.deliveryId ? "underline" : "none"}} onMouseOver={()=>{setHoverStyle(order.deliveryId)}} onMouseLeave={()=>{setHoverStyle(null)}} onClick={()=>{navigate(`/delivery/details/${order.deliveryId}`);}}>{order.instructions}</td>
                      <td style={{cursor:"pointer", textDecoration:hoverStyle === order.deliveryId ? "underline" : "none"}} onMouseOver={()=>{setHoverStyle(order.deliveryId)}} onMouseLeave={()=>{setHoverStyle(null)}} onClick={()=>{navigate(`/delivery/details/${order.deliveryId}`);}}>{order.storeData.address}</td>
                      <td style={{cursor:"pointer", textDecoration:hoverStyle === order.deliveryId ? "underline" : "none"}} onMouseOver={()=>{setHoverStyle(order.deliveryId)}} onMouseLeave={()=>{setHoverStyle(null)}} onClick={()=>{navigate(`/delivery/details/${order.deliveryId}`);}}>{order.googleMapLocation}</td>
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
                          className={order.status == "Assigned" ? "btn btn-success px-3 mx-2" : "btn btn-secondary px-3 mx-2"}
                          style={{cursor:"pointer"}} onMouseOver={()=>{setHoverStyle(order.deliveryId)}} onMouseLeave={()=>{setHoverStyle(null)}} onClick={()=>{navigate(`/delivery/details/${order.deliveryId}`);}}
                        >
                           {order.status == "Assigned" ? "Accepted" : "Completed"}
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
  )
}

export default DeliveryOrder