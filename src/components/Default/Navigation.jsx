import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // [CHANGE] Import useSelector & useDispatch
import { setToken, setRole } from '../../store/AuthSlice'; // [CHANGE] Import logout actions if needed
import BillListInNav from '../Store/BillListInNav';

function Navigation() {
  const navigate = useNavigate();
  // [CHANGE] Get token and role from Redux store
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();

  // [CHANGE] Logout function: clears token/role and localStorage
  const handleLogout = () => {
    dispatch(setToken(null));
    dispatch(setRole(null));
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
        <div className="container-fluid">
          <a className="navbar-brand">RMS</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target=".navbar-collapse"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
            <ul className="navbar-nav flex-grow-1 fw-bold">
              <li className="nav-item">
                <Link to={"/home/index"} className="nav-link text-dark">
                  Home
                </Link>
              </li>

              {/* [CHANGE] Render menu items based on the role */}
              {role === 'admin' && (
                <>
                  <li className="nav-item dropdown">
                    <div
                      className="nav-link text-dark dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Content Management
                    </div>
                    <ul className="dropdown-menu" aria-labelledby="">
                      <li>
                        <Link to={"/category/index"} className="dropdown-item text-dark">
                          Manage Category
                        </Link>
                      </li>
                      <li>
                        <Link to={"/subcategory/index"} className="dropdown-item text-dark">
                          Manage SubCategory
                        </Link>
                      </li>
                      <li>
                        <Link to={"/product/index"} className="dropdown-item text-dark">
                          Manage Product
                        </Link>
                      </li>
                      <li>
                        <Link to={"/advertisement/index"} className="dropdown-item text-dark">
                          Manage Advertisements
                        </Link>
                      </li>
                      <li>
                        <a className="dropdown-item text-dark">Manage Feedbacks</a>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              {role === 'store' && (
                <>
                  <li className="nav-item">
                    <Link to={"/bill/create"} className="nav-link text-dark">
                      Create New Bill
                    </Link>
                  </li>
                  {/* [CHANGE] Show BillListInNav for store role */}
                  <BillListInNav />
                </>
              )}

              {role === 'retailer' && (
                <>
                  <li className="nav-item">
                    <Link to={"/warehouse/index"} className="nav-link text-dark">
                      Manage Warehouse
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/warehouse/edit"} className="nav-link text-dark">
                      Edit Warehouse
                    </Link>
                  </li>
                </>
              )}

              {role === 'delivery' && (
                <>
                  <li className="nav-item dropdown">
                    <div
                      className="nav-link text-dark dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Manage Deliveries
                    </div>
                    <ul className="dropdown-menu" aria-labelledby="">
                      <li>
                        <Link to={"/delivery/index"} className="dropdown-item text-dark">
                          Available Deliveries
                        </Link>
                      </li>
                      <li>
                        <Link to={"/delivery/details"} className="dropdown-item text-dark">
                          Accepted Delivery
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
            <div>
              {/* [CHANGE] Conditionally render Logout if logged in; else show Register/Login */}
              {token ? (
                <button onClick={handleLogout} className="btn btn-outline-danger">
                  Logout
                </button>
              ) : (
                <>
                  <Link to={"/create/account"} className="btn btn-outline-primary ms-auto me-1">
                    Register
                  </Link>
                  <Link to={"/login"} className="btn btn-outline-success ms-auto">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navigation;
