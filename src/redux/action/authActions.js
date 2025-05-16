// // redux/action/authActions.js
// import axios from 'axios';

// // Action Types
// export const LOGIN_REQUEST = 'LOGIN_REQUEST';
// export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
// export const LOGIN_FAIL = 'LOGIN_FAIL';
// export const REGISTER_REQUEST = 'REGISTER_REQUEST';
// export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
// export const REGISTER_FAIL = 'REGISTER_FAIL';
// export const LOGOUT = 'LOGOUT';
// export const USER_LOADED = 'USER_LOADED';
// export const AUTH_ERROR = 'AUTH_ERROR';

// const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// // Load User
// export const loadUser = () => async (dispatch) => {
//   const token = localStorage.getItem('token');
  
//   if (!token) {
//     dispatch({ type: AUTH_ERROR });
//     return;
//   }
  
//   try {
//     const config = {
//       headers: {
//         'x-auth-token': token
//       }
//     };
    
//     const res = await axios.get(`${apiUrl}/api/user`, config);
    
//     dispatch({
//       type: USER_LOADED,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({ type: AUTH_ERROR });
//   }
// };

// // Login User
// export const login = (email, password) => async (dispatch) => {
//   dispatch({ type: LOGIN_REQUEST });
  
//   try {
//     const config = {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     };
    
//     const body = JSON.stringify({ email, password });
    
//     const res = await axios.post(`${apiUrl}/api/login`, body, config);
    
//     dispatch({
//       type: LOGIN_SUCCESS,
//       payload: res.data
//     });
    
//     // Save to localStorage
//     localStorage.setItem('token', res.data.token);
//     localStorage.setItem('user', JSON.stringify(res.data.user));
    
//     dispatch(loadUser());
    
//     return { success: true };
//   } catch (err) {
//     const errors = err.response?.data?.message || 'Login failed';
    
//     dispatch({
//       type: LOGIN_FAIL,
//       payload: errors
//     });
    
//     return { success: false, error: errors };
//   }
// };

// // Register User
// export const register = ({ name, email, password }) => async (dispatch) => {
//   dispatch({ type: REGISTER_REQUEST });
  
//   try {
//     const config = {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     };
    
//     const body = JSON.stringify({ name, email, password });
    
//     const res = await axios.post(`${apiUrl}/api/register`, body, config);
    
//     dispatch({
//       type: REGISTER_SUCCESS,
//       payload: res.data
//     });
    
//     // Save to localStorage
//     localStorage.setItem('token', res.data.token);
//     localStorage.setItem('user', JSON.stringify(res.data.user));
    
//     dispatch(loadUser());
    
//     return { success: true };
//   } catch (err) {
//     const errors = err.response?.data?.message || 'Registration failed';
    
//     dispatch({
//       type: REGISTER_FAIL,
//       payload: errors
//     });
    
//     return { success: false, error: errors };
//   }
// };

// // Logout
// export const logout = () => (dispatch) => {
//   localStorage.removeItem('token');
//   localStorage.removeItem('user');
  
//   dispatch({ type: LOGOUT });
// };



import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken'; // adjust path if needed


// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOGOUT = 'LOGOUT';
export const AUTH_ERROR = 'AUTH_ERROR';
export const USER_LOADED = 'USER_LOADED';


// Base URL - replace with your actual API base URL
// const API_URL = 'http://localhost:5000/api';
const API_URL = 'https://e-com-fpj2.onrender.com';

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token); // ✅ set token globally
  } else {
    dispatch({ type: AUTH_ERROR });
    return;
  }

  try {
    const res = await axios.get(`${API_URL}/auth/user`);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ name, email, password });
    const res = await axios.post(`${API_URL}/users`, body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response?.data?.msg || 'Registration failed'
    });
  }
};

// Login User
export const login = ({ email, password }) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ email, password });
    const res = await axios.post(`${API_URL}/auth`, body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response?.data?.msg || 'Login failed'
    });
  }
};

// Logout User
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};