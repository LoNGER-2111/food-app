import React from "react";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import { heroData } from "../utils/data";

const HomeContainer = () => {
  return (
    <section className="grid w-full grid-cols-1 gap-2 md:grid-cols-2" id="home">
      <div
        className="flex flex-1 flex-col items-center justify-center gap-6 py-2
        text-center md:items-start md:text-left lg:justify-start"
      >
        <div className="flex items-center justify-center gap-2 rounded-full bg-orange-100 px-4 py-1">
          <p className="text-base font-semibold text-orange-500">
            Bike Delivery
          </p>
          <div className="h-8 w-8 overflow-hidden rounded-full bg-white drop-shadow-xl">
            <img
              src={Delivery}
              className="h-full w-full object-contain"
              alt="delivery"
            />
          </div>
        </div>

        <p className="text-[2.5rem] font-bold tracking-wide text-headingColor lg:text-[4.5rem] lg:max-[1119px]:text-[4rem]">
          The Fastest Delivery in
          <span className="text-[3rem] text-orange-600 lg:text-[5rem] lg:max-[1119px]:text-[3.5rem]">
            Your City
          </span>
        </p>

        <p className="text-base text-textColor md:w-[90%]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima velit
          eaque fugit distinctio est nam voluptatum architecto, porro iusto
          deserunt recusandae ipsa minus eos sunt, dolores illo repellat facere
          suscipit!
        </p>

        <button
          className="w-full rounded-lg bg-gradient-to-br from-orange-400 to-orange-500 px-4 py-2 
          transition-all duration-100 ease-in-out hover:shadow-lg md:w-auto"
        >
          Order Now
        </button>
      </div>
      <div className="relative flex flex-1 items-center py-2">
        <img
          src={HeroBg}
          className="ml-auto h-420 w-full md:h-510 lg:h-600 lg:max-[1119px]:w-full min-[1119px]:w-auto"
          alt="hero-background"
        />

        <div
          className="absolute top-0 left-0 flex h-full w-full flex-wrap items-center justify-center
          gap-4 py-4 md:max-lg:top-[50%] md:max-lg:h-[90%] md:max-lg:translate-y-[-50%] lg:px-32 lg:max-[1439px]:px-12"
        >
          {heroData &&
            heroData.map((data) => (
              <div
                key={data.id}
                className="flex flex-col items-center justify-center rounded-3xl bg-cardOverlay
                p-4 drop-shadow-lg backdrop-blur-md md:max-lg:w-[45%] lg:max-[1119px]:w-[47%] max-ssm:w-32 lg:w-190"
              >
                <img
                  src={data.imageSrc}
                  className="-mt-10 w-20 max-ssm:w-16 lg:-mt-20 lg:w-40"
                  alt={data.name}
                />
                <p
                  className="mt-2 text-base font-semibold text-textColor md:max-lg:text-[12px]
                  lg:mt-4 lg:text-xl lg:max-[1119px]:text-[14px] max-ssm:text-[10px]"
                >
                  {data.name}
                </p>
                <p
                  className="my-1 text-[12px] font-semibold text-lighttextGray md:max-lg:text-[10px]
                  lg:max-[1119px]:text-[11px] max-ssm:text-[8px] lg:my-3 lg:text-sm"
                >
                  {data.desc}
                </p>
                <p className="text-sm font-semibold text-headingColor md:max-lg:text-[12px] max-ssm:text-[12px]">
                  <span className="text-xs text-red-600">$</span> {data.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
