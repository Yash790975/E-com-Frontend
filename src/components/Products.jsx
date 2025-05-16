import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { useNavigate } from "react-router-dom";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingProduct, setPendingProduct] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);
  const isMounted = useRef(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check if user is logged in
  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  // Add to cart handler with authentication check
  const handleAddToCart = (product) => {
    if (isAuthenticated()) {
      dispatch(addCart(product));
      toast.success("Added to cart");
    } else {
      setPendingProduct(product);
      setPendingAction("cart");
      setShowAuthModal(true);
    }
  };

  // Buy now handler with authentication check
  const handleBuyNow = (productId) => {
    if (isAuthenticated()) {
      navigate(`/product/${productId}`);
    } else {
      setPendingProduct({ id: productId });
      setPendingAction("buy");
      setShowAuthModal(true);
    }
  };

  // Auth Modal close handler
  const closeAuthModal = () => {
    setShowAuthModal(false);
    setPendingProduct(null);
    setPendingAction(null);
  };

  // Navigate to login/register
  const navigateToAuth = (path) => {
    // Store pending action in localStorage for retrieval after login/register
    if (pendingProduct && pendingAction) {
      localStorage.setItem("pendingProductId", pendingProduct.id);
      localStorage.setItem("pendingAction", pendingAction);
    }
    navigate(path);
  };

  // Fetch products
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products/");
        const products = await response.json();

        if (isMounted.current) {
          setData(products);
          setFilter(products);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
        toast.error("Failed to load products");
      }
    };

    getProducts();

    return () => {
      isMounted.current = false;
    };
  }, []);

  // Check for pending actions after login/register
  useEffect(() => {
    if (data.length === 0) return; // Skip if products aren't loaded yet
    
    const pendingProductId = localStorage.getItem("pendingProductId");
    const pendingAction = localStorage.getItem("pendingAction");
    
    if (isAuthenticated() && pendingProductId && pendingAction) {
      if (pendingAction === "buy") {
        navigate(`/product/${pendingProductId}`);
      } else if (pendingAction === "cart") {
        const product = data.find(p => p.id === parseInt(pendingProductId));
        if (product) {
          dispatch(addCart(product));
          toast.success("Added to cart");
        }
      }
      
      // Clear pending actions
      localStorage.removeItem("pendingProductId");
      localStorage.removeItem("pendingAction");
    }
  }, [data, dispatch, navigate]);

  // Filter products by category
  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  // Loading skeleton
  const Loading = () => (
    <>
      <div className="col-12 py-5 text-center">
        <Skeleton height={40} width={560} />
      </div>
      {[...Array(6)].map((_, index) => (
        <div className="col-md-4 col-sm-6 col-12 mb-4" key={index}>
          <Skeleton height={592} />
        </div>
      ))}
    </>
  );

  // Authentication Modal
  const AuthModal = () => (
    <>
      <div className="modal fade show" style={{ display: showAuthModal ? 'block' : 'none' }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Authentication Required</h5>
              <button type="button" className="btn-close" onClick={closeAuthModal}></button>
            </div>
            <div className="modal-body">
              <p>Please login or register to {pendingAction === 'cart' ? 'add products to your cart' : 'purchase products'}.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigateToAuth('/login')}
              >
                Login
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigateToAuth('/register')}
              >
                Register
              </button>
              <button type="button" className="btn btn-light" onClick={closeAuthModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      {showAuthModal && <div className="modal-backdrop fade show"></div>}
    </>
  );

  // Show all products
  const ShowProducts = () => (
    <>
      <div className="buttons text-center py-5 w-100">
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => setFilter(data)}>
          All
        </button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("men's clothing")}>
          Men's Clothing
        </button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("women's clothing")}>
          Women's Clothing
        </button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("jewelery")}>
          Jewelery
        </button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("electronics")}>
          Electronics
        </button>
      </div>

      {filter.map((product) => (
        <div key={product.id} className="col-md-4 col-sm-6 col-12 mb-4">
          <div className="card text-center h-100">
            <img
              className="card-img-top p-3"
              src={product.image}
              alt={product.title}
              height={300}
            />
            <div className="card-body">
              <h5 className="card-title">{product.title.substring(0, 12)}...</h5>
              <p className="card-text">{product.description.substring(0, 90)}...</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item lead">${product.price}</li>
            </ul>
            <div className="card-body">
              <button 
                className="btn btn-dark m-1" 
                onClick={() => handleBuyNow(product.id)}
              >
                Buy Now
              </button>
              <button 
                className="btn btn-dark m-1" 
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12">
          <h2 className="display-5 text-center">Latest Products</h2>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center">
        {loading ? <Loading /> : <ShowProducts />}
      </div>
      <AuthModal />
    </div>
  );
};

export default Products;