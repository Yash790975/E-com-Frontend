// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// const Navbar = () => {
//     const state = useSelector(state => state.handleCart)
//     return (
//         <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
//             <div className="container">
//                 <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">Y-Ecommerce</NavLink>
//                 <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>

//                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul className="navbar-nav m-auto my-2 text-center">
//                         <li className="nav-item">
//                             <NavLink className="nav-link" to="/">Home </NavLink>
//                         </li>
//                         <li className="nav-item">
//                             <NavLink className="nav-link" to="/product">Products</NavLink>
//                         </li>
//                         <li className="nav-item">
//                             <NavLink className="nav-link" to="/about">About</NavLink>
//                         </li>
//                         <li className="nav-item">
//                             <NavLink className="nav-link" to="/contact">Contact</NavLink>
//                         </li>
//                     </ul>
//                     <div className="buttons text-center">
//                         <NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
//                         <NavLink to="/register" className="btn btn-outline-dark m-2"><i className="fa fa-user-plus mr-1"></i> Register</NavLink>
//                         <NavLink to="/cart" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length}) </NavLink>
//                     </div>
//                 </div>


//             </div>
//         </nav>
//     )
// }

// export default Navbar


// Update the Navbar.jsx to include authentication conditionals

import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/action/authActions";

const Navbar = () => {
  const state = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
          🛒E-commerce
        </NavLink>
        <button
          className="navbar-toggler mx-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto my-2 text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
          <div className="buttons text-center">
            <NavLink to="/cart" className="btn btn-outline-dark m-2">
              <i className="fa fa-shopping-cart mr-1"></i> Cart ({state.length})
            </NavLink>
            {auth.isAuthenticated ? (
              <>
                <NavLink to="/profile" className="btn btn-outline-dark m-2">
                  <i className="fa fa-user mr-1"></i> Profile
                </NavLink>
                <button onClick={handleLogout} className="btn btn-outline-dark m-2">
                  <i className="fa fa-sign-out mr-1"></i> Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="btn btn-outline-dark m-2">
                  <i className="fa fa-sign-in mr-1"></i> Login
                </NavLink>
                <NavLink to="/register" className="btn btn-outline-dark m-2">
                  <i className="fa fa-user-plus mr-1"></i> Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;