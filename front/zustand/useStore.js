import { create } from "zustand";

export const useStore = create((set) => ({
  user: null,
  resetUser: () => set((state) => ({ user: null })),
  setUser: (value) => set((state) => ({ user: value })),
  globalLoading: true,
  setGlobalLoading: (val) => set((state) => ({ globalLoading: val })),
}));

export const solverStore = create((set) => ({
  question: null,
  setQuestion: (value) => set((state) => ({ question: value })),
  submissions: [],
  addNewSubmission: (value) =>
    set((state) => ({ submissions: [value, ...state.submissions] })),
  setSubmissions: (value) => set((state) => ({ submissions: value })),
  newSubmissionLoading: false,
  setNewSubmissionLoading: (value) =>
    set((state) => ({ newSubmissionLoading: value })),
  newSubmissionData: null,
  setNewSubmissionData: (value) =>
    set((state) => ({ newSubmissionData: value })),
  note: null,
  setNote: (value) => set((state) => ({ note: value })),
  setSection: "description",
  setSection: (value) => set((state) => ({ section: value })),
}));
