import { useState } from "react";
import { toast } from "react-toastify";

import { SERVER_URL } from "../../Constants";

import useThemeStore from "../../store/themeStore";
import useModalStore from "../../store/modalStore";
import useProjectStore from "../../store/projectStore";

const AddTask = ({ width, addTask }) => {
  const theme = useThemeStore((state) => state.theme);
  const taskColId = useModalStore((state) => state.taskColId);
  const setTaskModalState = useModalStore((state) => state.setTaskModalState);
  const selectedProject = useProjectStore((state) => state.selectedProject);
  const subTask = useProjectStore((state) => state.subTasks["PROJECTS"]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [subTasks, setSubTasks] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted!");
    const url = `${SERVER_URL}/api/v1/projects/task`;
    toast.promise(
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
        body: JSON.stringify({
          projectId: subTask[selectedProject].id,
          title: title,
          note: desc,
          milestones: subTasks.split(","),
          completedMilestones: [],
          assignedDate: selectedDate,
          comments: [],
          pinned: [],
          collaborators: [],
          status: taskColId,
        }),
      })
        .then((dd) => dd.json())
        .then((dd) => {
          console.log(dd);
          if (dd.status !== "success") {
            throw new Error();
          } else {
            const task = {
              id: dd.data._id,
              title: title,
              note: desc,
              milestones: subTasks.split(","),
              completedMilestones: [],
              assignedDate: selectedDate,
              comments: [],
              pinned: [],
              collaborators: [],
              status: taskColId,
            };
            addTask(taskColId, task);
            closeModal();
          }
        })
        .catch((err) => {
          console.error(err);
          throw new Error(err);
        }),
      {
        pending: "Creating tasks...",
        success: "Tasks created!",
        error: "Cannot create tasks!",
      }
    );
  };

  const closeModal = () => {
    setTaskModalState("close");
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
            Add your Task
            <div
              onClick={closeModal}
              className="mr-1 px-2 select-none cursor-pointer rounded-full hover:bg-slate-200 hover:text-black active:bg-gray-600 active:text-white"
            >
              X
            </div>
          </h1>
          <form onSubmit={handleFormSubmit} target="/">
            <label htmlFor="title">Task Title</label>
            <input
              type="text"
              name="title"
              id="title"
              className="block w-full border border-slate-500 rounded-sm p-1 mb-2"
              placeholder="Type your task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label htmlFor="desc">Task Description</label>
            <textarea
              name="desc"
              id="desc"
              placeholder="Enter task Description"
              className="block w-full border border-slate-500 rounded-sm p-1 mb-2"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            ></textarea>
            <label htmlFor="subtasks">
              Sub Tasks&nbsp;
              <span className="text-sm text-blue-300">
                (Separate subtasks by commas)
              </span>
            </label>
            <textarea
              name="subtasks"
              id="subtasks"
              placeholder="Complete tasks page, Complete header component"
              className="block w-full border border-slate-500 rounded-sm p-1 mb-2"
              value={subTasks}
              onChange={(e) => setSubTasks(e.target.value)}
              required
            ></textarea>
            {/* <label htmlFor="date">Select Date</label> */}
            <label htmlFor="date" className="text-sm font-medium">
              Select a date
            </label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="block border border-gray-300 rounded-lg p-2 mb-2"
              required
            />
            <button
              type="submit"
              className="py-1 px-2 rounded cursor-pointer text-white bg-blue-400 active:bg-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTask;
