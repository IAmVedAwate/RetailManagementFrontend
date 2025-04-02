import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { setAdvertisements } from '../../store/AdvertisementSlice';
import { handleGetSubmit, handleDeleteSubmit } from '../../services/Services';

function AdvertisementDelete() {

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
                    dateExpiry: `${selectedAdvertisement.dateExpiry}`.split("T")[0],
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

    const handleDelete = async ()=>{
        await handleDeleteSubmit(`api/Admin/Advertisement/${advertisementid}`,"Advertisement");
        navigate("/advertisement/index");
    }

    return (
        <>
            <div className="container">
                <div className="card-header rounded-top-4 bg-gradient ml-0 p-3" style={{ backgroundColor: "#ffa3a3" }}>
                    <h1>Delete Advertisement</h1>
                </div>
                <div className="card-body bg-secondary p-4">
                    <form onSubmit={handleDelete}>
                        <div className="border p-3 mt-4" style={{ backgroundColor: "white", borderRadius: "20px 20px 20px 20px" }}>
                            <div className="mb-3">
                                <label className="mb-2">Ad Content: </label>
                                <input disabled defaultValue={advertisementData.adContent} className="form-control" />
                                <span className="text-danger"></span>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label className="mb-2">Target Audience: </label>
                                        <select disabled defaultValue={advertisementData.targetAudience} className="form-select">
                                            <option disabled>{advertisementData.targetAudience}</option>
                                        </select>
                                        <span className="text-primary"></span>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label className="mb-2">Ad Location: </label>
                                        <select disabled defaultValue={advertisementData.adLocation} className="form-select">
                                            <option disabled>{advertisementData.adLocation}</option>
                                        </select>
                                        <span className="text-primary"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                
                                <div className="col-6">
                                    <div className="mb-3">
                                        <label className="mb-2">Date Expiry: </label>
                                        <input disabled defaultValue={advertisementData.dateExpiry} className="form-control" />
                                        <span className="text-danger"></span>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <button type="submit" className="btn btn-primary form-control" style={{ width: "150px" }}>Delete</button>
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

export default AdvertisementDelete




