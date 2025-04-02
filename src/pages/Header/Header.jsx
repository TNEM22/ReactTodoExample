import React from "react";

import { LuCalendar } from "react-icons/lu";
import { FaSistrix, FaRegBell } from "react-icons/fa";

import userLogo from "../../assets/user.png";
import useThemeStore from "../../themeStore";

const Header = () => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <div
      className={
        "w-full flex justify-between p-5 " +
        (theme === "dark" ? "text-white" : "text-[#1C1D22]")
      }
    >
      <h1 className="text-2xl font-bold">Welcome back, Vincent👋</h1>
      <div className="flex justify-center items-center text-2xl gap-5">
        <div className="cursor-pointer">
          <FaSistrix />
        </div>
        <div className="cursor-pointer">
          <FaRegBell />
        </div>
        <div className="cursor-pointer flex items-center">
          <LuCalendar />
          &nbsp;
          <span
            className={
              "text-lg font-bold " +
              (theme === "dark" ? "text-white" : "text-[#1C1D2280]")
            }
          >
            19 May 2022
          </span>
        </div>
        <div className="cursor-pointer rounded-full">
          <img
            src={userLogo}
            alt="User Image"
            className="w-[40px] h-[40px] object-cover object-center rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
