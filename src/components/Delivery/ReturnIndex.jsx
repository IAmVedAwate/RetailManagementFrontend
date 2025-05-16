import React, { useState, useEffect } from "react";
import { handleGetSubmit } from "../../services/Services";
import { useNavigate } from "react-router-dom";

function ReturnIndex() {
  const [search, setSearch] = useState("");
  const [bills, setBills] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReturnableBills();
  }, []);

  const fetchReturnableBills = async () => {
    const response = await handleGetSubmit("api/Bill/Returnable", "Returnable Bills");
    if (response?.data?.result) {
      setBills(response.data.result);
    }
  };

  // Filter bills based on search input
  const filteredBills = bills.filter(
    (bill) =>
      bill.billId?.toString().includes(search) ||
      bill.billName?.toLowerCase().includes(search.toLowerCase()) ||
      bill.email?.toLowerCase().includes(search.toLowerCase()) ||
      bill.storeName?.toLowerCase().includes(search.toLowerCase())
  );

  // Fetch orders for selected bill
  const handleBillSelect = async (billId, billName, email) => {
    setSearch(billName + " (" + billId + ")");
    setShowDropdown(false);
    const response = await handleGetSubmit(`api/Bill/Order/Returns?index=${billId}&email=${email}`, "Bill Orders");
    if (response?.data?.result) {
      setOrders(response.data.result);
    } else {
      setOrders([]);
    }
  };

  return (
    <div className="container">
      <div
        className="card-header rounded-top-4 bg-gradient ml-0 p-3"
        style={{ backgroundColor: "#a3dcff" }}
      >
        <div className="row align-items-center">
          <div className="col-12 position-relative">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search by Bill ID, Bill Name, Email, or Store Name"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowDropdown(e.target.value.length > 0);
              }}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              onFocus={() => setShowDropdown(search.length > 0)}
              autoComplete="off"
            />
            {showDropdown && filteredBills.length > 0 && (
              <ul className="dropdown-menu show w-100 mt-1" style={{maxHeight: 300, overflowY: "auto"}}>
                {filteredBills.map((bill) => (
                  <li
                    key={bill.billId}
                    className="dropdown-item"
                    style={{ cursor: "pointer" }}
                    onMouseDown={() => handleBillSelect(bill.billId, bill.billName, bill.email)}

                  >
                    <div>
                      <strong>{bill.billName}</strong> (ID: {bill.billId})<br />
                      <small>{bill.email} | {bill.storeName}</small>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {showDropdown && filteredBills.length === 0 && (
              <ul className="dropdown-menu show w-100 mt-1">
                <li className="dropdown-item text-muted">No results found</li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="card-body bg-white p-4">
        {orders.length > 0 && (
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Order ID</th>
                <th>Product Name</th>
                <th>Is Returnable</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.stock?.product?.productName}</td>
                  <td>
                    {order.stock?.isReturnable ? (
                      <span className="badge bg-success">Yes</span>
                    ) : (
                      <span className="badge bg-secondary">No</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-success"
                      disabled={!order.stock?.isReturnable}
                      onClick={() => navigate(`/return/create/${order.id}`)}
                    >
                      Return
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ReturnIndex;