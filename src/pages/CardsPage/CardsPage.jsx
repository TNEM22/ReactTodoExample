import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import useThemeStore from "../../store/themeStore";
import useModalStore from "../../store/modalStore";
import useProjectStore from "../../store/projectStore";

import { SERVER_URL } from "../../Constants";

import Header from "./components/Header";
import Column from "./components/Column";
import AddTask from "../../components/Task/AddTask";
import CreateProject from "../../components/Project/CreateProject";
import DeleteProject from "../../components/Project/DeleteProject";

const CardsPage = () => {
  const taskModalState = useModalStore((state) => state.taskModalState);
  const setTaskModalState = useModalStore((state) => state.setTaskModalState);
  const setTaskColId = useModalStore((state) => state.setTaskColId);
  const createProjectState = useModalStore((state) => state.createProjectState);
  const deleteProjectState = useModalStore((state) => state.deleteProjectState);

  const theme = useThemeStore((state) => state.theme);

  // const [columns, setColumns] = useState([
  //   { id: "TODO", title: "To do" },
  //   { id: "IN_PROGRESS", title: "In progress" },
  //   { id: "DONE", title: "Done" },
  // ]);

  const columns = useProjectStore((state) => state.subTasks["TASKS"]);
  const subTasks = useProjectStore((state) => state.subTasks);
  const setSubTasks = useProjectStore((state) => state.setSubTasks);

  const selectedProject = useProjectStore((state) => state.selectedProject);
  const setSelectedProject = useProjectStore(
    (state) => state.setSelectedProject
  );

  const projects = useProjectStore((state) => state.projects);
  const setProjects = useProjectStore((state) => state.setProjects);

  const [selectedProjectPrev, setSelectedProjectPrev] =
    useState(selectedProject);
  const [tasks, setTasks] = useState(projects[selectedProject]);
  // {
  //   id: "101",
  //   title: "Design new ui presentation",
  //   note: "Dribble marketing",
  //   MileStones: 10,
  //   completedMileStones: 7,
  //   AssignedDate: "2022-07-24",
  //   comments: 7,
  //   pinned: 2,
  //   collaborators: [],
  //   status: "TODO",
  // }

  function initializeTasks(id) {
    const url = `${SERVER_URL}/api/v1/projects/${id}/task`;
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
            // Complete this...
            const newProject = {
              ...projects,
              [selectedProject]: {
                TODO: [],
                IN_PROGRESS: [],
                DONE: [],
              },
            };
            dd.data.forEach((item) => {
              if (item.status === "TODO") {
                newProject[selectedProject]["TODO"].push({
                  id: item._id,
                  title: item.title,
                  note: item.note,
                  milestones: item.milestones,
                  completedMilestones: item.completedMilestones,
                  assignedDate: item.assignedDate,
                  comments: item.comments,
                  pinned: item.pinned,
                  collaborators: item.collaborators,
                  status: item.status,
                });
              } else if (item.status === "IN_PROGRESS") {
                newProject[selectedProject]["IN_PROGRESS"].push({
                  id: item._id,
                  title: item.title,
                  note: item.note,
                  milestones: item.milestones,
                  completedMilestones: item.completedMilestones,
                  assignedDate: item.assignedDate,
                  comments: item.comments,
                  pinned: item.pinned,
                  collaborators: item.collaborators,
                  status: item.status,
                });
              } else if (item.status === "DONE") {
                newProject[selectedProject]["DONE"].push({
                  id: item._id,
                  title: item.title,
                  note: item.note,
                  milestones: item.milestones,
                  completedMilestones: item.completedMilestones,
                  assignedDate: item.assignedDate,
                  comments: item.comments,
                  pinned: item.pinned,
                  collaborators: item.collaborators,
                  status: item.status,
                });
              }
            });
            setProjects(newProject);
          }
        })
        .catch((err) => {
          console.error(err);
          throw new Error(err);
        }),
      {
        pending: "Finding tasks...",
        success: "Tasks intialized!",
        error: "Cannot get tasks!",
      }
    );
  }

  useEffect(() => {
    if (Object.keys(projects).length === 0) setSelectedProject(null);
    setTasks(projects[selectedProject]);
  }, [projects]);

  useEffect(() => {
    if (selectedProject === null) return;
    initializeTasks(subTasks["PROJECTS"][selectedProject].id);
    if (selectedProjectPrev !== null) {
      setProjects({ ...projects, [selectedProjectPrev]: tasks });
    }
    setSelectedProjectPrev(selectedProject);
    setTasks(projects[selectedProject]);

    setSubTasks({
      ...subTasks,
      TASKS: {
        TODO: {
          title: "To do",
          count: projects[selectedProject]?.["TODO"]?.length || 0,
          isActive: false,
        },
        IN_PROGRESS: {
          title: "In progress",
          count: projects[selectedProject]?.["IN_PROGRESS"]?.length || 0,
          isActive: false,
        },
        DONE: {
          title: "Done",
          count: projects[selectedProject]?.["DONE"]?.length || 0,
          isActive: false,
        },
      },
    });
  }, [selectedProject]);

  const handleAddTask = (colId) => {
    setTaskColId(colId);
    setTaskModalState("open");
  };

  const addTask = (colId, task) => {
    setTasks((prev) => ({
      ...prev,
      [colId]: [...prev[colId], task],
    }));

    // const tasksDesc = Object.keys(subTasks["TASKS"]).map((col) => {
    //   col = subTasks["TASKS"][col];
    //   if (col.id === colId) {
    //     return { ...col, count: (col.count || 0) + 1 };
    //   }
    //   return col;
    // });
    const tasksDesc = { ...subTasks["TASKS"][colId] };
    tasksDesc.count = tasksDesc.count + 1;

    setSubTasks({
      ...subTasks,
      TASKS: { ...subTasks["TASKS"], [colId]: tasksDesc },
    });
  };

  const handleDeleteTask = (colId, taskId) => {
    const url = `${SERVER_URL}/api/v1/projects/task`;
    toast.promise(
      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
        body: JSON.stringify({
          id: taskId,
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
            setTasks((prev) => ({
              ...prev,
              [colId]: prev[colId].filter((task) => task.id !== taskId),
            }));

            const tasksDesc = { ...subTasks["TASKS"][colId] };
            tasksDesc.count = tasksDesc.count < 1 ? 0 : tasksDesc.count - 1;

            setSubTasks({
              ...subTasks,
              TASKS: { ...subTasks["TASKS"], [colId]: tasksDesc },
            });
          }
        })
        .catch((err) => {
          console.error(err);
          throw new Error(err);
        }),
      {
        pending: "Deleting task...",
        success: "Task deleted!",
        error: "Cannot delete task!",
      }
    );
  };

  const containerRef = useRef();
  const [droppingItem, setDroppingItem] = useState(null);

  const [currentContainer, setCurrentContainer] = useState(null);
  function handleDrop(e, colId, idx) {
    e.preventDefault();
    e.target.innerText = "Drag your task here...";
    // if (droppingItem.status === colId) {
    //   return;
    // }
    const status = droppingItem.status;
    changeTaskStatus(colId, droppingItem.id);

    // First remove the element
    setTasks((prevTask) => {
      prevTask[status] = prevTask[status].filter(
        (item) => item.id != droppingItem.id
      );
      return prevTask;
    });

    // Add the element
    setTimeout(() => {
      droppingItem.status = colId;
      const newColArray = [...tasks[colId]];
      if (idx === -1) {
        newColArray.splice(tasks[colId].length, 0, droppingItem);
      } else {
        newColArray.splice(idx, 0, droppingItem);
      }
      setTasks({
        ...tasks,
        [colId]: newColArray,
      });
    }, 50);

    let tasksDesc = { ...subTasks["TASKS"] };
    tasksDesc[colId].count = tasksDesc[colId].count + 1;
    tasksDesc[status].count = tasksDesc[status].count =
      tasksDesc[status].count < 1 ? 0 : tasksDesc[status].count - 1;
    setSubTasks({
      ...subTasks,
      TASKS: tasksDesc,
    });

    currentContainer === null
      ? ""
      : (currentContainer.current.style.zIndex = 1);
    setCurrentContainer(null);
    setDroppingItem(null);
  }

  function changeTaskStatus(newStatus, taskId) {
    const url = `${SERVER_URL}/api/v1/projects/task`;
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify({
        id: taskId,
        status: newStatus,
      }),
    })
      .then((dd) => dd.json())
      .then((dd) => {
        if (dd.status === "error") {
          toast.error("Cannot update task!");
          throw new Error();
        }
      })
      .catch((err) => {
        console.error(err);
        throw new Error(err);
      });
  }

  return (
    <>
      {taskModalState === "open" && (
        <AddTask width={window.innerWidth - 314 - 90} addTask={addTask} />
      )}
      {createProjectState === "open" && (
        <CreateProject width={window.innerWidth - 314 - 90} />
      )}
      {deleteProjectState === "open" && (
        <DeleteProject width={window.innerWidth - 314 - 90} />
      )}
      <div
        className="flex-1 flex flex-col h-full min-h-0"
        style={{ width: window.innerWidth - 314 - 90 }}
      >
        {selectedProject !== null ? (
          <>
            <Header />
            <div
              ref={containerRef}
              className="flex-1 flex overflow-auto mx-5 my-3 gap-4 font-semibold whitespace-nowrap"
            >
              {tasks &&
                Object.keys(columns).map((column) => {
                  return (
                    <Column
                      key={column}
                      colId={column}
                      itemsLen={tasks?.[column]?.length}
                      title={columns?.[column]?.title}
                      containerRef={containerRef}
                      tasks={tasks[column]}
                      handleDrop={handleDrop}
                      setDroppingItem={setDroppingItem}
                      setCurrentContainer={setCurrentContainer}
                      addTask={handleAddTask}
                      deleteTask={handleDeleteTask}
                    />
                  );
                })}
            </div>
          </>
        ) : (
          <div
            className={
              "text-4xl flex flex-1 justify-center items-center " +
              (theme === "dark" ? "text-white" : "text-[#222327]")
            }
          >
            No Project selected.
          </div>
        )}
      </div>
    </>
  );
};

export default CardsPage;
