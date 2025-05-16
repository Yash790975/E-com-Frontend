// components/Profile.jsx - Create a profile component

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/action/authActions';
import { Navbar, Footer } from '../components';

const Profile = () => {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  
  return (
    <>
      <Navbar />
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header bg-dark text-white">
                <h4 className="mb-0">My Profile</h4>
              </div>
              <div className="card-body">
                {user && (
                  <div>
                    <div className="mb-3">
                      <strong>Name:</strong> {user.name}
                    </div>
                    <div className="mb-3">
                      <strong>Email:</strong> {user.email}
                    </div>
                    <div className="mb-3">
                      <strong>Account Created:</strong> {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                    <button 
                      className="btn btn-danger" 
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;