import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { setAdvertisements } from '../../store/AdvertisementSlice';
import { handleFileChange, handleGetSubmit, handleInputChange, handlePutSubmit } from '../../services/Services';

function AdvertisementEdit() {

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


  const { advertisementid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const advertisements = useSelector((state) => state.advertisements.advertisements);

  const [advertisementData, setAdvertisementData] = useState({
    adContent: '',
    targetAudience: '',
    dateExpiry: null,
    adLocation: '',
    file: null,
  });

  useEffect(() => {
    // Check if categories exist in Redux
    if (advertisementData.length > 0) {
      const selectedAdvertisement = advertisements.find((ad) => ad.id === parseInt(advertisementid));
      if (selectedCategory) {
        const data = {
          adContent: selectedAdvertisement.adContent,
          targetAudience: selectedAdvertisement.targetAudience,
          dateExpiry: selectedAdvertisement.dateExpiry,
          adLocation: selectedAdvertisement.adLocation,
          file: null,
        }
        setAdvertisementData(data);
      }
    } else {
      // Fetch categories if Redux store is empty
      const fetchAdvertisement = async (e) => {
        try {
          const response = await handleGetSubmit("api/admin/Advertisement", "Advertisement");

          if (response.data.isSuccess) {
            dispatch(setAdvertisements(response.data.result));
            const selectedAdvertisement = response.data.result.find((ad) => ad.id === parseInt(advertisementid));
            if (selectedAdvertisement) {
              const data = {
                adContent: selectedAdvertisement.adContent,
                targetAudience: selectedAdvertisement.targetAudience,
                dateExpiry: `${selectedAdvertisement.dateExpiry}`.split("T")[0],
                adLocation: selectedAdvertisement.adLocation,
                file: null,
              }
              setAdvertisementData(data);
            }
          }
        } catch (error) {
          console.error('Error during Category Fetch:', error);
          alert('Failed to fetch categories.');
        }
      };

      fetchAdvertisement();
    }
  }, [dispatch]);

  const handleEdit = async (e) => {
    e.preventDefault();
    console.error(advertisementData);
    try {
      const payload = new FormData();
      for (const key in advertisementData) {
        if (key === 'file' && advertisementData[key]) {
          payload.append(key, advertisementData[key]); // Attach file
        } else {
          payload.append(key, advertisementData[key]); // Attach other data
        }
      }
      await handlePutSubmit(`api/Admin/Advertisement/${advertisementid}`, payload, "multipart/form-data", "Advertisement")
      navigate("/advertisement/index");
    } catch (error) {
      console.error('Error during Appending Advertisement Data:', error);
      alert("Error When Appending Advertisement data!");
    }
  };
  return (
    <>
      <div className="container">
        <div className="card-header rounded-top-4 bg-gradient ml-0 p-3" style={{ backgroundColor: "#a3ffcb" }}>
          <h1>Edit Advertisement</h1>
        </div>
        <div className="card-body bg-secondary p-4">
          <form onSubmit={handleEdit}>
            <div className="border p-3 mt-4" style={{ backgroundColor: "white", borderRadius: "20px 20px 20px 20px" }}>
              <div className="text-primary"></div>
              <div className="mb-3">
                <label className="mb-2">Ad Content: </label>
                <input
                  className="form-control"
                  name="adContent"
                  defaultValue={advertisementData.adContent}
                  onChange={(e) => handleInputChange(e, setAdvertisementData)}

                />
                <span className="text-danger"></span>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="mb-3">
                    <label className="mb-2">Target Audience: </label>
                    <select className="form-select"
                      name="targetAudience"
                      value={advertisementData.targetAudience || ""}
                      onChange={(e) => handleInputChange(e, setAdvertisementData)}
                    >
                      {targetAudienceOptions.map((option) => (
                        <option key={`targetAudienceId${option.id}`} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <span className="text-primary"></span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="mb-2">Ad Location: </label>
                    <select className="form-select"
                      name="adLocation"
                      value={advertisementData.adLocation || ""}
                      onChange={(e) => handleInputChange(e, setAdvertisementData)}
                    >
                      {adLocationOptions.map((option) => (
                        <option key={`adLocationId${option.id}`} {...option.label == advertisementData.adLocation ? "selected" : ""} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <span className="text-primary"></span>
                  </div>
                </div>
              </div>




              <div className="row">

                <div className="col-6">
                  <div className="mb-3">
                    <label className="mb-2">Date Expiry: </label>
                    <input className="form-control"
                      onClick={(e) => e.target.type = "date"}
                      name="dateExpiry"
                      defaultValue={advertisementData.dateExpiry}
                      onChange={(e) => handleInputChange(e, setAdvertisementData)}
                    />
                    <span className="text-danger"></span>
                  </div>
                </div>

                <div className="col-6">
                  <div className="mb-3">
                    <label className="mb-2">Banner (700x200) : </label>
                    <input type="file" name="file" className="form-control"
                      onChange={(e) => handleFileChange(e, setAdvertisementData)}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <button type="submit" className="btn btn-success form-control" style={{ width: "150px" }}>Edit</button>
                </div>
                <div className="col-6">
                  <Link to={"/advertisement/index"} className="btn btn-secondary"  >Back to the List </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>

  )
}

export default AdvertisementEdit



