import React, { useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useNavigate } from "react-router";

import { FiUser } from "react-icons/fi";
import { FaRegMap } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";
import { LuCalendar } from "react-icons/lu";
import { SlCloudUpload } from "react-icons/sl";
import { AiOutlineAppstore } from "react-icons/ai";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.token === undefined || localStorage.name === undefined) {
      navigate("/login");
    }
  });

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  }

  return (
    <div className="w-[90px] h-full bg-[#1C1D22] text-white pt-4 px-6 flex flex-col justify-between">
      <div>
        <div className="flex gap-2 justify-center">
          <span className="w-[6px] h-[6px] rounded-full bg-white"></span>
          <span className="w-[6px] h-[6px] rounded-full bg-white opacity-40"></span>
          <span className="w-[6px] h-[6px] rounded-full bg-white opacity-20"></span>
        </div>
        <Link to={"/"} className="my-8 flex gap-1 justify-center">
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
        </Link>
        <div className="flex flex-col gap-2 items-center text-xl text-gray-400">
          {/* Home */}
          <Link
            to={"/"}
            id="home"
            className={
              "w-fit rounded-full p-3 cursor-pointer " +
              (location.pathname === "/"
                ? "bg-[#323338] text-white"
                : "hover:bg-[#323338] hover:text-white")
            }
          >
            <AiOutlineAppstore />
          </Link>
          {/* User */}
          <Link
            to={"/me"}
            id="me"
            className={
              "w-fit rounded-full p-3 cursor-pointer " +
              (location.pathname === "/me"
                ? "bg-[#323338] text-white"
                : "hover:bg-[#323338] hover:text-white")
            }
          >
            <FiUser />
          </Link>
          {/* Calendar */}
          <Link
            to={"/calendar"}
            id="calendar"
            className={
              "w-fit rounded-full p-3 cursor-pointer " +
              (location.pathname === "/calendar"
                ? "bg-[#323338] text-white"
                : "hover:bg-[#323338] hover:text-white")
            }
          >
            <LuCalendar />
          </Link>
          {/* Stats */}
          <Link
            to={"/stats"}
            id="stats"
            className={
              "w-fit rounded-full p-3 cursor-pointer " +
              (location.pathname === "/stats"
                ? "bg-[#323338] text-white"
                : "hover:bg-[#323338] hover:text-white")
            }
            onMouseEnter={(e) => (e.currentTarget.firstChild.fill = "white")}
            onMouseLeave={(e) =>
              location.pathname === "/stats"
                ? (e.currentTarget.firstChild.fill = "white")
                : (e.currentTarget.firstChild.fill = "#99a1af")
            }
          >
            <svg
              width="22px"
              height="22px"
              viewBox="0 0 24 24"
              fill={location.pathname === "/stats" ? "white" : "#99a1af"}
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
          </Link>
          {/* Upload */}
          <Link
            to={"/upload"}
            id="upload"
            className={
              "w-fit rounded-full p-3 cursor-pointer " +
              (location.pathname === "/upload"
                ? "bg-[#323338] text-white"
                : "hover:bg-[#323338] hover:text-white")
            }
          >
            <SlCloudUpload />
          </Link>
          {/* Map */}
          <Link
            to={"/map"}
            id="map"
            className={
              "w-fit rounded-full p-3 cursor-pointer " +
              (location.pathname === "/map"
                ? "bg-[#323338] text-white"
                : "hover:bg-[#323338] hover:text-white")
            }
          >
            <FaRegMap />
          </Link>
          {/* Settings */}
          <Link
            to={"/settings"}
            id="settings"
            className={
              "w-fit rounded-full p-3.5 cursor-pointer " +
              (location.pathname === "/settings"
                ? "bg-[#323338] text-white"
                : "hover:bg-[#323338] hover:text-white")
            }
            onMouseEnter={(e) => (e.currentTarget.firstChild.fill = "white")}
            onMouseLeave={(e) =>
              location.pathname === "/settings"
                ? (e.currentTarget.firstChild.fill = "white")
                : (e.currentTarget.firstChild.fill = "#99a1af")
            }
          >
            {/* <svg
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
            </svg> */}
            <svg
              width="16"
              height="18"
              viewBox="0 0 16 18"
              fill={location.pathname === "/settings" ? "white" : "#99a1af"}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5.25 2.58333C4.74374 2.58333 4.33333 2.99374 4.33333 3.5C4.33333 4.00626 4.74374 4.41667 5.25 4.41667C5.75626 4.41667 6.16667 4.00626 6.16667 3.5C6.16667 2.99374 5.75626 2.58333 5.25 2.58333ZM2.65648 2.58333C3.034 1.51524 4.05263 0.75 5.25 0.75C6.44737 0.75 7.466 1.51524 7.84352 2.58333H14.4167C14.9229 2.58333 15.3333 2.99374 15.3333 3.5C15.3333 4.00626 14.9229 4.41667 14.4167 4.41667H7.84352C7.466 5.48476 6.44737 6.25 5.25 6.25C4.05263 6.25 3.034 5.48476 2.65648 4.41667H1.58333C1.07707 4.41667 0.666668 4.00626 0.666668 3.5C0.666668 2.99374 1.07707 2.58333 1.58333 2.58333H2.65648ZM10.75 8.08333C10.2437 8.08333 9.83333 8.49374 9.83333 9C9.83333 9.50626 10.2437 9.91667 10.75 9.91667C11.2563 9.91667 11.6667 9.50626 11.6667 9C11.6667 8.49374 11.2563 8.08333 10.75 8.08333ZM8.15648 8.08333C8.534 7.01524 9.55263 6.25 10.75 6.25C11.9474 6.25 12.966 7.01524 13.3435 8.08333H14.4167C14.9229 8.08333 15.3333 8.49374 15.3333 9C15.3333 9.50626 14.9229 9.91667 14.4167 9.91667H13.3435C12.966 10.9848 11.9474 11.75 10.75 11.75C9.55263 11.75 8.534 10.9848 8.15648 9.91667H1.58333C1.07707 9.91667 0.666668 9.50626 0.666668 9C0.666668 8.49374 1.07707 8.08333 1.58333 8.08333H8.15648ZM5.25 13.5833C4.74374 13.5833 4.33333 13.9937 4.33333 14.5C4.33333 15.0063 4.74374 15.4167 5.25 15.4167C5.75626 15.4167 6.16667 15.0063 6.16667 14.5C6.16667 13.9937 5.75626 13.5833 5.25 13.5833ZM2.65648 13.5833C3.034 12.5152 4.05263 11.75 5.25 11.75C6.44737 11.75 7.466 12.5152 7.84352 13.5833H14.4167C14.9229 13.5833 15.3333 13.9937 15.3333 14.5C15.3333 15.0063 14.9229 15.4167 14.4167 15.4167H7.84352C7.466 16.4848 6.44737 17.25 5.25 17.25C4.05263 17.25 3.034 16.4848 2.65648 15.4167H1.58333C1.07707 15.4167 0.666668 15.0063 0.666668 14.5C0.666668 13.9937 1.07707 13.5833 1.58333 13.5833H2.65648Z" />
            </svg>
          </Link>
        </div>
      </div>
      {/* Logout */}
      <div className="text-xl text-gray-400">
        <div
          onClick={logout}
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
