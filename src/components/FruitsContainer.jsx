import { motion } from "framer-motion";
import React, { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useStateValue } from "../context/StateProvider";
import RowContainer from "./RowContainer";

const FruitsContainer = () => {
  const [{ foodItems }] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);
  const [, setForceUpdate] = useState(0);

  return (
    <section className="w-full my-6">
      <div className="w-full flex items-center justify-between">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 before:rounded-lg before:w-1/2 before:h-1 transition-all ease-in-out duration-100">
          Our fresh & healthy fruits
        </p>

        <div className="hidden md:flex gap-3 items-center">
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
            onClick={() => {
              setScrollValue(-300);
              setForceUpdate((prev) => prev - 1);
            }}
          >
            <MdChevronLeft className="text-lg text-white" />
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
            onClick={() => {
              setScrollValue(300);
              setForceUpdate((prev) => prev + 1);
            }}
          >
            <MdChevronRight className="text-lg text-white" />
          </motion.div>
        </div>
      </div>

      <RowContainer
        scrollable={true}
        data={foodItems?.filter((foodItem) => foodItem.category === "fruits")}
        scrollValue={scrollValue}
      />
    </section>
  );
};

export default FruitsContainer;
