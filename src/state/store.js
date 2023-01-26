import { configureStore } from '@reduxjs/toolkit';
import adminReducers from "./reducers/adminReducers";
import authReducers from "./reducers/authReducers";
import entitiesReducers from './reducers/entitiesReducers';
import userReducers from "./reducers/userReducers";

const reducer = {
       auth: authReducers,
       entities: entitiesReducers,
       user: userReducers,
       admin: adminReducers
}

export const store = configureStore({reducer});