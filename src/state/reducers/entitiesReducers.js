import { createSlice } from "@reduxjs/toolkit";

const initialState = {
              pageNumber: 1,
              pageSize: 10,
              totalPages: 1,
              posts: []
};

export const entitySlice = createSlice({
       name: "entities",
       initialState,
       reducers: {
              setPosts: (state, action) => {
                     state.posts = action.payload
              },
              setPageSize: (state, action) => {
                     state.pageSize = action.payload
              },
              setTotalPages: (state, action) => {
                     state.totalPages = action.payload
              },
              setPageNumber: (state, action) => {
                     state.pageNumber = action.payload
              },
              resetEntityData: (state) => {
                     state = {
                            pageNumber: 1,
                            pageSize: 10,
                            totalPages: 1,
                            posts: []
                     }
              }
       }
});

export const { setPosts, setPageSize, setTotalPages, setPageNumber, resetEntityData } = entitySlice.actions;

export default entitySlice.reducer;
