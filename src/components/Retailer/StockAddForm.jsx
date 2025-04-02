import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetSubmit, handlePostSubmit, handlePutSubmit } from '../../services/Services';

function StockAddForm({ id, countAdj ,onActionComplete }) {
  const dispatch = useDispatch();
  const [warId, setWarId] = useState(0);
  const [Added, setAdded] = useState(false);
  
  const products = useSelector((state) => state.products.products);
  const [stockData, setStockData] = useState({
    productId: id,
    quantity: 0,
    marginPercentage: 0,
    isReturnable: true,
  });
  const [productEntity, setProductEntity] = useState(products.find((pro) => pro.id === parseInt(id)));

  useEffect(() => {
    const wareHouseUpdate = async (id)=>{
      const response = await handleGetSubmit(`api/Warehouse`, "Warehouse");            
      let allWarehouse = response.data.result;
      allWarehouse.forEach(warehouse => {
        if(warehouse.product.id == id){
          setStockData(
            {
              productId: id,
              quantity: warehouse.quantity,
              marginPercentage: warehouse.marginPercentage,
              isReturnable: warehouse.isReturnable,
            }
          );
          setWarId(warehouse.id);
          setAdded(true);
        }
      });
    }
    wareHouseUpdate(id);
    
  }, [])
  
  


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStockData((prev) => ({
      ...prev,
      [name]: name === 'isReturnable' ? value == 'true' : +value,
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

  const handleAdd = async () => {
    try {
        if(warId != 0){
          await handlePutSubmit(`api/Warehouse/${warId}`, JSON.stringify(stockData), 'application/json', "Warehouse");
        }
        else{
          const response = await handlePostSubmit(`api/Warehouse`, JSON.stringify(stockData), 'application/json', "Warehouse");
          setWarId(response.data.result.id);
        }
        setAdded(true);
        countAdj(warId+1);
      } catch (error) {
        console.error('Error updating warehouse:', error);
        alert('Error when updating warehouse.');
      }
  };

  
  return (
    <>
      <div className="col-12" id={id}>
        <div className="card bg-secondary shadow-sm">
          <div className="row g-0 align-items-center">
            <div className="col-md-3 p-2 text-center" style={{ height: '150px'}}>
              <img src={productEntity.image}
                className="img-responsive" style={{maxHeight: "100%",
                  width: "auto"}}
              >
              </img>
            </div>
            <div className="col-md-3 p-3">
              <p className="mb-1">
                <strong>{productEntity.productName}</strong>
              </p>
            </div>
            <div className="col-2">
              <div className="d-flex align-items-center">
                
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
                <input
                  onChange={handleInputChange}
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
                  name="isReturnable"
                  className="form-select"
                  value={stockData.isReturnable}
                >
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                </select>
              </div>
            </div>
            
              <div className="col-md-2 p-3 text-center">
                  {Added ? 
                  <button onClick={handleAdd} className="btn btn-success">Update</button>:
                  <button onClick={handleAdd} className="btn btn-danger">Add</button>}
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StockAddForm;
