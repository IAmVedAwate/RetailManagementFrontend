import React from "react";
import { Link } from "react-router-dom";

const DeliveryOrderList = () => {
  const openDetails = (orderId) => {
    window.location.href = `order_details.html?orderId=${orderId}`;
  };

  return (
    <div className="container">
        <div class="card-header rounded-top-4 bg-gradient ml-0 p-3" style={{backgroundColor:"#a3dcff"}}>
        <div className="row">
            <div className="col-6">
                <h1>Delivery List</h1>
            </div>
        </div>
        </div>
        <div class="card-body bg-white p-4">

        <div className="row">
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th
                        className="w-50"
                        >
                            Instructions
                        </th>
                        <th
                            className="w-50"
                        
                        >
                            Location
                        </th>
                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    
                        <tr>
                            <td>
                                Instructions
                            </td>
                            <td>
                                Location
                            </td>
                            <td className="text-center">
                                <Link to={"/delivery/detail"} className="btn btn-danger px-3 mx-2"><i class="bi bi-check2-circle"></i> Accepted</Link>
                                {/* <i class="bi bi-patch-plus-fill"></i> */}
                            </td>
                        </tr>
                        
                </tbody>
            </table>
        </div>
        </div>

    </div>

  );
};

export default DeliveryOrderList;
