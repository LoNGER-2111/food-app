import React from "react";
import FruitsContainer from "./FruitsContainer";
import HomeContainer from "./HomeContainer";

const MainContainer = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />

      <FruitsContainer />
    </div>
  );
};

export default MainContainer;
