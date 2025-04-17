import { create } from "zustand";

const modalStore = (set, get) => ({
  taskColId: null,
  taskModalState: "close",
  setTaskColId: (data) => set({ taskColId: data }),
  setTaskModalState: (data) => set({ taskModalState: data }),

  createProjectState: "close",
  setCreateProjectState: (data) => set({ createProjectState: data }),
  deleteProjectState: "close",
  setDeleteProjectState: (data) => set({ deleteProjectState: data }),
});

const useModalStore = create(modalStore);

export default useModalStore;
