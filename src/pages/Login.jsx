// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Footer, Navbar } from "../components";
// import axios from "axios";
// import { Modal, Button } from "react-bootstrap";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [showErrorModal, setShowErrorModal] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState("");
//   const navigate = useNavigate();

//   const { email, password } = formData;

//   // Check if user is already logged in
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const user = JSON.parse(localStorage.getItem("user") || "{}");
    
//     if (token && user) {
//       setIsLoggedIn(true);
//       setUserName(user.name || user.username || user.email || "User");
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setIsLoggedIn(false);
//     setUserName("");
//     // Show a quick logout message
//     setError("You have been logged out successfully.");
//     setTimeout(() => setError(""), 3000);
//   };

//   const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//   // Close modals
//   const handleCloseSuccessModal = () => {
//     setShowSuccessModal(false);
//     navigate("/");
//   };

//   const handleCloseErrorModal = () => {
//     setShowErrorModal(false);
//   };

//   const onSubmit = async e => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json"
//         }
//       };

//       const body = JSON.stringify({ email, password });
//       const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

//       const res = await axios.post(`${apiUrl}/api/login`, body, config);

//       // Save token and user to localStorage
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       setLoading(false);
      
//       // Show success modal instead of immediate redirect
//       setShowSuccessModal(true);
      
//       // Optional: Auto-redirect after success modal display (3 seconds)
//       // setTimeout(() => {
//       //   setShowSuccessModal(false);
//       //   navigate("/");
//       // }, 3000);
      
//     } catch (err) {
//       const message = err.response?.data?.message || "Login failed. Please check your credentials.";
//       setError(message);
//       setErrorMessage(message);
//       setShowErrorModal(true);
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container my-3 py-3">
//         <h1 className="text-center">Login</h1>
//         <hr />
//         <div className="row my-4 h-100">
//           <div className="col-md-6 col-lg-4 col-sm-8 mx-auto">
//             {error && <div className="alert alert-danger">{error}</div>}
            
//             {isLoggedIn ? (
//               <div className="card p-4 text-center">
//                 <div className="card-body">
//                   <i className="bi bi-person-circle text-primary" style={{ fontSize: "3rem" }}></i>
//                   <h3 className="my-3">Welcome back, {userName}!</h3>
//                   <p className="mb-4">You are already logged in.</p>
//                   <div className="d-flex justify-content-center gap-3">
//                     <Button variant="primary" onClick={() => navigate("/")}>
//                       Go to Homepage
//                     </Button>
//                     <Button variant="outline-danger" onClick={handleLogout}>
//                       Logout
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <form onSubmit={onSubmit}>
//                 <div className="my-3">
//                   <label htmlFor="email">Email address</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     name="email"
//                     value={email}
//                     onChange={onChange}
//                     placeholder="name@example.com"
//                     required
//                   />
//                 </div>
//                 <div className="my-3">
//                   <label htmlFor="password">Password</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     id="password"
//                     name="password"
//                     value={password}
//                     onChange={onChange}
//                     placeholder="Password"
//                     required
//                   />
//                 </div>
//                 <div className="my-3">
//                   <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
//                 </div>
//                 <div className="text-center">
//                   <button className="my-2 mx-auto btn btn-dark" type="submit" disabled={loading}>
//                     {loading ? "Logging in..." : "Login"}
//                   </button>
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />

//       {/* Success Modal */}
//       <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
//         <Modal.Header closeButton className="bg-success text-white">
//           <Modal.Title>Login Successful</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="text-center">
//             <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "3rem" }}></i>
//             <p className="mt-3">You have successfully logged in!</p>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="success" onClick={handleCloseSuccessModal}>
//             Continue
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Error Modal */}
//       <Modal show={showErrorModal} onHide={handleCloseErrorModal} centered>
//         <Modal.Header closeButton className="bg-danger text-white">
//           <Modal.Title>Login Failed</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="text-center">
//             <i className="bi bi-exclamation-circle-fill text-danger" style={{ fontSize: "3rem" }}></i>
//             <p className="mt-3">{errorMessage}</p>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="danger" onClick={handleCloseErrorModal}>
//             Try Again
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default Login;



import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const { email, password } = formData;

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
    if (token && user) {
      setIsLoggedIn(true);
      setUserName(user.name || user.username || user.email || "User");
      
      // Check if there's a redirectAfterLogin path and handle it
      const redirectPath = sessionStorage.getItem('redirectAfterLogin');
      if (redirectPath) {
        setTimeout(() => {
          sessionStorage.removeItem('redirectAfterLogin');
          navigate(redirectPath);
        }, 500); // Short delay to ensure state is set
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");
    // Show a quick logout message
    setError("You have been logged out successfully.");
    setTimeout(() => setError(""), 3000);
  };

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Close modals
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    
    // Check if there's a stored redirect path
    const redirectPath = sessionStorage.getItem('redirectAfterLogin');
    if (redirectPath) {
      sessionStorage.removeItem('redirectAfterLogin');
      navigate(redirectPath);
    } else {
      navigate("/");
    }
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const onSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const body = JSON.stringify({ email, password });
      // const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const apiUrl = process.env.REACT_APP_API_URL || "https://e-com-fpj2.onrender.com";

      const res = await axios.post(`${apiUrl}/api/login`, body, config);

      // Save token and user to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setLoading(false);
      setIsLoggedIn(true);
      setUserName(res.data.user.name || res.data.user.username || res.data.user.email || "User");
      
      // Show success modal instead of immediate redirect
      setShowSuccessModal(true);
      
    } catch (err) {
      const message = err.response?.data?.message || "Login failed. Please check your credentials.";
      setError(message);
      setErrorMessage(message);
      setShowErrorModal(true);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-6 col-lg-4 col-sm-8 mx-auto">
            {error && <div className="alert alert-danger">{error}</div>}
            
            {isLoggedIn ? (
              <div className="card p-4 text-center">
                <div className="card-body">
                  <i className="bi bi-person-circle text-primary" style={{ fontSize: "3rem" }}></i>
                  <h3 className="my-3">Welcome back, {userName}!</h3>
                  <p className="mb-4">You are already logged in.</p>
                  <div className="d-flex justify-content-center gap-3">
                    <Button variant="primary" onClick={() => {
                      // Check if there's a redirectAfterLogin path
                      const redirectPath = sessionStorage.getItem('redirectAfterLogin');
                      if (redirectPath) {
                        sessionStorage.removeItem('redirectAfterLogin');
                        navigate(redirectPath);
                      } else {
                        navigate("/");
                      }
                    }}>
                      {sessionStorage.getItem('redirectAfterLogin') ? 'Continue to Checkout' : 'Go to Homepage'}
                    </Button>
                    <Button variant="outline-danger" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <div className="my-3">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div className="my-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="my-3">
                  <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
                </div>
                <div className="text-center">
                  <button className="my-2 mx-auto btn btn-dark" type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title>Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "3rem" }}></i>
            <p className="mt-3">You have successfully logged in!</p>
            {sessionStorage.getItem('redirectAfterLogin') && (
              <p>You will be redirected to checkout.</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseSuccessModal}>
            {sessionStorage.getItem('redirectAfterLogin') ? 'Continue to Checkout' : 'Continue'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal */}
      <Modal show={showErrorModal} onHide={handleCloseErrorModal} centered>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>Login Failed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <i className="bi bi-exclamation-circle-fill text-danger" style={{ fontSize: "3rem" }}></i>
            <p className="mt-3">{errorMessage}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseErrorModal}>
            Try Again
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;