import React, { useEffect, useState } from 'react';
import { handleGetSubmit } from '../../services/Services';

function AllReturns() {
  const [returns, setReturns] = useState([]);

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = async () => {
    const response = await handleGetSubmit('api/Delivery/Returns', 'Returns');
    if (response?.data?.result) {
      setReturns(response.data.result);
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
                    <h1>All Returns</h1>
                </div>
            </div>
        </div>
        <div className="card-body bg-white p-4">
            <table className="table table-bordered table-hover">
                <thead className="table-light">
                    <tr>
                        <th></th>
                        <th>Return Reason</th>
                        <th>Status</th>
                        <th>Approval Date</th>
                        <th>Refund Amount</th>
                        <th>Comments</th>
                        <th>Warehouse Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {returns.length > 0 ? (
                        returns.map((ret) => (
                            <tr key={ret.id}>
                                <td>{ret.id}</td>
                                <td>{ret.returnReason}</td>
                                <td>
                                    <span className={
                                        ret.returnStatus === "Pending"
                                            ? "badge bg-warning"
                                            : ret.returnStatus === "Approved"
                                            ? "badge bg-success"
                                            : "badge bg-danger"
                                    }>
                                        {ret.returnStatus}
                                    </span>
                                </td>
                                <td>{ret.approvalDate ? ret.approvalDate.split('T')[0] : ''}</td>
                                <td>{ret.refundAmmount}</td>
                                <td>{ret.comments}</td>
                                <td>{ret.order.stock.warehouse.warehouseName}</td>
                                <td>
                                    {ret.returnStatus === "Pending" ? (
                                        <button className="btn btn-primary">Approve</button>
                                    ) : (
                                        <button className="btn btn-danger" disabled>Approved</button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} className="text-center">No returns found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);
}

export default AllReturns;