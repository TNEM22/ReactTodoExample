import React from "react";

import { FaAngleDown } from "react-icons/fa6";

import ItemCard from "./ItemCard";
import useProjectStore from "../../../store/projectStore";

const Item = ({ id, item, theme }) => {
  const subTasks = useProjectStore((state) => state.subTasks[id]);
  function getSubTasksLength() {
    let count = 0;
    for (let element in subTasks) {
      if (subTasks[element].count === -1) return Object.keys(subTasks).length;
      else count += subTasks[element].count;
    }
    return count;
  }

  return (
    <div className="w-full">
      <div
        className={
          "flex justify-between items-center " +
          (!item.isActive &&
            (theme === "dark" ? "text-[#FFFFFF80]" : "text-[#1C1D2280]"))
        }
      >
        <span>{item.title}</span>
        <span>
          <FaAngleDown
            size={16}
            className={
              "transition-transform " + (!item.isActive && "-rotate-90")
            }
          />
        </span>
      </div>
      {/* Data */}
      <div className="project-list flex flex-col gap-2 mt-3 font-semibold">
        {Object.keys(subTasks).length !== 0 && (
          <div
            className={
              "project-list-element " +
              (theme === "dark" ? "text-[#FFFFFF80]" : "text-[#1C1D2280]")
            }
          >
            <span className="ml-4 px-5 py-1 cursor-pointer">
              All {item.title.toLowerCase()} ({getSubTasksLength()})
            </span>
          </div>
        )}
        {Object.keys(subTasks).map((item) => (
          <ItemCard
            key={item}
            subTaskId={id}
            id={item}
            item={subTasks[item]}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
};

export default Item;
