import {create} from "zustand"


export const useStore=create((set) =>({
     user: null,
     resetUser:() => set((state) => ({user:null})),
     setUser:(value) => set((state) => ({user:value})),
     globalLoading:true,
     setGlobalLoading:(val) => set((state) => ({globalLoading:val}))
}))