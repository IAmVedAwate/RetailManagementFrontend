import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setBills } from "../../store/BillSlice";
import { useDispatch, useSelector } from "react-redux";
import { handleDeleteSubmit, handleGetSubmit } from "../../services/Services";
import OrderForm from "./OrderForm";
import axios from "axios";
import { BillContext } from "../../context/BillContext";

const BillConfirmation = () => {
  const { fetchBillsAgain } = useContext(BillContext);
  const { billIndex } = useParams();
  const dispatch = useDispatch();
  const bill = useSelector((state) => state.bills.bills);
  const navigate = useNavigate();
  const [billName, setBillName] = useState(null);
  const [billId, setBillId] = useState(null);
  const [billTotal, setBillTotal] = useState(null);

  const fetchBills = async () => {
    const response = await handleGetSubmit(`api/Bill/Order?index=${billIndex}`, "Orders From Bill");
    if (response?.data?.result) {
      dispatch(setBills(response?.data.result));
      setBillName(response?.data.result[0]?.bill.billName);
      setBillId(response?.data.result[0]?.bill.id);
      setBillTotal(response?.data.result[0]?.bill.totalAmount);
    }else{
      fetchBillsAgain(localStorage.getItem("role"));
      navigate("/");
    }
    
  };

  useEffect(() => {
    fetchBills();
  }, [billIndex]);

  const handleAddOrder = async (order) => {
    const payload = {
      billId: billId, // pass billId along with stockId
      stockId: order.stockId,
      quantity: order.quantity,
      totalAmount: order.totalAmount
    };
    const orderIdParam = await order.orderId || 0;
    console.error(payload);
    try {
      const response = await axios.put(
        `https://localhost:44374/api/Bill/Order/${orderIdParam}`,
        payload,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
            "Content-Type": 'multipart/form-data'
          },
        }
      );

      if (response.data.isSuccess) {
        setBillTotal(response.data.result.bill.totalAmount);
        alert(`Bill Updated successfully! : ${response.data.result.id}`);
        return response.data.result.id;
      } else {
        alert(`Failed to Create Bill.`);
      }
    } catch (error) {
      console.error("Error updating bill:", error);
    }
  };

  return (
    <form method="post">
      <div className="container my-5">
        <div
          className="card shadow-lg border-0 rounded-4"
          style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", backgroundColor: "white" }}
        >
          {/* Card Header */}
          <div
            className="card-header bg-primary bg-gradient text-light py-4 rounded-top-4"
            style={{ fontSize: "1.5rem", padding: "20px" }}
          >
            <div className="row px-4">
              <div className="col-12">
                <h5 className="pt-2 text-white">{billName}</h5>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="card-body my-4" style={{ padding: "20px" }}>


            {/* Shopping Cart Items */}
            <div className="row">
              <div className="col-12">
                {bill ? bill.map(order => (
                  <OrderForm
                    key={order.stock.productId}
                    productEntity={order.stock}
                    onAddOrder={handleAddOrder}
                    changeTotal={setBillTotal}
                    quantityTemp={order.quantity}
                    confirmPage={true}
                    directOrderId={order.id}
                    onDeleteOrder={fetchBills}
                  />
                )): <></>}
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div
            className="card-footer bg-light border-0 rounded-bottom-4"
            style={{ backgroundColor: "#f8f9fa", textAlign: "center", padding: "20px" }}
          >
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <ul className="list-group mb-4">
                  <li className="d-flex justify-content-between align-items-center">
                    <h5 className="text-dark fw-semibold text-uppercase">
                      Total (Rupees)
                    </h5>
                    <h4 className="text-dark fw-bolder">₹{billTotal}</h4>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10 offset-md-1">
                <div className="d-flex justify-content-between">
                  <a
                    onClick={()=>{
                      navigate('/home/index');
                    }}
                    className="btn btn-outline-dark btn-sm w-100 py-2 rounded-3"
                    style={{ marginRight: "10px" }}
                  >
                    Back to Home
                  </a>
                  <a
                    onClick={async(e)=>{
                      e.preventDefault();
                      await handleDeleteSubmit(`api/Bill/${billId}`,"Bill");
                      fetchBillsAgain(localStorage.getItem("role"));
                      navigate("/")
                    }}
                    className="btn btn-danger border-0 bg-gradient w-100 py-2 rounded-3"
                    style={{ marginRight: "10px" }}
                  >
                    Delete Bill
                  </a>
                  <Link
                    className="btn btn-success btn-sm w-100 py-2 rounded-3"
                    style={{ marginRight: "10px" }}
                    to="/bill/create"
                    state={{ bill_id: billId, bill_name: billName, bill_index: billIndex, bill_total: billTotal }}
                  >
                    Edit Bill
                  </Link>
                  <div
                    className="mx-5"
                  >

                  </div>
                  <a
                    onClick={()=>{
                      navigate(`/bill/placeorder/${billIndex}`);
                    }}
                    className="btn btn-primary border-0 bg-gradient w-100 py-2 rounded-3"
                    style={{ marginRight: "10px" }}
                  >
                    Proceed to Checkout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BillConfirmation;
