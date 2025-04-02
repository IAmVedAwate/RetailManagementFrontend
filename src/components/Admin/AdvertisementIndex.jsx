import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { setAdvertisements } from '../../store/AdvertisementSlice';
import { handleGetSubmit } from '../../services/Services';

function AdvertisementIndex() {
    const dispatch = useDispatch();
  const advertisements = useSelector((state) => state.advertisements.advertisements);

  useEffect(() => {
    const fetchAdvertisement = async (e) => {
      try {
        const response = await handleGetSubmit("api/admin/Advertisement","Advertisement");
        if(response.data.isSuccess) dispatch(setAdvertisements(response.data.result));
      } catch (error) {
        console.error("An error occurred while fetching categories:", error.message);
      }
    };

    fetchAdvertisement();
  }, [dispatch]);

    return (

        <div className="container">
            <div className="card-header rounded-top-4 bg-gradient ml-0 p-3" style={{ backgroundColor: "#a3dcff" }}>

                <div className="row">
                    <div className="col-6">
                        <h1>Advertisement List</h1>
                    </div>
                    <div className="col-6 text-end">

                        <Link to={"/advertisement/create"} className="btn btn-success">Add New Advertisement</Link>
                    </div>
                </div>
            </div>
            <div className="card-body bg-white p-4">

                <div className="row">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>
                                    Ad Content
                                </th>
                                <th>
                                    Target Audience
                                </th>
                                <th>
                                    Ad Location
                                </th>
                                <th>
                                    Date Posted
                                </th>
                                <th>
                                    Date Expiry
                                </th>
                                <th>
                                    Banner (700x200)
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {advertisements.map((ad) => (
                            <tr key={`adIndex${ad.id}`}>
                                <td>
                                    {ad.adContent}
                                </td>
                                <td>
                                    {ad.targetAudience}
                                </td>
                                <td>
                                    {ad.adLocation}
                                </td>
                                <td>
                                    {`${ad.datePosted}`.split("T")[0]}
                                </td>
                                <td>
                                    {`${ad.dateExpiry}`.split("T")[0]}
                                </td>
                                <td>
                                    <img style={{height:"100px"}} src={`${ad.bannerImgPath}?sp=r&st=2024-11-27T07:15:42Z&se=2024-12-27T15:15:42Z&spr=https&sv=2022-11-02&sr=c&sig=XIXVVd3AOXxwitc2N%2Flcn6Lu4lM90bzl6ttgWFboouk%3D`} alt="" />
                                </td>
                                <td style={{ width: "160px" }} className="text-center">
                                    <Link to={`/advertisement/edit/${ad.id}`} className="btn btn-danger px-3 mx-2"><i className="bi bi-plus-circle-fill"></i></Link>
                                    <Link to={`/advertisement/delete/${ad.id}`} className="btn btn-primary px-3 mx-2"><i className="bi bi-trash-fill"></i></Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default AdvertisementIndex
