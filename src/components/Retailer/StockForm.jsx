import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleDeleteSubmit, handlePutSubmit } from '../../services/Services';

function StockForm({ id, proId, disabled, indexPage, onActionComplete }) {
  const dispatch = useDispatch();
  const warehouse = useSelector((state) => state.warehouse.warehouse);

  // Directly derive the warehouse entity from Redux on every render
  const warehouseEntity = warehouse.find((war) => war.id === parseInt(id));

  const [disableOrNot, setDisableOrNot] = useState(disabled);
  const [showOrHide, setShowOrHide] = useState(indexPage);

  const [stockData, setStockData] = useState({
    productId: 0,
    quantity: 0,
    marginPercentage: 0,
    isReturnable: true,
  });

  // Whenever the warehouse entity changes, update the stockData
  useEffect(() => {
    if (warehouseEntity && warehouseEntity.product) {
      setStockData({
        productId: warehouseEntity.product.id,
        quantity: warehouseEntity.quantity,
        marginPercentage: warehouseEntity.marginPercentage,
        isReturnable: warehouseEntity.isReturnable,
      });
    }
  }, [warehouseEntity]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStockData((prev) => ({
      ...prev,
      [name]: name === 'isReturnable' ? value === 'true' : +value, // Convert types appropriately
    }));
  };

  const incrementQuantity = () => {
    setStockData((prev) => ({
      ...prev,
      quantity: prev.quantity + 1,
    }));
  };

  const decrementQuantity = () => {
    setStockData((prev) => ({
      ...prev,
      quantity: prev.quantity > 0 ? prev.quantity - 1 : 0, // Prevent negative values
    }));
  };

  const handleEdit = async (editId) => {
    try {
      await handlePutSubmit(`api/Warehouse/${editId}`, stockData, 'application/json',"Warehouse");
      if (onActionComplete) onActionComplete(); // This triggers a re-fetch in WarehouseIndex
    } catch (error) {
      console.error('Error updating warehouse:', error);
      alert('Error when updating warehouse.');
    }
  };

  const handleDelete = async (deleteId)=>{
    try {
        await handleDeleteSubmit(`api/Warehouse/${deleteId}`,"Warehouse");
        if (onActionComplete) onActionComplete(); // This triggers a re-fetch in WarehouseIndex
        } catch (error) {
          console.error('Error deleting warehouse:', error);
          alert('Error when deleting warehouse.');
        }
  }

  return (
    <>
      <div className="col-12" id={proId}>
        <div className="card bg-secondary shadow-sm">
          <div className="row g-0 align-items-center">
            <div className="col-md-3 p-2 text-center" style={{ height: '150px'}}>
              <img src={warehouseEntity.product.image}
                className="img-responsive" style={{maxHeight: "100%",
                  width: "auto"}}
              >
              </img>
            </div>
            <div className="col-md-3 p-3">
              <p className="mb-1">
                <strong>{warehouseEntity?.product.productName}</strong>
              </p>
            </div>
            <div className="col-2">
              <div className="d-flex align-items-center">
                {showOrHide ? (
                  <>Quantity: </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={decrementQuantity}
                      className="btn btn-outline-primary rounded py-1 px-3"
                    >
                      <i className="bi bi-dash-square"></i>
                    </button>
                    <button
                      type="button"
                      onClick={incrementQuantity}
                      className="btn btn-outline-primary rounded py-1 px-3"
                    >
                      <i className="bi bi-plus-square"></i>
                    </button>
                  </>
                )}
                <input
                  onChange={handleInputChange}
                  disabled={disableOrNot}
                  value={stockData.quantity}
                  type="text"
                  name="quantity"
                  className="form-control mx-1"
                  style={{ width: '60px' }}
                />
              </div>
            </div>
            <div className="col-1">
              <div className="mb-3">
                <label className="mb-2">Margin: </label>
                <input
                  onChange={handleInputChange}
                  disabled={disableOrNot}
                  type="text"
                  name="marginPercentage"
                  value={stockData.marginPercentage}
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-1">
              <div className="mb-3">
                <label className="mb-2">IsReturnable: </label>
                <select
                  onChange={handleInputChange}
                  disabled={disableOrNot}
                  name="isReturnable"
                  className="form-select"
                >
                  {showOrHide ? (
                    <option value={stockData.isReturnable}>
                      {stockData.isReturnable ? 'YES' : 'NO'}
                    </option>
                  ) : (
                    <>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </>
                  )}
                </select>
              </div>
            </div>
            {showOrHide ? (
              <div className="col-md-2 text-center">
                <button
                  onClick={() => {
                    setDisableOrNot(false);
                    setShowOrHide(false);
                  }}
                  className="btn btn-outline-success px-3 py-1 m-1"
                >
                  <i className="bi bi-pen"></i>
                </button>
                <button onClick={()=> handleDelete(id)} className="btn btn-outline-danger px-3 py-1">
                  <i className="bi bi-trash3-fill"></i>
                </button>
              </div>
            ) : (
              <div className="col-md-2 p-3 text-center">
                <>
                <button
                  onClick={() => {
                    handleEdit(id);
                    setDisableOrNot(true);
                    setShowOrHide(true);
                }}
                  className="btn btn-success px-3 py-1 m-1"
                >
                  <i className="bi bi-pen"></i>
                </button>
                <button 
                onClick={()=>{
                    setDisableOrNot(true);
                    setShowOrHide(true);
                    setStockData({
                        productId: warehouseEntity?.product.id,
                        quantity: warehouseEntity.quantity,
                        marginPercentage: warehouseEntity.marginPercentage,
                        isReturnable: warehouseEntity.isReturnable,
                      })
                }}
                className="btn btn-primary px-3 py-1">
                <i className="bi bi-arrow-right"></i>
                </button>
                  </>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default StockForm;
