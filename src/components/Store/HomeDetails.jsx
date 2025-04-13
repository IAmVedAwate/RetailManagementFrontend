import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { handleGetSubmit } from '../../services/Services';
import axios from 'axios';

function HomeDetails() {
  const { prodId } = useParams();
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  // Fetch product details by prodId
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await handleGetSubmit(`api/admin/Product/productById/${prodId}`, "Product");
      setProduct(response.data.result);
    };
    fetchProduct();
  }, [prodId]);

  // Once product is loaded, fetch recommendations based on product name
  useEffect(() => {
    if (product) {
      const fetchRecommendations = async () => {
        try {
          const recResponse = await axios.get(`http://127.0.0.1:8000/recommend/${product.productName}`);
          const recommendedIds = recResponse.data.recommendations; // Array of product IDs
  
          // Fetch each recommended product's details concurrently
          const recProducts = await Promise.all(
            recommendedIds.map(async (id) => {
              const res = await handleGetSubmit(`api/admin/Product/productById/${id}`, "Product");
              return res.data.result;
            })
          );
          setRecommendations(recProducts);
        } catch (error) {
          console.error("Error fetching recommendations:", error.message);
        }
      };
      fetchRecommendations();
    }
  }, [product]);

  return (
    <div className="container mt-4">
      {product ? (
        <div className="card shadow border-0">
          <div className="card-header bg-dark bg-gradient text-light py-4">
            <div className="row">
              <div className="col-12 text-center">
                <h3 className="text-white text-uppercase">{product?.productName}</h3>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              {/* Image & Price Section */}
              <div className="col-12 col-lg-3 text-center mb-3">
                <img
                  src={product?.image || "https://placehold.co/300x200/png"}
                  alt={product?.productName}
                  className="img-fluid rounded"
                  style={{ maxHeight: '250px', objectFit: 'contain' }}
                />
                <button className="btn btn-outline-info mt-3 fw-bold text-warning fs-5">
                  <strong>MRP:</strong>{" "}
                  <span className="text-decoration-line-through text-black">
                    ₹{product.mrp}
                  </span>
                </button>
                <button className='btn btn-outline-info mt-1 fw-bold text-warning fs-5'>
                  <strong>Retail Price:</strong>{" "}
                  <span className='text-black'>
                    ₹{product.retailPrice}
                  </span>
                </button>
              </div>
              {/* Details Section */}
              <div className="col-12 col-lg-9">
                <h5 className="mb-3">
                  <button type="button" className="btn btn-outline-success">
                    {product.subCategory?.subCategoryName || "N/A"}
                  </button>
                </h5>
                <p><strong>Description:</strong></p>
                <div 
                  style={{ 
                    height: '60vh', 
                    overflowY: 'auto', 
                    border: '1px solid rgb(34, 34, 34)',
                    borderRadius: "18px",
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)', 
                    padding: '10px' 
                  }} 
                  dangerouslySetInnerHTML={{ __html: product.productDescription }}>
                </div>
                <Link to="/home/index" className="btn btn-outline-primary mt-3">
                  Back to Home
                </Link>
              </div>
            </div>
            {/* Recommendation Section */}
            {recommendations.length > 0 && (
              <>
                <h4 className="mt-4">Recommended Products</h4>
                <div className="row">
                  {recommendations.map((rec, idx) => (
                    <div className="col-lg-3 col-sm-6" key={idx}>
                      <div className="row p-2 m-2">
                        <div className="col-12 p-1">
                          <div className="card border-0 p-3 shadow border-top border-5 rounded">
                            <div className="d-flex justify-content-center">
                              <img 
                                src={rec.image || "https://placehold.co/300x200/png"} 
                                alt={rec.productName}
                                className="card-img-top rounded" 
                              />
                            </div>
                            <div className="card-body pb-0">
                              <div className="pl-1">
                                <p className="card-title h5 text-dark opacity-75 text-uppercase text-center">
                                  {rec.productName}
                                </p>
                                <p className="card-title text-warning text-center">
                                  by <b>{rec.subCategory?.subCategoryName || 'N/A'}</b>
                                </p>
                              </div>
                              <div className="pl-1">
                                <p className="text-dark text-opacity-75 text-center mb-0">
                                  List Price:
                                  <span className="text-decoration-line-through"> ₹{rec.mrp} </span>
                                </p>
                              </div>
                              <div className="pl-1">
                                <p className="text-dark text-opacity-75 text-center">
                                  As low as:
                                  <span> ₹{rec.retailPrice} </span>
                                </p>
                              </div>
                            </div>
                            <div>
                              <Link 
                                to={`/home/details/${rec.id}`} 
                                className="btn btn-primary bg-gradient border-0 form-control">
                                Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      ) : <></>}
    </div>
  );
}

export default HomeDetails;
