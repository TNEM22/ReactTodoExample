import React from "react";
import { BsThreeDots } from "react-icons/bs";

import useThemeStore from "../../../themeStore";

const Header = () => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <div
      className={
        "flex justify-between text-lg select-none border-b-3 border-collapse mx-5 " +
        (theme === "dark" ? "border-[#FFFFFF1A]" : "border-[#1C1D2214]")
      }
    >
      <div className="flex gap-3 -mb-[2.5px]  font-semibold">
        <span
          className={
            "flex items-center py-2 px-2 cursor-pointer border-b-3 " +
            (theme === "dark" ? "border-white text-white" : "border-black")
          }
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <rect
              x="10"
              y="10"
              width="80"
              height="30"
              rx="5"
              stroke={theme === "dark" ? "#FFFFFF" : "#1C1D22"}
              strokeWidth="10"
            />
            <rect
              x="10"
              y="60"
              width="80"
              height="30"
              rx="5"
              stroke={theme === "dark" ? "#FFFFFF" : "#1C1D22"}
              strokeWidth="10"
            />
          </svg>
          &nbsp; Board view
        </span>
        <span
          className={
            "flex items-center py-2 px-2 cursor-pointer " +
            (theme === "dark" ? "text-white" : "text-[#1C1D2280]")
          }
        >
          <h1
            className={
              "px-2 w-[20px] h-[20px] text-lg font-bold rounded-full leading-[1] flex justify-center " +
              (theme === "dark"
                ? "bg-[#FFFFFF14] text-[#ffffff69]"
                : "bg-[#1C1D2214] text-[#1c1d225b]")
            }
          >
            +
          </h1>
          &nbsp; Add view
        </span>
      </div>
      <div className="flex gap-4 font-medium">
        <span
          className={"cursor-pointer " + (theme === "dark" && "text-white")}
        >
          Filter
        </span>
        <span
          className={
            "cursor-pointer " +
            (theme === "dark" ? "text-[#FFFFFF80]" : "text-[#1C1D2280]")
          }
        >
          Sort
        </span>
        <span>
          <span
            className={
              "cursor-pointer border-2 rounded-full p-1.5 flex " +
              (theme === "dark"
                ? "border-[#FFFFFF1A] active:bg-[#FFFFFF1A] text-white"
                : "border-[#1C1D221A] active:bg-[#1C1D221A]")
            }
          >
            <BsThreeDots size={12} />
          </span>
        </span>
        <span>
          <span
            className={
              "cursor-pointer text-base px-7 py-3 text-white active:ring-4 active:ring-blue-500 rounded-full " +
              (theme === "dark" ? "bg-[#4B69FF]" : "bg-[#1C1D22]")
            }
          >
            New template
          </span>
        </span>
      </div>
    </div>
  );
};

export default Header;
