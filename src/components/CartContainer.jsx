import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace, MdRemoveCircle } from "react-icons/md";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { app } from "../firebase.config";
import EmptyCart from "../img/emptyCart.svg";
import CartItem from "./CartItem";

const CartContainer = () => {
  const [{ cartItems, user }, dispatch] = useStateValue();
  const [total, setTotal] = useState(0);

  const cartItemsJson = JSON.stringify(cartItems);

  const hideCartContainer = () => {
    dispatch({
      type: actionType.SET_SHOW_CART,
      showCart: false,
    });
  };

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));

    cartItems.forEach((cartItem) => (cartItem.qty = 1));
  };

  const login = async () => {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const {
      user: { providerData },
    } = await signInWithPopup(firebaseAuth, provider);

    dispatch({
      type: actionType.SET_USER,
      user: providerData[0],
    });

    localStorage.setItem("user", JSON.stringify(providerData[0]));
  };

  useEffect(() => {
    let totalPrice = cartItems.reduce((accumulator, cartItem) => {
      return accumulator + cartItem.qty * cartItem.price;
    }, 0);
    setTotal(totalPrice);
  }, [cartItems, cartItemsJson]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col fixed top-0 right-0 z-50"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer relative">
        <motion.div whileTap={{ scale: 0.9 }} onClick={hideCartContainer}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>

        <p className="text-textColor text-lg font-semibold absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2">
          Cart
        </p>

        {cartItems.length > 0 && (
          <motion.p
            whileTap={{ scale: 0.9 }}
            className="flex items-center bg-gray-100 rounded-md hover:shadow-md gap-2 px-2 py-1 my-2 cursor-pointer text-textColor text-base"
            onClick={clearCart}
          >
            Clear <MdRemoveCircle />
          </motion.p>
        )}
      </div>

      {cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-hide">
            {cartItems.map((cartItem) => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))}
          </div>

          <div className="w-full bg-cartTotal flex-1 rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">$ {total.toFixed(2)}</p>
            </div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">$ 2.5</p>
            </div>

            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">
                $ {(total + 2.5).toFixed(2)}
              </p>
            </div>

            {user ? (
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="w-full bg-gradient-to-tr from-orange-400 to-orange-500 p-2 rounded-full text-gray-50 text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out"
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="w-full bg-gradient-to-tr from-orange-400 to-orange-500 p-2 rounded-full text-gray-50 text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out"
                onClick={login}
              >
                Login to checkout
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col gap-6 items-center justify-center">
          <img src={EmptyCart} className="w-[80%]" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
