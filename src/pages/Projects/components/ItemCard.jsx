import React, { useEffect } from "react";

import useProjectStore from "../../../store/projectStore";

const ItemCard = ({ subTaskId, id, item, theme }) => {
  const setSubTasks = useProjectStore((state) => state.setSubTasks);
  const subTasks = useProjectStore((state) => state.subTasks);
  const setSelectedProject = useProjectStore(
    (state) => state.setSelectedProject
  );

  function setProject() {
    // const setSelectedProject = useProjectStore(
    //   (state) => state.setSelectedProject
    // );
    // setSelectedProject(id);
    const newSubTasks = { ...subTasks };

    // Set all sub-tasks in the same category to inactive
    Object.keys(newSubTasks[subTaskId]).forEach((key) => {
      newSubTasks[subTaskId][key].isActive = false;
    });

    // Set only the clicked one to active
    newSubTasks[subTaskId][id].isActive = true;

    // Update the state
    setSubTasks(newSubTasks);
    if (subTaskId === "PROJECTS") setSelectedProject(id);
  }

  return (
    <div
      className={
        "project-list-element " +
        (!item.isActive &&
          (theme === "dark" ? "text-[#FFFFFF80]" : "text-[#1C1D2280]"))
      }
    >
      <span
        onClick={setProject}
        className={
          "ml-4 px-5 py-1 cursor-pointer rounded-full " +
          (item.isActive &&
            (theme === "dark" ? "bg-[#FFFFFF0A]" : "bg-[#e5e5e565]"))
        }
      >
        {item.title}&nbsp;
        {item.count !== -1 && `(${item.count})`}
      </span>
    </div>
  );
};

export default ItemCard;
