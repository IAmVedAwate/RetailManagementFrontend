import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StockForm from './StockForm';
import { setWarehouse } from '../../store/WarehouseSlice';
import { handleGetSubmit } from '../../services/Services';

function WarehouseIndex() {
  const dispatch = useDispatch();
  const warehouse = useSelector((state) => state.warehouse.warehouse);

  const fetchWarehouse = async () => {
    const response = await handleGetSubmit("api/Warehouse", "Warehouse");
    dispatch(setWarehouse(response.data.result));
  };

  useEffect(() => {
    fetchWarehouse();
  }, []);

  // Callback to refresh data after an action
  const handleActionComplete = () => {
    fetchWarehouse(); // Re-fetch the updated warehouse data
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-1"></div>
        <div className="col-md-10 py-3 px-2 rounded" style={{ backgroundColor: "white" }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-bold">Products List To Select</h5>
            <div>
              <button className="btn btn-primary me-2">Search <i className="bi bi-search"></i></button>
              <button className="btn btn-secondary">Filters <i className="bi bi-funnel"></i></button>
            </div>
          </div>
          <div className="row g-3">
            {warehouse.map((entity) => (
              <StockForm
                key={entity.id}
                id={entity.id}
                proId={entity.product.id}
                disabled={true}
                showOrHide={true}
                indexPage={true}
                warehouseEntity={entity}
                onActionComplete={handleActionComplete} // Pass callback to StockForm
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WarehouseIndex;
