import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
    emp_data : {},
    isLoggedIn : false,
}

const UserSlice = createSlice({
  name: "user",
  initialState: initial_state,
  reducers: {
    set_emp_data : (state,actions) => {
      const payload = actions.payload
      state.emp_data = payload
    },
    update_emp_data : (state,actions) => {
      const payload = actions.payload
    },
  },
});

export const { set_emp_data , update_emp_data} = UserSlice.actions; 
export default UserSlice.reducer;
