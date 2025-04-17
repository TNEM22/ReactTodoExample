import { create } from "zustand";

const projectStore = (set, get) => ({
  tasks: {
    TEAM: { title: "Team", isActive: false },
    PROJECTS: { title: "Projects", isActive: true },
    TASKS: { title: "Tasks", isActive: true },
    REMINDERS: { title: "Reminders", isActive: false },
    MESSENGERS: { title: "Messengers", isActive: false },
  },
  subTasks: {
    TEAM: {},
    PROJECTS: {
      // DESIGN_SYSTEM: { title: "Design system", count: -1, isActive: false },
      // USER_FLOW: { title: "User flow", count: -1, isActive: false },
      // UX_RESEARCH: { title: "Ux research", count: -1, isActive: false },
    },
    TASKS: {
      TODO: { title: "To do", count: 0, isActive: false },
      IN_PROGRESS: { title: "In progress", count: 0, isActive: false },
      DONE: { title: "Done", count: 0, isActive: false },
    },
    REMINDERS: {},
    MESSENGERS: {},
  },
  setSubTasks: (data) => set({ subTasks: data }),
  selectedProject: null,
  setSelectedProject: (data) => set({ selectedProject: data }),
  projects: {
    // DESIGN_SYSTEM: {
    //   TODO: [],
    //   IN_PROGRESS: [],
    //   DONE: [],
    // },
    // USER_FLOW: {
    //   TODO: [],
    //   IN_PROGRESS: [],
    //   DONE: [],
    // },
    // UX_RESEARCH: {
    //   TODO: [],
    //   IN_PROGRESS: [],
    //   DONE: [],
    // },
  },
  setProjects: (data) => set({ projects: data }),
});

const useProjectStore = create(projectStore);

export default useProjectStore;
