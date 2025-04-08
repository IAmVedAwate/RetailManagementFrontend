import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleGetSubmit } from '../../services/Services';
import { setProducts } from '../../store/ProductSlice';

function HomeIndex() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);

    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await handleGetSubmit(`api/admin/Product/random`, "Product");            
                
                if (response.data.isSuccess) dispatch(setProducts(response.data.result));
            } catch (error) {
                console.error("An error occurred while fetching Products:", error.message);
            }
        };
        fetchProducts();
    }, [dispatch]);

    return (
        <div className="container-fluid">
          <div className="row pb-3">
            {products && products.map((product) => (
              <div className="col-lg-3 col-sm-6" key={product.id}>
                <div className="row p-2 m-2">
                  <div className="col-12 p-1">
                    <div className="card border-0 p-3 shadow border-top border-5 rounded">
                      <div className="d-flex justify-content-center">
                        <img 
                          src={product.image || 'https://placehold.co/300x200/png'} 
                          alt={product.productName} 
                          className="card-img-top rounded" 
                        />
                      </div>
                      <div className="card-body pb-0">
                        <div className="pl-1">
                          <p className="card-title h5 text-dark opacity-75 text-uppercase text-center">
                            {product.productName}
                          </p>
                          <p className="card-title text-warning text-center">
                            by <b>{product.subCategory?.subCategoryName || 'N/A'}</b>
                          </p>
                        </div>
                        <div className="pl-1">
                          <p className="text-dark text-opacity-75 text-center mb-0">
                            List Price:
                            <span className="text-decoration-line-through"> {product.mrp} </span>
                          </p>
                        </div>
                        <div className="pl-1">
                          <p className="text-dark text-opacity-75 text-center">
                            As low as: <span>{product.retailPrice}</span>
                          </p>
                        </div>
                      </div>
                      <div>
                        <button 
                          className="btn btn-primary bg-gradient border-0 form-control" 
                          onClick={()=>{ navigate(`/home/details/${product.id}`) }}>
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      
}

export default HomeIndex;




