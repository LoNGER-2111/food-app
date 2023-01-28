import React from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const CartItem = ({ cartItem }) => {
  const [{ cartItems }, dispatch] = useStateValue();

  const dispatchCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: cartItems,
    });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const updateQuantity = (action, itemId) => {
    if (action === "minus") {
      cartItems.forEach((item) => {
        if (item.id === itemId) {
          item.qty -= 1;
          if (item.qty === 0) {
            // Delete cartItem when qty = 0
            cartItems.splice(
              cartItems.findIndex((item) => item.qty === 0),
              1
            );
            // Reset qty property of cartItem
            item.qty = 1;
          }
        }
      });
      dispatchCart();
    } else {
      cartItems.forEach((item) => {
        if (item.id === itemId) item.qty += 1;
      });
      dispatchCart();
    }
  };

  return (
    <div
      key={cartItem.id}
      className="w-full px-2 py-1 bg-cartItem flex items-center gap-2 rounded-lg"
    >
      <img
        className="max-w-[60px] h-20 object-contain rounded-full"
        src={cartItem.imageURL}
        alt=""
      />

      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{cartItem.title}</p>
        <p className="text-sm text-gray-300 font-semibold">
          $ {(cartItem.price * cartItem.qty).toFixed(2)}
        </p>
      </div>

      <div className="flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.95 }}
          onClick={() => updateQuantity("minus", cartItem.id)}
        >
          <BiMinus className="text-gray-50" />
        </motion.div>

        <p className="w-5 h-5 bg-cartBg flex items-center rounded-sm text-gray-50 justify-center">
          {cartItem.qty}
        </p>

        <motion.div
          whileTap={{ scale: 0.95 }}
          onClick={() => updateQuantity("plus", cartItem.id)}
        >
          <BiPlus className="text-gray-50" />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
