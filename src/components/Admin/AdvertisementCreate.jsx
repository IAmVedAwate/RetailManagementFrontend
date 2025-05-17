import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleInputChange, handlePostSubmit, handleFileChange } from '../../services/Services';


function AdvertisementCreate() {
  const navigate = useNavigate();
  const targetAudienceOptions = [
    { id: 1, value: "Store", label: "Store" },
    { id: 2, value: "Retailer", label: "Retailer" },
    { id: 3, value: "Delivery", label: "Delivery" },
  ];

  const adLocationOptions = [
    { id: 1, value: "Home", label: "Home" },
    { id: 2, value: "Bill / Retailer", label: "Bill / Retailer" },
    { id: 3, value: "Login / Signup", label: "Login / Signup" },
  ];

  const [advertisementData, setAdvertisementData] = useState({
    adContent: '',
    targetAudience: '',
    dateExpiry: null,
    adLocation: '',
    file: null,
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const payload = new FormData();
      for (const key in advertisementData) {
        if (key === 'file' && advertisementData[key]) {
          payload.append(key, advertisementData[key]); // Attach file
        } else {
          payload.append(key, advertisementData[key]); // Attach other data
        }
      }
      await handlePostSubmit("api/admin/Advertisement", payload, "multipart/form-data", "Advertisement");
      navigate("/");
    } catch (error) {
      console.error('Error during Appending File:', error);
    }
  };

  return (
    <div className="container">
      <div
        className="card-header rounded-top-4 bg-gradient ml-0 p-3"
        style={{ backgroundColor: '#a3ffcb' }}
      >
        <h1>New Advertisement</h1>
      </div>
      <div className="card-body bg-secondary p-4">
        <form onSubmit={(e)=> handleSubmit(e)} method="post">
          <div
            className="border p-3 mt-4"
            style={{ backgroundColor: 'white', borderRadius: '20px 20px 20px 20px' }}
          >
            <div className="mb-3">
              <label className="mb-2">Ad Content: </label>
              <input
                name="adContent"
                value={advertisementData.adContent || ""}
                onChange={(e) => handleInputChange(e, setAdvertisementData)}
                className="form-control"
              />
            </div>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label className="mb-2">Target Audience: </label>
                  <select
                    name="targetAudience"
                    value={advertisementData.targetAudience}
                    onChange={(e) => handleInputChange(e, setAdvertisementData)}
                    className="form-select"
                  >
                    <option>--Select Audience--</option>
                    {targetAudienceOptions.map((option) => (
                      <option key={`targetAudienceId${option.id}`} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label className="mb-2">Ad Location: </label>
                  <select
                    name="adLocation"
                    value={advertisementData.adLocation}
                    onChange={(e) => handleInputChange(e, setAdvertisementData)}
                    className="form-select"
                  >
                    <option>--Select Location--</option>
                    {adLocationOptions.map((option) => (
                      <option key={`adLocationId${option.id}`} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="row">

              <div className="col-6">
                <div className="mb-3">
                  <label className="mb-2">Date Expiry: </label>
                  <input
                    type="date"
                    name="dateExpiry"
                    value={advertisementData.dateExpiry || ""}
                    onChange={(e) => handleInputChange(e, setAdvertisementData)}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label className="mb-2">Banner (700x200): </label>
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => handleFileChange(e, setAdvertisementData)}
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <button type="submit" className="btn btn-success form-control" style={{ width: '150px' }}>
                  Create
                </button>
              </div>
              <div className="col-6">
                <Link to="/advertisement/index" className="btn btn-secondary">
                  Back to the List
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdvertisementCreate;
