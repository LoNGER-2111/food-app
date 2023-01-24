import { motion } from "framer-motion";
import React, { useState } from "react";
import { MdFastfood } from "react-icons/md";
import { useStateValue } from "../context/StateProvider";
import { categories } from "../utils/data";
import ItemsContainer from "./ItemsContainer";

const MenuContainer = () => {
  const [filter, setFilter] = useState("chicken");
  const [{ foodItems }] = useStateValue();

  return (
    <section className="w-full" id="menu-container">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 before:rounded-lg before:w-1/2 before:h-1 transition-all ease-in-out duration-100 mr-auto">
          Our Hot Dishes
        </p>

        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 mt-6 overflow-x-scroll scrollbar-hide scroll-smooth whitespace-nowrap snap-x snap-mandatory">
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.9 }}
                key={category.id}
                className={`group min-w-[96px] h-28 ${
                  filter === category.urlParamName ? "bg-cartNumBg" : "bg-card"
                } hover:bg-cartNumBg cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center scroll-mx-1 snap-start`}
                onClick={() => setFilter(category.urlParamName)}
              >
                <div
                  className={`w-10 h-10 rounded-full ${
                    filter === category.urlParamName
                      ? "bg-white"
                      : "bg-cartNumBg"
                  } group-hover:bg-white flex items-center justify-center shadow-lg`}
                >
                  <MdFastfood
                    className={`${
                      filter === category.urlParamName
                        ? "text-cartNumBg"
                        : "text-white"
                    } group-hover:text-cartNumBg text-lg`}
                  />
                </div>
                <p
                  className={`text-sm ${
                    filter === category.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  } group-hover:text-white`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>

        <div className="w-full">
          <ItemsContainer
            scrollable={false}
            data={foodItems?.filter((foodItem) => foodItem.category === filter)}
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
