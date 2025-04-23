import { create } from "zustand";

const modalStore = (set, get) => ({
  taskColId: null,
  setTaskColId: (data) => set({ taskColId: data }),

  taskModalState: "close",
  setTaskModalState: (data) => set({ taskModalState: data }),

  createProjectState: "close",
  setCreateProjectState: (data) => set({ createProjectState: data }),

  task: null,
  setTask: (data) => set({ task: data }),

  editProjectState: "close",
  setEditProjectState: (data) => set({ editProjectState: data }),

  deleteProjectState: "close",
  setDeleteProjectState: (data) => set({ deleteProjectState: data }),
});

const useModalStore = create(modalStore);

export default useModalStore;
