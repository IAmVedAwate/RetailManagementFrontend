import React, { useState } from 'react';

const StoreUserForm = ({ onChange }) => {
  const [storeData, setStoreData] = useState({
    storeName: "",
    address: "",
    gstNumber: "",
    photoOfStore: null,
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

          <div className="col-8">
            <div className="mb-3">
              <label className="mb-2">Store Name: </label>
              <input type='text' className="form-control"
              name="storeName"
              onChange={handleInputChange} />
              <span className="text-danger"></span>
            </div>
          </div>
          <div className="col-4">
          <div className="mb-3">
              <label className="mb-2">GST Number: </label>
              <input type='text' className="form-control"
              name="gstNumber"
              onChange={handleInputChange} />
              <span className="text-danger"></span>
            </div>
          </div>
        </div>
        <div className="row">

          <div className="col-8">
          <div className="mb-3">
          <label className="mb-2">Address: </label>
          <input type='text' className="form-control"
          name="address"
          onChange={handleInputChange} />
          <span className="text-danger"></span>
        </div>
          </div>
          <div className="col-4">
            <div div className="mb-3">
              <label  className="mb-2">Photo Of Store: </label>
              <input type="file" name="photoOfStore" className="form-control" 
              onChange={handleFileChange}/>
            </div>
          </div>
        </div>
          <br />
          <br />
      </form>
    </div>
  );
};

export default StoreUserForm;
