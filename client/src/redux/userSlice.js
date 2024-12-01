import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserinfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserinfo } = userSlice.actions;
export default userSlice.reducer;
