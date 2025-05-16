import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer, Navbar } from "../components";
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    
    const { name, email, password } = formData;
    
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const onSubmit = async e => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            // Basic validation
            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters long');
            }
            
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            
            const body = JSON.stringify({ name, email, password });
            // const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            const apiUrl = process.env.REACT_APP_API_URL || 'https://e-com-fpj2.onrender.com';
            
            const res = await axios.post(`${apiUrl}/api/register`, body, config);
            
            // Save token to localStorage
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            
            setLoading(false);
            
            // Show success modal instead of immediately redirecting
            setShowModal(true);
            
            // Redirect after 2 seconds
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            if (err.message) {
                setError(err.message);
            } else {
                setError(err.response?.data?.message || 'Registration failed. Please enter correct credentials.');
            }
            setLoading(false);
        }
    };
    
    // Function to close modal manually
    const closeModal = () => {
        setShowModal(false);
        navigate('/');
    };
    
    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={onSubmit}>
                            <div className="form my-3">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={onChange}
                                    placeholder="Enter Your Name"
                                    required
                                />
                            </div>
                            <div className="form my-3">
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
                            <div className="form my-3">
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
                                    minLength="6"
                                />
                                <small className="form-text text-muted">Password must be at least 6 characters long</small>
                            </div>
                            <div className="my-3">
                                <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button className="my-2 mx-auto btn btn-dark" type="submit" disabled={loading}>
                                    {loading ? 'Registering...' : 'Register'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            {/* Success Modal */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} 
                 style={{ display: showModal ? 'block' : 'none' }} 
                 tabIndex="-1" 
                 role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Registration Successful!</h5>
                            <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Your account has been created successfully. You will be redirected to the homepage.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={closeModal}>Continue</button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Modal Backdrop */}
            {showModal && <div className="modal-backdrop fade show"></div>}
            
            <Footer />
        </>
    );
};

export default Register;