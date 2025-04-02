import React, { useState } from 'react';

const DeliveryUserForm = ({onChange}) => {

  const [storeData, setStoreData] = useState({
    adhar: "",
    address: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStoreData((prev) => ({ ...prev, [name]: value }));
    onChange({ ...storeData, [name]: value });
  };

  const handleFileChange = (e) => {
    setStoreData((prev) => ({ ...prev, photoOfStore: e.target.files[0] }));
    onChange({ ...storeData, photoOfStore: e.target.files[0] });
  };

  return (
    <div >

      <form>
        <div className="row py-3">

          <div className="col-4">
            <div className="mb-3">
              <label className="mb-2">Aadhar Card No.: </label>
              <input type='text' className="form-control" 
              name='adhar'
              onChange={handleInputChange}
              />
              <span className="text-danger"></span>
            </div>
          </div>
          <div className="col-8">
            <div className="mb-3">
              <label className="mb-2">Address: </label>
              <input type='text' className="form-control" 
              name='address'
              onChange={handleInputChange}
              />
              <span className="text-danger"></span>
            </div>
          </div>
        </div>
          <br />
          <br />
      </form>
    </div>
  );
};

export default DeliveryUserForm;
