import React, { useState, useRef } from "react";

import { BsThreeDots } from "react-icons/bs";

import DropArea from "./DropArea";
import useThemeStore from "../../../themeStore";

const Column = ({
  colId,
  itemsLen,
  title,
  containerRef,
  tasks,
  handleDrop,
  setDroppingItem,
  setCurrentContainer,
}) => {
  const theme = useThemeStore((state) => state.theme);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const colContainer = useRef();

  function handleDragStart(e, item) {
    setCurrentContainer(colContainer);
    colContainer.current.style.zIndex = 0;
    e.target.parentNode.parentNode.style.zIndex = 0;
    setDroppingItem(item);
    console.log("dragging");
    setIsDragging(true);
    e.target.style.cursor = "pointer";

    const rect = e.target.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  function handleDrag(e) {
    if (isDragging === false) return;
    e.target.style.position = "fixed";
    e.target.style.cursor = "pointer";

    // Prevent updating when the event has no coordinates (e.g., when the drag ends)
    if (e.clientX === 0 && e.clientY === 0) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const threshold = 100;
    const y = e.clientY - position.y;
    const x = e.clientX - position.x;

    if (e.clientY > rect.top && e.clientY < rect.bottom)
      e.target.style.top = y + "px";
    if (e.clientX > rect.left && e.clientX < rect.right)
      e.target.style.left = x + "px";

    // Right edge check
    if (mouseX > rect.right - threshold) {
      container.scrollLeft += 10;
    }
    // Left edge check
    else if (mouseX < rect.left + threshold) {
      container.scrollLeft -= 10;
    }

    // Top edge check
    if (mouseY < rect.top + threshold) {
      container.scrollTop -= 10;
    }
    // Bottom edge check
    if (mouseY > rect.bottom - threshold) {
      container.scrollTop += 10;
    }
  }

  function handleDragEnd(e) {
    setCurrentContainer(null);
    colContainer.current.style.zIndex = 1;
    e.target.parentNode.parentNode.style.zIndex = 1;
    console.log("dragging ended");
    setIsDragging(false);
    e.target.style.position = "relative";
    // e.target.style.backgroundColor = "white";
    e.target.style.top = 0 + "px";
    e.target.style.left = 0 + "px";
  }

  function handleDragEnter(e) {
    e.preventDefault();
    console.log("Item dragged enter");
    e.target.innerText = "";
  }

  function handleDragLeave(e) {
    e.preventDefault();
    console.log("Item dragged leave");
    e.target.innerText = "Drag your task here...";
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  return (
    <div
      ref={colContainer}
      style={{ zIndex: 1 }}
      className={
        "min-w-[350px] max-w-[350px] min-h-fit flex-shrink-0 flex-1 rounded-lg p-4 " +
        (theme === "dark"
          ? "bg-[#24262C]"
          : "border-3 border-dashed border-[#1C1D2214]")
      }
    >
      {/* Header */}
      <div className="w-full mb-4 flex justify-between select-none">
        <h1
          className={theme === "dark" ? "text-[#FFFFFF80]" : "text-[#1C1D2280]"}
        >
          {title}&nbsp;({itemsLen || 0})
        </h1>
        <div
          className={
            "flex items-center cursor-pointer " +
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
          &nbsp; Add new task
        </div>
      </div>
      <div className="relative min-w-[313px] max-w-[313px] flex flex-col gap-2">
        {tasks &&
          tasks.map((item, idx) => (
            <div
              key={item.id + colId}
              className="flex flex-col gap-0"
              style={{ zIndex: 1 }}
            >
              <DropArea
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                colId={colId}
                idx={idx}
              />
              <div className="w-full min-h-[178px] max-h-[178px] grid">
                <div
                  className={
                    "absolute w-full min-h-[178px] max-h-[178px] border-2 border-dashed rounded-lg flex justify-center items-center text-lg " +
                    (theme === "dark"
                      ? "border-[#FFFFFF1A] text-[#FFFFFF80]"
                      : "border-[#1C1D2214] text-[#1C1D2280]")
                  }
                >
                  Drag your task here...
                </div>
                <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  onDrag={handleDrag}
                  onDragEnd={handleDragEnd}
                  className={
                    "relative flex flex-col justify-between w-full max-w-[313px] min-h-[178px] max-h-[178px] rounded-lg border-2 border-[#1C1D2214] p-4 " +
                    (theme === "dark" ? "bg-[#292B31]" : "bg-white")
                  }
                >
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h1
                        className={
                          "font-bold " + (theme === "dark" ? "text-white" : "")
                        }
                      >
                        {item.title}
                      </h1>
                      <h3
                        className={
                          "font-normal text-[15px] " +
                          (theme === "dark"
                            ? "text-[#FFFFFF80]"
                            : "text-[#1C1D2280]")
                        }
                      >
                        {item.note}
                      </h3>
                    </div>
                    <div>
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
                    </div>
                  </div>
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between">
                      <div
                        className={
                          "flex items-center " +
                          (theme === "dark"
                            ? "text-[#FFFFFF80]"
                            : "text-[#1C1D2280]")
                        }
                      >
                        <svg
                          width="20"
                          height="16"
                          viewBox="0 0 20 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/* <!-- First bullet and line --> */}
                          <rect
                            x="2"
                            y="3"
                            width="3"
                            height="2"
                            rx="1"
                            fill={theme === "dark" ? "#FFFFFF80" : "#1C1D2280"}
                          />
                          <rect
                            x="7"
                            y="3"
                            width="11"
                            height="2"
                            rx="1"
                            fill={theme === "dark" ? "#FFFFFF80" : "#1C1D2280"}
                          />

                          {/* <!-- Second bullet and line --> */}
                          <rect
                            x="2"
                            y="7"
                            width="3"
                            height="2"
                            rx="1"
                            fill={theme === "dark" ? "#FFFFFF80" : "#1C1D2280"}
                          />
                          <rect
                            x="7"
                            y="7"
                            width="11"
                            height="2"
                            rx="1"
                            fill={theme === "dark" ? "#FFFFFF80" : "#1C1D2280"}
                          />

                          {/* <!-- Third bullet and line --> */}
                          <rect
                            x="2"
                            y="11"
                            width="3"
                            height="2"
                            rx="1"
                            fill={theme === "dark" ? "#FFFFFF80" : "#1C1D2280"}
                          />
                          <rect
                            x="7"
                            y="11"
                            width="11"
                            height="2"
                            rx="1"
                            fill={theme === "dark" ? "#FFFFFF80" : "#1C1D2280"}
                          />
                        </svg>
                        &nbsp;Progress
                      </div>
                      <div className={theme === "dark" ? "text-white" : ""}>
                        {item.completedMileStones}/{item.MileStones}
                      </div>
                    </div>
                    <div
                      className={
                        "h-[4px] w-full rounded-lg mt-2 " +
                        (theme === "dark" ? "bg-[#FFFFFF1A]" : "bg-[#1C1D2214]")
                      }
                    >
                      <div
                        className={
                          item.MileStones != item.completedMileStones
                            ? "h-full w-[3%] bg-[#FFA048] rounded-lg"
                            : "h-full w-[3%] bg-[#78D700] rounded-lg"
                        }
                        style={{
                          width:
                            (item.completedMileStones / item.MileStones) * 100 +
                            "%",
                        }}
                      ></div>
                    </div>
                  </div>
                  {/* Bottom */}
                  <div
                    className={
                      "flex justify-between " +
                      (theme === "dark" ? "text-[#989CAA]" : "text-[#888DA7]")
                    }
                  >
                    <div
                      className={
                        "rounded-2xl w-fit px-3 py-1 " +
                        (theme === "dark" ? "bg-[#FFFFFF0F]" : "bg-[#888DA71A]")
                      }
                    >
                      {item.AssignedDate}
                    </div>
                    <div className="flex">
                      {/* Comment */}
                      <div className="flex items-center cursor-pointer mr-3">
                        <div id="comment" className="flex mr-1">
                          <svg
                            width="16"
                            height="14"
                            viewBox="0 0 16 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 1.5C0 0.671573 0.671573 0 1.5 0H13.5C14.3284 0 15 0.671573 15 1.5V9.75C15 10.5784 14.3284 11.25 13.5 11.25H10.0607L8.03033 13.2803C7.73744 13.5732 7.26256 13.5732 6.96967 13.2803L4.93934 11.25H1.5C0.671573 11.25 0 10.5784 0 9.75V1.5ZM13.5 1.5H1.5V9.75H5.25C5.44891 9.75 5.63968 9.82902 5.78033 9.96967L7.5 11.6893L9.21967 9.96967C9.36032 9.82902 9.55109 9.75 9.75 9.75H13.5V1.5ZM3 4.125C3 3.71079 3.33579 3.375 3.75 3.375H11.25C11.6642 3.375 12 3.71079 12 4.125C12 4.53921 11.6642 4.875 11.25 4.875H3.75C3.33579 4.875 3 4.53921 3 4.125ZM3 7.125C3 6.71079 3.33579 6.375 3.75 6.375H8.25C8.66421 6.375 9 6.71079 9 7.125C9 7.53921 8.66421 7.875 8.25 7.875H3.75C3.33579 7.875 3 7.53921 3 7.125Z"
                              fill="#888DA7"
                            />
                          </svg>
                        </div>
                        <div className="text-base font-baloo-2 font-semibold">
                          {item.comments}
                        </div>
                      </div>
                      {/* Paperclip */}
                      <div className="flex items-center cursor-pointer">
                        <div id="paper_clip" className="flex mr-1">
                          <svg
                            width="16"
                            height="14"
                            viewBox="0 0 16 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.5971 2.1818C13.0816 1.61948 12.1508 1.58483 11.5303 2.20533L5.45529 8.28033C5.29819 8.43744 5.29819 8.63757 5.45529 8.79467C5.6124 8.95178 5.81253 8.95178 5.96963 8.79467L10.9946 3.76967C11.2875 3.47678 11.7624 3.47678 12.0553 3.76967C12.3482 4.06257 12.3482 4.53744 12.0553 4.83033L7.03029 9.85533C6.2874 10.5982 5.13753 10.5982 4.39463 9.85533C3.65174 9.11244 3.65174 7.96257 4.39463 7.21967L10.4696 1.14467C11.6453 -0.0309737 13.5558 -0.0692286 14.6917 1.15616C15.8559 2.33247 15.8902 4.23368 14.6696 5.366L7.55529 12.4803C5.9124 14.1232 3.33753 14.1232 1.69463 12.4803C0.0517402 10.8374 0.0517402 8.26257 1.69463 6.61967L7.76963 0.544675C8.06252 0.251782 8.5374 0.251782 8.83029 0.544675C9.12319 0.837568 9.12319 1.31244 8.83029 1.60533L2.75529 7.68033C1.69819 8.73744 1.69819 10.3626 2.75529 11.4197C3.8124 12.4768 5.43753 12.4768 6.49463 11.4197L13.6196 4.29467C13.6273 4.28699 13.6352 4.27948 13.6432 4.27214C14.2055 3.75668 14.2401 2.82584 13.6196 2.20533C13.6119 2.19765 13.6044 2.18981 13.5971 2.1818Z"
                              fill="#888DA7"
                            />
                          </svg>
                        </div>
                        <div className="text-base font-baloo-2 font-semibold">
                          {item.pinned}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {tasks.length < 4 && (
          <div className="w-full mt-1 min-h-[178px] max-h-[178px] grid">
            <div
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={(e) => {
                console.log("Dropped");
                handleDrop(e, colId, -1);
              }}
              onDragOver={handleDragOver}
              className={
                "absolute w-full min-h-[178px] max-h-[178px] border-2 border-dashed rounded-lg flex justify-center items-center text-lg " +
                (theme === "dark"
                  ? "border-[#FFFFFF1A] text-[#FFFFFF80]"
                  : "border-[#1C1D2214] text-[#1C1D2280]")
              }
            >
              Drag your task here...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
