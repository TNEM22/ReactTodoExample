import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { SERVER_URL } from "../../Constants";

import useThemeStore from "../../store/themeStore";
import useModalStore from "../../store/modalStore";
import useProjectStore from "../../store/projectStore";

const CreateProject = ({ width }) => {
  const theme = useThemeStore((state) => state.theme);
  const setCreateProjectState = useModalStore(
    (state) => state.setCreateProjectState
  );
  const subTasks = useProjectStore((state) => state.subTasks);
  const setSubTasks = useProjectStore((state) => state.setSubTasks);
  const projects = useProjectStore((state) => state.projects);
  const setProjects = useProjectStore((state) => state.setProjects);

  const [title, setTitle] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const projectname = title.toUpperCase().replaceAll(" ", "_");
    if (projects?.[projectname] !== undefined) {
      toast.error("Project already present!");
      return;
    }

    const url = `${SERVER_URL}/api/v1/projects/`;
    toast.promise(
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
        body: JSON.stringify({
          title: title,
        }),
      })
        .then((dd) => dd.json())
        .then((dd) => {
          if (dd.status === "error") {
            throw new Error();
          } else {
            setSubTasks({
              ...subTasks,
              PROJECTS: {
                ...subTasks["PROJECTS"],
                [projectname]: {
                  id: dd.data._id,
                  title: title,
                  count: -1,
                  isActive: false,
                },
                // USER_FLOW: { title: "User flow", count: -1, isActive: false },
                // UX_RESEARCH: { title: "Ux research", count: -1, isActive: false },
              },
            });
            setProjects({
              ...projects,
              [projectname]: {
                TODO: [],
                IN_PROGRESS: [],
                DONE: [],
              },
            });
            closeModal();
          }
        })
        .catch((err) => {
          console.error(err);
          throw new Error(err);
        }),
      {
        pending: "Creating project...",
        success: "Project created!",
        error: "Cannot create project!",
      }
    );
  };

  const closeModal = () => {
    setCreateProjectState("close");
  };

  return (
    <>
      <div
        className="fixed h-full bg-slate-500 opacity-70 z-10"
        style={{ width: width }}
      ></div>
      <div
        className="fixed h-full flex justify-center items-center z-10"
        style={{ width: width }}
      >
        <div
          className={
            "p-3 rounded w-1/3 " +
            (theme === "dark" ? "bg-[#292B31] text-white" : "bg-white")
          }
        >
          <h1 className="font-bold pb-1 mb-1 border-b flex justify-between">
            Create your project{" "}
            <div
              onClick={closeModal}
              className="mr-1 px-2 select-none cursor-pointer rounded-full hover:bg-slate-200 hover:text-black active:bg-gray-600 active:text-white"
            >
              X
            </div>
          </h1>
          <form onSubmit={handleFormSubmit} target="/">
            <label htmlFor="title">Project title</label>
            <input
              type="text"
              name="title"
              id="title"
              className="block w-full border border-slate-500 rounded-sm p-1 mb-2"
              placeholder="Type your project title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="py-1 px-2 rounded cursor-pointer text-white bg-blue-400 active:bg-blue-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProject;
