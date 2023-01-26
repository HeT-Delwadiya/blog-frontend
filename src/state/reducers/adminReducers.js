import { createSlice } from "@reduxjs/toolkit";

const initialState = {
       pageNumber: 1,
       pageSize: 10,
       totalPages: 1,
       publishedPosts: [],
       pendingPosts: [],
       users: [],
       refreshUsers: false,
       refreshPublishedPosts: false,
       refreshPendingPosts: false
};

export const adminSlice = createSlice({
       name: "admin",
       initialState,
       reducers: {
              setPublishedPosts: (state, action) => {
                     state.publishedPosts = action.payload
              },
              setPendingPosts: (state, action) => {
                     state.pendingPosts = action.payload
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
              setUsers: (state, action) => {
                     state.users = action.payload
              },
              removeUser: (state, action) => {
                     state.users = state.users.filter(user => user._id!==action.payload)
              },
              removePublishedPost: (state, action) => {
                     state.publishedPosts = state.publishedPosts.filter(post => post._id!==action.payload)
              },
              updatePendingPostToPublished: (state, action) => {
                     let nPost;
                     nPost = state.pendingPosts.filter(post => post._id === action.payload);
                     state.pendingPosts = state.pendingPosts.filter(post => post._id!==action.payload);
              },
              refreshUsersList: (state) => {
                     state.refreshUsers = !state.refreshUsers;
              },
              refreshPublishedPostsList: (state) => {
                     state.refreshPublishedPosts = !state.refreshPublishedPosts;
              },
              refreshPendingPostsList: (state) => {
                     state.refreshPendingPosts = !state.refreshPendingPosts;
              },
              resetAdminData: (state) => {
                     state.pageNumber= 1;
                     state.pageSize= 10;
                     state.totalPages= 1;
                     state.publishedPosts= [];
                     state.pendingPosts= [];
                     state.users= [];
              }
       }
});

export const { setPublishedPosts, setPendingPosts, setPageSize, setTotalPages, setPageNumber, setUsers, removeUser,refreshUsersList, refreshPublishedPostsList, refreshPendingPostsList, removePublishedPost, updatePendingPostToPublished, resetAdminData } = adminSlice.actions;

export default adminSlice.reducer;
