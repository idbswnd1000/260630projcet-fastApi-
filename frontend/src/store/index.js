import { configureStore } from "@reduxjs/toolkit";
import todo from "./slices/todoSlice.js";
import user from "./slices/userSlice.js";
import emp from "./slices/employeeSlice.js";

const store = configureStore({
    reducer:{
        todo, user, emp
    }
})

export default store;