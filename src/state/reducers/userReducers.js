import { createSlice } from "@reduxjs/toolkit";


const initialState = {
       posts: [],
       drafts: []
};

export const userSlice = createSlice({
       name: "user",
       initialState,
       reducers: {
              setUserData: (state, action) => {
                     state.posts = action.payload.posts;
                     state.drafts = action.payload.drafts;
              },
              resetUserData: (state) => {
                     state.posts = [];
                     state.drafts = [];
              },
              removePost: (state, action) => {
                     state.posts = state.posts.filter(post => post._id!==action.payload)
              },
              removeDraft: (state, action) => {
                     state.drafts = state.drafts.filter(draft => draft._id!==action.payload)
              }
       }
});

export const { setUserData, resetUserData, removePost, removeDraft } = userSlice.actions;

export default userSlice.reducer;
