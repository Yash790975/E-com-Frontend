// src/redux/reducers/handleCart.js
// Retrieve initial state from localStorage if available
const getInitialCart = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const handleCart = (state = getInitialCart(), action) => {
  console.log("[cart reducer] action:", action.type, "payload:", action.payload);
  let updatedCart;

  switch (action.type) {
    case "ADDITEM":
      const exist = state.find((x) => x.id === action.payload.id);
      if (exist) {
        updatedCart = state.map(x =>
          x.id === action.payload.id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        updatedCart = [...state, { ...action.payload, qty: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;

    case "DELITEM":
      const exist2 = state.find(x => x.id === action.payload.id);
      if (exist2.qty === 1) {
        updatedCart = state.filter(x => x.id !== action.payload.id);
      } else {
        updatedCart = state.map(x =>
          x.id === action.payload.id ? { ...x, qty: x.qty - 1 } : x
        );
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;

    default:
      return state;
  }
};

export default handleCart;
