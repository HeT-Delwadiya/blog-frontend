import { createSlice } from "@reduxjs/toolkit";
import {isAuthenticated} from "../../auth/index";

const data = isAuthenticated();

const initialState = {
       _id: data?._id ? data._id : "",
       role: data ? data.role===0 ? 0 : data.role : -1,
       name: data?.name ? data.name : "",
       email: data?.email ? data.email : "",
       token: data?.token ? data.token : ""
};

export const authSlice = createSlice({
       name: "auth",
       initialState,
       reducers: {
              setAuthData: (state, action) => {
                     state._id = action.payload._id;
                     state.role = action.payload.role;
                     state.name = action.payload.name;
                     state.email = action.payload.email;
                     state.token = action.payload.token;
              },
              resetAuthData: (state) => {
                     state._id= "";
                     state.role= -1;
                     state.name= "";
                     state.email= "";
                     state.token= "";
              },
              updateAuthData: (state, action) => {
                     state.name = action.payload.name;
                     state.email = action.payload.email;
              }
       }
});

export const { setAuthData, resetAuthData, updateAuthData } = authSlice.actions;

export default authSlice.reducer;
