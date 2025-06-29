import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  fullname: string;
  email: string;
  password: string;
  rememberMe: boolean;
  role?: string;
};

type UserState = {
  users: User[];
  currentUser: User | null;
};

const initialState: UserState = {
  users: [],
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      state.currentUser = action.payload;
    },
    logoutUser: (state) => {
      if (state.currentUser) {
        // state.users = state.users.filter(
        //   (user) => user.email !== state.currentUser?.email
        // );
      }
      state.currentUser = null;
    },
  },
});

export const { addUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
