import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,

  login: ({ user, accessToken, refreshToken }) => {
    const authData = {
      user,
      accessToken,
      refreshToken,
    };

    localStorage.setItem("auth", JSON.stringify(authData));

    set(authData);
  },

  logout: () => {
    localStorage.removeItem("auth");

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
    });
  },
}));

export default useAuthStore;
