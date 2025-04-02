import React from "react";

const AdvertisementPage = () => {
    return (
        <div className="container mt-5">
            {/* Advertisement Banner */}
            <div className="mb-4">
                <div className="p-4 text-center bg-primary text-light rounded">
                    <h1>Welcome to Our Rental System!</h1>
                    <p className="lead">
                        Discover the best rental deals and exclusive recommendations tailored just for you.
                        Check out our top-rated products and services now!
                    </p>
                    <button className="btn btn-warning btn-lg mt-2">Explore Now</button>
                </div>
            </div>

            {/* Additional Advertisement Content */}
            <div className="row mb-5">
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm">
                        <img src="https://via.placeholder.com/500x250" className="card-img-top" alt="Ad 1" />
                        <div className="card-body text-center">
                            <h5 className="card-title">Special Offer on Furniture Rentals</h5>
                            <p className="card-text">Get up to 20% off on premium furniture rentals. Limited time only!</p>
                            <a href="#" className="btn btn-primary">Learn More</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm">
                        <img src="https://via.placeholder.com/500x250" className="card-img-top" alt="Ad 2" />
                        <div className="card-body text-center">
                            <h5 className="card-title">Exclusive Electronics Rentals</h5>
                            <p className="card-text">Rent the latest gadgets and appliances at unbeatable prices.</p>
                            <a href="#" className="btn btn-primary">Shop Now</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Admin Section: Create New Category */}
            <div className="border p-3 mt-4">
                <h2 className="text-center mb-3">Create a New Rental Category</h2>
                <form method="post">
                    <div className="mb-3">
                        <label htmlFor="categoryName" className="form-label">Category Name:</label>
                        <input id="categoryName" className="form-control" type="text" placeholder="Enter category name" />
                        <span className="text-danger"></span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="displayOrder" className="form-label">Display Order:</label>
                        <input id="displayOrder" className="form-control" type="number" placeholder="Enter display order" />
                        <span className="text-danger"></span>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <button type="submit" className="btn btn-success form-control">Create</button>
                        </div>
                        <div className="col-md-6">
                            <a href="/category/index" className="btn btn-secondary form-control">Back to the List</a>
                        </div>
                    </div>
                </form>
            </div>

            {/* Footer Section */}
            <footer className="bg-dark text-light text-center py-3 mt-5">
                <p>&copy; 2024 Rental System. All Rights Reserved.</p>
                <small>Visit us again for the best deals and services!</small>
            </footer>
        </div>
    );
};

export default AdvertisementPage;
