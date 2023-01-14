import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { MdAdd, MdLogout, MdShoppingBasket } from "react-icons/md";
import { Link } from "react-router-dom";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { app } from "../firebase.config";
import Avatar from "../img/avatar.png";
import Logo from "../img/logo.png";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { providerData },
      } = await signInWithPopup(firebaseAuth, provider);

      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });

      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  return (
    <header className="fixed z-50 w-screen bg-primary p-3 px-4 md:p-6 md:px-16">
      {/* desktop & tablet */}
      <div className="hidden h-full w-full items-center justify-between md:flex">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-xl font-bold text-headingColor">City</p>
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <li className="cursor-pointer text-base text-textColor transition-all duration-100 ease-in-out hover:text-headingColor">
              Home
            </li>
            <li className="cursor-pointer text-base text-textColor transition-all duration-100 ease-in-out hover:text-headingColor ">
              Menu
            </li>
            <li className="cursor-pointer text-base text-textColor transition-all duration-100 ease-in-out hover:text-headingColor ">
              About Us
            </li>
            <li className="cursor-pointer text-base text-textColor transition-all duration-100 ease-in-out hover:text-headingColor">
              Service
            </li>
          </motion.ul>

          <div className="relative flex items-center justify-center">
            <MdShoppingBasket className="cursor-pointer text-2xl text-textColor" />
            <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-cartNumBg">
              <div className="text-xs font-semibold text-white">2</div>
            </div>
          </div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.9 }}
              src={user ? user.photoURL : Avatar}
              className="h-10 min-h-[40px] w-10 min-w-[40px] cursor-pointer rounded-full drop-shadow-xl"
              alt="userprofile"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="absolute top-12 right-0 flex w-40 flex-col overflow-hidden rounded-lg bg-gray-50 shadow-xl"
              >
                <Link to={"/createItem"} onClick={() => setIsMenu(false)}>
                  <p className="flex cursor-pointer items-center gap-3 px-4 py-2 text-base text-textColor transition-all duration-100 ease-in-out hover:bg-slate-100">
                    New Item <MdAdd />
                  </p>
                </Link>
                <p
                  className="flex cursor-pointer items-center gap-3 px-4 py-2 text-base text-textColor transition-all duration-100 ease-in-out hover:bg-slate-100"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex h-full w-full items-center justify-between md:hidden">
        <div className="relative flex items-center justify-center">
          <MdShoppingBasket className="cursor-pointer text-2xl text-textColor" />
          <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-cartNumBg">
            <div className="text-xs font-semibold text-white">2</div>
          </div>
        </div>

        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-xl font-bold text-headingColor">City</p>
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.9 }}
            src={user ? user.photoURL : Avatar}
            className="h-10 min-h-[40px] w-10 min-w-[40px] cursor-pointer rounded-full drop-shadow-xl"
            alt="userprofile"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="absolute top-12 right-0 flex w-40 flex-col overflow-hidden rounded-lg bg-gray-50 shadow-xl"
            >
              <Link to={"/createItem"} onClick={() => setIsMenu(false)}>
                <p className="flex cursor-pointer items-center gap-3 px-4 py-2 text-base text-textColor transition-all duration-100 ease-in-out hover:bg-slate-100">
                  New Item <MdAdd />
                </p>
              </Link>

              <ul
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 200 }}
                className="flex flex-col"
              >
                <li
                  className="cursor-pointer px-4 py-2 text-base text-textColor transition-all duration-100 ease-in-out hover:bg-slate-100 hover:text-headingColor "
                  onClick={() => setIsMenu(false)}
                >
                  Home
                </li>
                <li
                  className="cursor-pointer px-4 py-2 text-base text-textColor transition-all duration-100 ease-in-out hover:bg-slate-100 hover:text-headingColor "
                  onClick={() => setIsMenu(false)}
                >
                  Menu
                </li>
                <li
                  className="cursor-pointer px-4 py-2 text-base text-textColor transition-all duration-100 ease-in-out hover:bg-slate-100 hover:text-headingColor "
                  onClick={() => setIsMenu(false)}
                >
                  About Us
                </li>
                <li
                  className="cursor-pointer px-4 py-2 text-base text-textColor transition-all duration-100 ease-in-out hover:bg-slate-100 hover:text-headingColor "
                  onClick={() => setIsMenu(false)}
                >
                  Service
                </li>
              </ul>

              <p
                className="m-2 flex cursor-pointer items-center justify-center gap-3 rounded-md bg-gray-200 p-2 px-4 py-2 text-base text-textColor shadow-md transition-all duration-100 ease-in-out
                hover:bg-gray-300"
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
