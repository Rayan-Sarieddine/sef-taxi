import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  role_id: "",
  img_url: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const { id, name, email, role_id, img_url } = action.payload;
      return {
        id,
        name,
        email,
        role_id,
        img_url,
      };
    },
    clearUser(state, action) {
      return { name: "", email: "", role_id: "", img_url: "" };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const user = userSlice.name;
export default userSlice.reducer;
export const extractUserSlice = (global) => {
  return global[user];
};
