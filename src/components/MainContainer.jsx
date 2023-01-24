import React from "react";
import { useStateValue } from "../context/StateProvider";
import CartContainer from "./CartContainer";
import FruitsContainer from "./FruitsContainer";
import HomeContainer from "./HomeContainer";
import MenuContainer from "./MenuContainer";

const MainContainer = () => {
  const [{ showCart }] = useStateValue();

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />

      <FruitsContainer />

      <MenuContainer />

      {showCart && <CartContainer />}
    </div>
  );
};

export default MainContainer;
