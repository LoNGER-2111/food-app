import { motion } from "framer-motion";
import React from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { MdOutlineKeyboardBackspace, MdRemoveCircle } from "react-icons/md";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import EmptyCart from "../img/emptyCart.svg";

const CartContainer = () => {
  const [{ showCart, cartItems, user }, dispatch] = useStateValue();

  const hideCartContainer = () => {
    dispatch({
      type: actionType.SET_SHOW_CART,
      showCart: !showCart,
    });
  };

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
          >
            Clear <MdRemoveCircle />
          </motion.p>
        )}
      </div>

      {cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-hide">
            {cartItems.map((cartItem) => (
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
                    $ {cartItem.price}
                  </p>
                </div>

                <div className="flex items-center gap-2 ml-auto cursor-pointer">
                  <motion.div whileTap={{ scale: 0.9 }}>
                    <BiMinus className="text-gray-50" />
                  </motion.div>

                  <p className="w-5 h-5 bg-cartBg flex items-center rounded-sm text-gray-50 justify-center">
                    {cartItem.qty}
                  </p>

                  <motion.div whileTap={{ scale: 0.9 }}>
                    <BiPlus className="text-gray-50" />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full bg-cartTotal flex-1 rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">$ 9.99</p>
            </div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">$ 2.5</p>
            </div>

            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">$ 12.5</p>
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
