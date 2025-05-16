import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { handleInputChange, handleFileChange, handlePostSubmit, handleGetSubmit } from '../../services/Services';

function ReturnCreate() {
  const { orderid } = useParams();
  const navigate = useNavigate();
  const [returnData, setReturnData] = useState({
    orderId: orderid,
    returnReason: '',
    returnStatus: 'Pending',
    comments: '',
    refundAmmount: 0,
    returnMethod: 'Refund',
    photoEvidence: null,
  });

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await handleGetSubmit(`api/Bill/Order/Return/${orderid}`);
        if (response?.data) {
          setReturnData((prevData) => ({
            ...prevData,
            orderId: response.data.result.id ?? orderid,
            refundAmmount: response.data.result.totalAmount ?? 0,
          }));
          console.log('Order details fetched successfully:', response.data.result);
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      Object.entries(returnData).forEach(([key, value]) => {
        if (key === 'photoEvidence' && value) {
          payload.append(key, value);
        } else {
          payload.append(key, value);
        }
      });

      await handlePostSubmit(
        'api/Delivery/Returns',
        payload,
        'multipart/form-data',
        'Return'
      );
      navigate('/');
    } catch (error) {
      console.error('Error submitting return:', error);
    }
  };

  return (
    <div className="container">
      <div className="card shadow border-0 my-4">
        <div className="card-header bg-gradient py-3" style={{ backgroundColor: '#a3dcff' }}>
          <h2 className="text-center py-2">Submit Return</h2>
        </div>
        <div className="card-body p-4 bg-secondary">
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="row">
            <div className="col-12 mb-3">
              <div className="form-floating">
                <input
                  type="text"
                  name="returnReason"
                  className="form-control"
                  placeholder="Return Reason"
                  value={returnData.returnReason}
                  onChange={(e) => handleInputChange(e, setReturnData)}
                  required
                />
                <label>Return Reason</label>
              </div>
            </div>

            <div className="col-12 mb-3">
              <div className="form-floating">
                <input
                  type="text"
                  name="refundAmmount"
                  className="form-control"
                  disabled
                  value={returnData.refundAmmount}
                  onChange={(e) => handleInputChange(e, setReturnData)}
                  required
                />
                <label>Refundable Amount</label>
              </div>
            </div>
            <div className="col-12 mb-3">
              <label className="form-label text-muted">Comments</label>
              <textarea
                name="comments"
                className="form-control"
                rows="3"
                value={returnData.comments}
                onChange={(e) => handleInputChange(e, setReturnData)}
              ></textarea>
            </div>

            <div className="col-12 mb-3">
              <label className="form-label text-muted">Upload Photo Evidence</label>
              <input
                type="file"
                name="photoEvidence"
                className="form-control"
                onChange={(e) => handleFileChange(e, setReturnData)}
              />
            </div>

            <div className="col-6 col-md-3">
              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>
            </div>
            <div className="col-6 col-md-3">
              <Link to="/returns" className="btn btn-outline-primary w-100">
                Back to List
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReturnCreate;
