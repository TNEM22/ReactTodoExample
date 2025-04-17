import React, { useEffect, useState } from "react";
import { PiSunBold, PiMoonBold } from "react-icons/pi";
import { toast } from "react-toastify";

import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

import { SERVER_URL } from "../../Constants";

import Item from "./components/Item";
import useThemeStore from "../../store/themeStore";
import useProjectStore from "../../store/projectStore";
import useModalStore from "../../store/modalStore";

const Projects = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const setCreateProjectState = useModalStore(
    (state) => state.setCreateProjectState
  );
  const setDeleteProjectState = useModalStore(
    (state) => state.setDeleteProjectState
  );

  const tasks = useProjectStore((state) => state.tasks);
  const subTasks = useProjectStore((state) => state.subTasks);
  const setSubTasks = useProjectStore((state) => state.setSubTasks);
  const projects = useProjectStore((state) => state.projects);
  const setProjects = useProjectStore((state) => state.setProjects);

  useEffect(() => {
    const root = window.document.documentElement;
    root.className = theme + " w-full h-full";
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const url = `${SERVER_URL}/api/v1/projects/`;
    toast.promise(
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      })
        .then((dd) => dd.json())
        .then((dd) => {
          if (dd.status === "error") {
            throw new Error();
          } else {
            const newSubTasks = { ...subTasks };
            const newProjects = { ...projects };

            dd.data.forEach((item) => {
              const projectname = item.title.toUpperCase().replaceAll(" ", "_");

              newSubTasks["PROJECTS"][projectname] = {
                id: item._id,
                title: item.title,
                count: -1,
                isActive: false,
              };

              newProjects[projectname] = {
                TODO: [],
                IN_PROGRESS: [],
                DONE: [],
              };
            });

            setSubTasks(newSubTasks);
            setProjects(newProjects);
          }
        })
        .catch((err) => {
          console.error(err);
          throw new Error(err);
        }),
      {
        pending: "Finding projects...",
        success: "Projects Intialized!",
        error: "Cannot Get Projects!",
      }
    );
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={
        "max-w-[310px] min-w-[310px] px-4 py-6 shadow-custom-project flex flex-col font-bold justify-between select-none overflow-y-auto " +
        (theme === "dark" ? "text-white bg-[#222327]" : "")
      }
    >
      <div>
        {/* Title Bar */}
        <div className="w-full flex justify-between relative">
          <h1
            className={
              "text-3xl leading-[100%] tracking-[0px] " +
              (theme === "dark" ? "text-white" : "text-[#1C1D22]")
            }
          >
            Projects
          </h1>

          {/* Plus Icon and Dropdown Menu */}
          <div className="relative">
            <h1
              onClick={() => setMenuOpen((prev) => !prev)}
              className={
                "active:text-[#1c1d227f] p-3 pb-4 w-[30px] h-[30px] text-2xl font-bold flex items-center justify-center rounded-full leading-[1] cursor-pointer " +
                (theme === "dark"
                  ? "bg-[#FFFFFF14] text-[#ffffff69] active:bg-[#ffffff73]"
                  : "bg-[#1C1D2214] text-[#1c1d225b] active:bg-[#1c1d2228]")
              }
            >
              +
            </h1>

            {/* Dropdown */}
            {menuOpen && (
              <div className="fixed z-50 pt-3">
                <div
                  className={
                    "w-40 rounded-lg " +
                    (theme === "dark"
                      ? "bg-[#2e2f36] text-white shadow shadow-white"
                      : "bg-white text-[#1C1D22] shadow-md")
                  }
                >
                  <div
                    onClick={() => {
                      setCreateProjectState("open");
                      setMenuOpen(false);
                    }}
                    className={
                      "flex items-center px-4 py-2 cursor-pointer rounded-t-lg " +
                      (theme === "dark"
                        ? "hover:bg-[#3b3c43]"
                        : "hover:bg-gray-200")
                    }
                  >
                    <FaPlus />
                    &nbsp;New Project
                  </div>
                  <div
                    onClick={() => {
                      setDeleteProjectState("open");
                      setMenuOpen(false);
                    }}
                    className={
                      "flex items-center px-4 py-2 text-red-600 cursor-pointer rounded-b-lg " +
                      (theme === "dark"
                        ? "hover:bg-[#472f2f]"
                        : "hover:bg-red-100")
                    }
                  >
                    <MdDelete />
                    &nbsp;Delete Project
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Tasks */}
        <div className="flex-1 mt-6 flex flex-col gap-4">
          {Object.keys(tasks).map((item) => (
            <Item key={item} id={item} item={tasks[item]} theme={theme} />
          ))}
        </div>
      </div>
      {/* Dark / Light */}
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
