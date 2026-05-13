import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AuthState, User } from "@/src/types/auth";

const MOCK_USERS: Record<string, { password: string; user: User }> = {
  "test@example.com": {
    password: "password123",
    user: {
      id: "1",
      email: "test@example.com",
      name: "John Doe",
    },
  },
  "admin@example.com": {
    password: "admin123",
    user: {
      id: "2",
      email: "admin@example.com",
      name: "Admin User",
    },
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: (email: string, password: string) => {
        const userRecord = MOCK_USERS[email];

        if (userRecord && userRecord.password === password) {
          set({ user: userRecord.user, isLoggedIn: true });
          return;
        }

        throw new Error("Invalid email or password");
      },
      logout: () => {
        set({ user: null, isLoggedIn: false });
      },
      setUser: (user: User | null) => {
        set({ user, isLoggedIn: user !== null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
    },
  ),
);
