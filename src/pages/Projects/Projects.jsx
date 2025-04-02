import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { PiSunBold, PiMoonBold } from "react-icons/pi";

import useThemeStore from "../../themeStore";

const Projects = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  // console.log(localStorage.getItem("theme"));
  // const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = window.document.documentElement;
    root.className = theme + " w-full h-full";
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div
      className={
        "max-w-[310px] min-w-[310px] px-4 py-6 shadow-custom-project flex flex-col font-bold justify-between select-none " +
        (theme === "dark" ? "text-white bg-[#222327]" : "")
      }
    >
      <div>
        {/* Title Bar */}
        <div className="w-full flex justify-between">
          <h1
            className={
              "text-3xl leading-[100%] tracking-[0px] " +
              (theme === "dark" ? "text-white" : "text-[#1C1D22]")
            }
          >
            Projects
          </h1>
          <h1
            className={
              "active:text-[#1c1d227f] p-3 pb-4 w-[30px] h-[30px] text-2xl font-bold flex items-center justify-center rounded-full leading-[1] cursor-pointer " +
              (theme === "dark"
                ? "bg-[#FFFFFF14] text-[#ffffff69] active:bg-[#ffffff73]"
                : "bg-[#1C1D2214] text-[#1c1d225b] active:bg-[#1c1d2228]")
            }
          >
            +
          </h1>
        </div>
        {/* Tasks */}
        <div className="flex-1 mt-6 flex flex-col gap-4">
          {/* Item 1 */}
          <div className="w-full">
            <div
              className={
                "flex justify-between items-center " +
                (theme === "dark" ? "text-[#FFFFFF80]" : "text-[#1C1D2280]")
              }
            >
              <span>Team</span>
              <span>
                <FaAngleDown
                  size={16}
                  className="transition-transform -rotate-90"
                />
              </span>
            </div>
          </div>
          {/* Item 2 */}
          <div className="w-full">
            <div className="flex justify-between items-center">
              <span>Projects</span>
              <span>
                <FaAngleDown size={16} className={"transition-transform"} />
              </span>
            </div>
            {/* Data */}
            <div className="project-list flex flex-col gap-2 mt-3 font-semibold">
              <div
                className={
                  "project-list-element " +
                  (theme === "dark" ? "text-[#FFFFFF80]" : "text-[#1C1D2280]")
                }
              >
                <span className="ml-4 px-5 py-1 cursor-pointer">
                  All projects (3)
                </span>
              </div>
              <div className="project-list-element">
                <span
                  className={
                    "ml-4 px-5 py-1 cursor-pointer rounded-full " +
                    (theme === "dark" ? "bg-[#FFFFFF0A]" : "bg-[#e5e5e565]")
                  }
                >
                  Design system
                </span>
              </div>
              <div
                className={
                  "project-list-element " +
                  (theme === "dark" ? "text-[#FFFFFF80]" : "text-[#1C1D2280]")
                }
              >
                <span className="ml-4 px-5 py-1 cursor-pointer">User flow</span>
              </div>
              <div
                className={
                  "project-list-element " +
                  (theme === "dark" ? "text-[#FFFFFF80]" : "text-[#1C1D2280]")
                }
              >
                <span className="ml-4 px-5 py-1 cursor-pointer">
                  Ux research
                </span>
              </div>
            </div>
          </div>
          {/* Item 3 */}
          <div className="w-full">
            <div className="flex justify-between items-center">
              <span>Tasks</span>
              <span>
                <FaAngleDown size={16} className={"transition-transform"} />
              </span>
            </div>
            {/* Data */}
            <div className="project-list flex flex-col gap-2 mt-3 font-semibold">
              <div
                className={
                  "project-list-element " +
                  (theme === "dark" ? "text-[#FFFFFF80]" : "text-[#1C1D2280]")
                }
              >
                <span className="ml-4 px-5 py-1 cursor-pointer">
                  All tasks (11)
                </span>
              </div>
              <div
                className={
                  "project-list-element " +
                  (theme === "dark" ? "text-[#FFFFFF80]" : "text-[#1C1D2280]")
                }
              >
                <span className="ml-4 px-5 py-1 cursor-pointer">To do (4)</span>
              </div>
              <div className="project-list-element">
                <span
                  className={
                    "ml-4 px-5 py-1 cursor-pointer rounded-full " +
                    (theme === "dark" ? "bg-[#FFFFFF0A]" : "bg-[#e5e5e565]")
                  }
                >
                  In progress (4)
                </span>
              </div>
              <div
                className={
                  "project-list-element " +
                  (theme === "dark" ? "text-[#FFFFFF80]" : "text-[#1C1D2280]")
                }
              >
                <span className="ml-4 px-5 py-1 cursor-pointer">Done (3)</span>
              </div>
            </div>
          </div>
          {/* Item 4 */}
          <div className="w-full">
            <div
              className={
                "flex justify-between items-center " +
                (theme === "dark" ? "text-[#FFFFFF80]" : "text-[#1C1D2280]")
              }
            >
              <span>Reminders</span>
              <span>
                <FaAngleDown
                  size={16}
                  className="transition-transform -rotate-90"
                />
              </span>
            </div>
          </div>
          {/* Item 5 */}
          <div className="w-full">
            <div
              className={
                "flex justify-between items-center " +
                (theme === "dark" ? "text-[#FFFFFF80]" : "text-[#1C1D2280]")
              }
            >
              <span>Messengers</span>
              <span>
                <FaAngleDown
                  size={16}
                  className="transition-transform -rotate-90"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex relative">
        <div
          className={
            "rounded-full absolute inset-0 " +
            (theme === "dark"
              ? "text-white bg-white opacity-5"
              : "bg-[#e5e5e565]")
          }
        ></div>
        <div
          className={
            "w-1/2 h-10/12 rounded-full absolute mt-1 mx-1.5 top-0 " +
            (theme === "dark"
              ? "right-0 shadow bg-[#FFFFFF0F]"
              : "left-0 shadow-xl bg-white")
          }
        ></div>
        <div
          onClick={() => setTheme("light")}
          className={
            "flex py-3 items-center justify-center flex-1 relative z-10 cursor-pointer " +
            (theme === "dark" ? "text-white opacity-50" : "text-[#1C1D22]")
          }
        >
          <PiSunBold />
          &nbsp;&nbsp;Light
        </div>
        <div
          onClick={() => setTheme("dark")}
          className={
            "flex items-center justify-center flex-1 relative z-10 cursor-pointer " +
            (theme === "dark" ? "text-white" : "text-[#1C1D22]")
          }
        >
          <PiMoonBold />
          &nbsp;&nbsp;Dark
        </div>
      </div>
    </div>
  );
};

export default Projects;
