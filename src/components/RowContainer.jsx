import React, { useEffect, useRef } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";

const RowContainer = ({ scrollable, data, scrollValue }) => {
  const rowContainerRef = useRef();

  useEffect(() => {
    rowContainerRef.current.scrollLeft += scrollValue;
  });

  return (
    <div
      ref={rowContainerRef}
      className={`w-full my-12 flex items-center gap-3 ${
        scrollable
          ? "overflow-x-scroll scrollbar-hide scroll-smooth whitespace-nowrap snap-x snap-mandatory"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data &&
        data.map((item) => (
          <div
            key={item?.id}
            onClick={(e) =>
              e.target
                .closest("#fruit-item")
                .scrollIntoView({ behavior: "smooth" })
            }
            id="fruit-item"
            className="min-w-[275px] h-[175px] md:min-w-[300px] my-12 bg-card rounded-lg py-2 px-4 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-center scroll-mx-1 snap-start"
          >
            <div className="w-full flex items-center justify-between -mt-8">
              <motion.div
                className="w-40 h-40 drop-shadow-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <img
                  src={item?.imageURL}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.8 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md"
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>

            <div className="w-full flex flex-col items-end justify-end -mt-8">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item?.calories} Calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$</span> {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RowContainer;
