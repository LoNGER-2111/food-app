import { fetchUser, fetchCart } from "../utils/fetchLocalStorageData";

// Fetch info from localStorage
const userInfo = fetchUser();
const cartInfo = fetchCart();

export const initialState = {
  user: userInfo,
  foodItems: null,
  showCart: false,
  cartItems: cartInfo,
};
