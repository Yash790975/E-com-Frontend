// // redux/reducer/authReducer.js
// import {
//   LOGIN_REQUEST,
//   LOGIN_SUCCESS,
//   LOGIN_FAIL,
//   REGISTER_REQUEST,
//   REGISTER_SUCCESS,
//   REGISTER_FAIL,
//   LOGOUT,
//   USER_LOADED,
//   AUTH_ERROR
// } from '../action/authActions';

// // Get user from localStorage
// const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
// const token = localStorage.getItem('token');

// const initialState = {
//   token: token || null,
//   isAuthenticated: !!token,
//   user: user || null,
//   loading: false,
//   error: null
// };

// const authReducer = (state = initialState, action) => {
//   const { type, payload } = action;
  
//   switch (type) {
//     case LOGIN_REQUEST:
//     case REGISTER_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null
//       };
//     case USER_LOADED:
//       return {
//         ...state,
//         isAuthenticated: true,
//         loading: false,
//         user: payload
//       };
//     case LOGIN_SUCCESS:
//     case REGISTER_SUCCESS:
//       return {
//         ...state,
//         token: payload.token,
//         isAuthenticated: true,
//         loading: false,
//         user: payload.user,
//         error: null
//       };
//     case AUTH_ERROR:
//     case LOGIN_FAIL:
//     case REGISTER_FAIL:
//     case LOGOUT:
//       return {
//         ...state,
//         token: null,
//         isAuthenticated: false,
//         loading: false,
//         user: null,
//         error: payload
//       };
//     default:
//       return state;
//   }
// };

// export default authReducer;


import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_ERROR,
  USER_LOADED
} from '../action/authActions';

const initialState = {
  token: localStorage.getItem('token'),
  // isAuthenticated: null,
  isAuthenticated: false,
  loading: true,
  user: null,
  error: null
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        // ...payload,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: payload
      };
    default:
      return state;
  }
};

export default authReducer;