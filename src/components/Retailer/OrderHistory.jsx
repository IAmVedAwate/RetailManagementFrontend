import React, { useEffect, useState } from 'react';
import { handleGetSubmit } from '../../services/Services';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({
    year: 0,
    month: 0,
    week: 0,
  });

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    const response = await handleGetSubmit('api/Warehouse/Order/History', 'Order History');
    if (response?.data?.result) {
      setOrders(response.data.result);
      calculateSummary(response.data.result);
    }
  };

  // Helper to check if a date is within the last N days
  const isWithinLastNDays = (dateStr, n) => {
    if (!dateStr) return false;
    const now = new Date();
    const date = new Date(dateStr);
    const nDaysAgo = new Date();
    nDaysAgo.setDate(now.getDate() - n);
    return date >= nDaysAgo && date <= now;
  };

  // Calculate earnings summary
  const calculateSummary = (orders) => {
    let year = 0, month = 0, week = 0;
    orders.forEach(order => {
      const date = order.orderPlacedDate;
      if (!date) return;
      if (isWithinLastNDays(date, 365)) year += order.totalAmount || 0;
      if (isWithinLastNDays(date, 30)) month += order.totalAmount || 0;
      if (isWithinLastNDays(date, 7)) week += order.totalAmount || 0;
    });
    setSummary({ year, month, week });
  };

  return (
    <div className="container">
      <div className="card shadow border-0 my-4">
        <div className="card-header bg-gradient py-3" style={{ backgroundColor: '#a3dcff' }}>
          <h2 className="text-center py-2">Order History</h2>
        </div>
        <div className="card-body p-4 bg-white">
          {/* Earnings Summary */}
          <div className="row mb-4">
            <div className="col-md-4 mb-2">
              <div className="p-3 rounded bg-success text-white text-center">
                <div className="fw-bold fs-5">Yearly Earnings</div>
                <div className="fs-4">₹{summary.year}</div>
              </div>
            </div>
            <div className="col-md-4 mb-2">
              <div className="p-3 rounded bg-primary text-white text-center">
                <div className="fw-bold fs-5">Monthly Earnings</div>
                <div className="fs-4">₹{summary.month}</div>
              </div>
            </div>
            <div className="col-md-4 mb-2">
              <div className="p-3 rounded bg-warning text-dark text-center">
                <div className="fw-bold fs-5">Weekly Earnings</div>
                <div className="fs-4">₹{summary.week}</div>
              </div>
            </div>
          </div>
          {/* Orders Table */}
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Order ID</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Total Amount</th>
                  <th>Payment Status</th>
                  <th>Order Placed Date</th>
                  <th>Is Returnable</th>
                  <th>Delivery Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map(order => (
                    <tr key={order.orderId}>
                      <td>{order.orderId}</td>
                      <td>{order.productName || '-'}</td>
                      <td>{order.quantity}</td>
                      <td>₹{order.totalAmount}</td>
                      <td>
                        <span className={
                          order.paymentStatus === "Pending"
                            ? "badge bg-warning"
                            : order.paymentStatus === "Paid"
                            ? "badge bg-success"
                            : "badge bg-secondary"
                        }>
                          {order.paymentStatus || '-'}
                        </span>
                      </td>
                      <td>{order.orderPlacedDate ? new Date(order.orderPlacedDate).toLocaleDateString() : '-'}</td>
                      <td>
                        {order.isReturnable
                          ? <span className="badge bg-success">Yes</span>
                          : <span className="badge bg-secondary">No</span>
                        }
                      </td>
                      <td>
                        {order.deliveryStatus
                          ? <span className="badge bg-info">{order.deliveryStatus}</span>
                          : <span className="badge bg-secondary">-</span>
                        }
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center">No order history found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;