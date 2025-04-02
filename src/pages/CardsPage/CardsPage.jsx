import React, { useRef, useState } from "react";

import Header from "./components/Header";
import Column from "./components/Column";

const CardsPage = () => {
  const columns = [
    { id: "TODO", title: "To do" },
    { id: "IN_PROGRESS", title: "In progress" },
    { id: "DONE", title: "Done" },
  ];

  const [tasks, setTasks] = useState({
    TODO: [
      {
        id: "101",
        title: "Design new ui presentation",
        note: "Dribble marketing",
        MileStones: 10,
        completedMileStones: 7,
        AssignedDate: "24 Aug 2022",
        comments: 7,
        pinned: 2,
        collaborators: [],
        status: "TODO",
      },
      {
        id: "102",
        title: "Add more ui/ux mockups",
        note: "Pinterset promotion",
        MileStones: 10,
        completedMileStones: 4,
        AssignedDate: "25 Aug 2022",
        comments: 6,
        pinned: 4,
        collaborators: [],
        status: "TODO",
      },
    ],
    IN_PROGRESS: [
      {
        id: "201",
        title: "Design system update",
        note: "Oreo website project",
        MileStones: 10,
        completedMileStones: 3,
        AssignedDate: "12 Nov 2022",
        comments: 7,
        pinned: 2,
        collaborators: [],
        status: "IN_PROGRESS",
      },
    ],
    DONE: [
      {
        id: "301",
        title: "Add product to the market",
        note: "Ui8 marketplace",
        MileStones: 10,
        completedMileStones: 10,
        AssignedDate: "6 Jan 2022",
        comments: 1,
        pinned: 5,
        collaborators: [],
        status: "DONE",
      },
      {
        id: "302",
        title: "Add product to the playstore",
        note: "Google Play Playstore",
        MileStones: 5,
        completedMileStones: 5,
        AssignedDate: "16 Jan 2022",
        comments: 3,
        pinned: 3,
        collaborators: [],
        status: "DONE",
      },
    ],
  });

  const containerRef = useRef();
  const [droppingItem, setDroppingItem] = useState(null);

  const [currentContainer, setCurrentContainer] = useState(null);
  function handleDrop(e, colId, idx) {
    e.preventDefault();
    console.log(idx);
    console.log("Item Dropped");
    e.target.innerText = "Drag your task here...";
    if (droppingItem.status === colId) {
      console.log("Same Itemed dropped!!");
      // return;
    }
    // console.log(droppingItem);
    const status = droppingItem.status;

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

    currentContainer === null
      ? ""
      : (currentContainer.current.style.zIndex = 1);
    setCurrentContainer(null);
    setDroppingItem(null);
  }

  return (
    <div
      className="flex-1 flex flex-col h-full min-h-0"
      style={{ width: window.innerWidth - 314 - 90 }}
    >
      <Header />
      <div
        ref={containerRef}
        className="flex-1 flex overflow-auto mx-5 my-3 gap-4 font-semibold whitespace-nowrap"
      >
        {columns.map((column) => (
          <Column
            key={column.id}
            colId={column.id}
            itemsLen={tasks[column.id].length}
            title={column.title}
            containerRef={containerRef}
            tasks={tasks[column.id]}
            handleDrop={handleDrop}
            setDroppingItem={setDroppingItem}
            setCurrentContainer={setCurrentContainer}
          />
        ))}
      </div>
    </div>
  );
};

export default CardsPage;
