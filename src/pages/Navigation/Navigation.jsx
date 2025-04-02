import React from "react";

import { FiUser } from "react-icons/fi";
import { FaRegMap } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";
import { LuCalendar } from "react-icons/lu";
import { SlCloudUpload } from "react-icons/sl";
import { AiOutlineAppstore } from "react-icons/ai";

const Navigation = () => {
  return (
    <div className="w-[90px] h-full bg-[#1C1D22] text-white pt-4 px-6 flex flex-col justify-between">
      <div>
        <div className="flex gap-2 justify-center">
          <span className="w-[6px] h-[6px] rounded-full bg-white"></span>
          <span className="w-[6px] h-[6px] rounded-full bg-white opacity-40"></span>
          <span className="w-[6px] h-[6px] rounded-full bg-white opacity-20"></span>
        </div>
        <div className="my-8 flex gap-1 justify-center">
          <div>
            <svg
              width="10"
              height="50"
              viewBox="0 0 10 50"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="0,10 20,0 20,12 0,22" fill="#FFFFFF" />
              <path
                d="M0 20.5 L35 45"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="rotate-180">
            <svg
              width="10"
              height="50"
              viewBox="0 -12 10 50"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="0,10 20,0 20,12 0,22" fill="#FFFFFF" />
              <path
                d="M0 20.5 L35 45"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center text-xl text-gray-400">
          {/* Home */}
          <div
            id="home"
            className="w-fit bg-[#323338] rounded-full p-3 cursor-pointer text-white"
          >
            <AiOutlineAppstore />
          </div>
          {/* User */}
          <div
            id="user"
            className="w-fit rounded-full p-3 hover:bg-[#323338] hover:text-white cursor-pointer"
          >
            <FiUser />
          </div>
          {/* Calendar */}
          <div
            id="calendar"
            className="w-fit rounded-full p-3 hover:bg-[#323338] hover:text-white cursor-pointer"
          >
            <LuCalendar />
          </div>
          {/* Stats */}
          <div
            id="stats"
            className="w-fit rounded-full p-3 hover:bg-[#323338] cursor-pointer"
            onMouseEnter={(e) =>
              (e.currentTarget.firstChild.style.fill = "white")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.firstChild.style.fill = "#99a1af")
            }
          >
            <svg
              width="22px"
              height="22px"
              viewBox="0 0 24 24"
              fill="#99a1af"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm16 0H5v14h14V5zm-7 2a1 1 0 0 1 1 1v8a1 1 0 1 1-2 0V8a1 1 0 0 1 1-1zm4 2a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1zm-8 2a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1z"></path>
              </g>
            </svg>
          </div>
          {/* Upload */}
          <div
            id="upload"
            className="w-fit rounded-full p-3 hover:bg-[#323338] hover:text-white cursor-pointer"
          >
            <SlCloudUpload />
          </div>
          {/* Map */}
          <div
            id="map"
            className="w-fit rounded-full p-3 hover:bg-[#323338] hover:text-white cursor-pointer"
          >
            <FaRegMap />
          </div>
          {/* Settings */}
          <div
            id="settings"
            className="w-fit rounded-full hover:bg-[#323338] hover:text-white cursor-pointer"
          >
            <svg
              width="50px"
              height="50px"
              viewBox="0 0 58 58"
              xmlns="http://www.w3.org/2000/svg"
              fill="#99a1af"
              onMouseEnter={(e) => (e.currentTarget.style.fill = "white")}
              onMouseLeave={(e) => (e.currentTarget.style.fill = "#99a1af")}
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <defs>
                  <filter
                    id="a"
                    width="200%"
                    height="200%"
                    x="-50%"
                    y="-50%"
                    filterUnits="objectBoundingBox"
                  >
                    <feOffset
                      dy="1"
                      in="SourceAlpha"
                      result="shadowOffsetOuter1"
                    ></feOffset>
                    <feGaussianBlur
                      stdDeviation="10"
                      in="shadowOffsetOuter1"
                      result="shadowBlurOuter1"
                    ></feGaussianBlur>
                    <feColorMatrix
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                      in="shadowBlurOuter1"
                      result="shadowMatrixOuter1"
                    ></feColorMatrix>
                    <feMerge>
                      <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                      <feMergeNode in="SourceGraphic"></feMergeNode>
                    </feMerge>
                  </filter>
                </defs>
                <path
                  fillRule="evenodd"
                  d="M31.171 34h-11.179c-.536 0-.992.448-.992 1 0 .556.444 1 .992 1h11.179c.412 1.165 1.523 2 2.829 2 1.306 0 2.417-.835 2.829-2h1.179c.536 0 .992-.448.992-1 0-.556-.444-1-.992-1h-1.179c-.412-1.165-1.523-2-2.829-2-1.306 0-2.417.835-2.829 2zm-3.341-5h10.179c.536 0 .992-.448.992-1 0-.556-.444-1-.992-1h-10.179c-.412-1.165-1.523-2-2.829-2-1.306 0-2.417.835-2.829 2h-2.179c-.536 0-.992.448-.992 1 0 .556.444 1 .992 1h2.179c.412 1.165 1.523 2 2.829 2 1.306 0 2.417-.835 2.829-2zm3.341-9h-11.179c-.536 0-.992.448-.992 1 0 .556.444 1 .992 1h11.179c.412 1.165 1.523 2 2.829 2 1.306 0 2.417-.835 2.829-2h1.179c.536 0 .992-.448.992-1 0-.556-.444-1-.992-1h-1.179c-.412-1.165-1.523-2-2.829-2-1.306 0-2.417.835-2.829 2zm2.829 2c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-9 5c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1zm9 9c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"
                  filter="url(#a)"
                ></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="text-xl text-gray-400">
        <div
          id="user"
          className="w-fit rounded-full p-3 hover:bg-[#323338] cursor-pointer mb-4 hover:text-white"
        >
          <PiSignOut />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
