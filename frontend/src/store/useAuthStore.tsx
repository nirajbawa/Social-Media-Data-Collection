import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Data {
  isAuthenticated: boolean;
  username?: string;
  token?: string;
}

export interface AuthStore {
  data: Data;
  setData: (data: Data) => void;
}

const useAuthStore = create(
  persist(
    (set): AuthStore => ({
      data: { isAuthenticated: false, username: "", token: "" },
      setData: (data: Data) => set({ data: data }),
    }),
    { name: "social-tracker" }
  )
);

export default useAuthStore;
