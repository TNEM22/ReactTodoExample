import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

import { SERVER_URL } from "../../Constants";

import useThemeStore from "../../store/themeStore";
import useModalStore from "../../store/modalStore";
import useProjectStore from "../../store/projectStore";

const DeleteProject = ({ width }) => {
  const theme = useThemeStore((state) => state.theme);
  const setDeleteProjectState = useModalStore(
    (state) => state.setDeleteProjectState
  );
  const subTasks = useProjectStore((state) => state.subTasks);
  const setSubTasks = useProjectStore((state) => state.setSubTasks);
  const projects = useProjectStore((state) => state.projects);
  const setProjects = useProjectStore((state) => state.setProjects);

  const deleteProject = (id) => {
    const url = `${SERVER_URL}/api/v1/projects/`;
    toast.promise(
      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
        body: JSON.stringify({
          id: subTasks["PROJECTS"][id].id,
        }),
      })
        .then((dd) => {
          if (dd.status === 204) {
            return dd;
          }
          return dd.json();
        })
        .then((dd) => {
          if (dd.status === "error") {
            throw new Error();
          } else {
            let dupProjects = { ...projects };
            delete dupProjects[id];
            setProjects(dupProjects);

            dupProjects = { ...subTasks["PROJECTS"] };
            delete dupProjects[id];
            setSubTasks({ ...subTasks, ["PROJECTS"]: dupProjects });
          }
        })
        .catch((err) => {
          console.error(err);
          throw new Error(err);
        }),
      {
        pending: "Deleting project...",
        success: "Project deleted!",
        error: "Cannot delete project!",
      }
    );
  };

  const closeModal = () => {
    setDeleteProjectState("close");
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
            Delete project{" "}
            <div
              onClick={closeModal}
              className="mr-1 px-2 select-none cursor-pointer rounded-full hover:bg-slate-200 hover:text-black active:bg-gray-600 active:text-white"
            >
              X
            </div>
          </h1>
          <div>
            {Object.keys(projects).length ? (
              Object.keys(projects).map((item) => (
                <div
                  key={item}
                  className="flex text-xl justify-between items-center border-b py-2"
                >
                  {item}
                  <MdDelete
                    onClick={() => deleteProject(item)}
                    className="cursor-pointer text-red-600"
                  />
                </div>
              ))
            ) : (
              <div className="text-center text-lg">No projects to show.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteProject;
