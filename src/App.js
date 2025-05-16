// src/App.js
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/action/authActions";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(loadUser()); }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/"        element={<Home />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/about"   element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart"    element={<Cart />} />
        <Route path="/login"   element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile"  element={<Profile />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;


// import React, { useEffect } from "react";
// import { Routes, Route } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { loadUser } from "./redux/action/authActions";

// import Home from "./pages/Home";
// import Products from "./pages/Products";
// import Product from "./pages/Product";
// import AboutPage from "./pages/AboutPage";
// import ContactPage from "./pages/ContactPage";
// import Cart from "./pages/Cart";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Checkout from "./pages/Checkout";
// import PageNotFound from "./pages/PageNotFound";
// import Profile from "./components/Profile";
// import PrivateRoute from "./components/PrivateRoute";
// import PublicRoute from "./components/PublicRoute";

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(loadUser());
//   }, [dispatch]);

//   return (
//     <Routes>
//       {/* Public routes */}
//       <Route element={<PublicRoute />}>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//       </Route>

//       {/* Private routes */}
//       <Route element={<PrivateRoute />}>
//         <Route path="/" element={<Home />} />
//         <Route path="/product" element={<Products />} />
//         <Route path="/product/:id" element={<Product />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/contact" element={<ContactPage />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/checkout" element={<Checkout />} />
//         <Route path="/profile" element={<Profile />} />
//       </Route>

//       <Route path="*" element={<PageNotFound />} />
//     </Routes>
//   );
// }

// export default App;
