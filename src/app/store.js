import { configureStore } from "@reduxjs/toolkit";
import userdetailsReducer from "../features/userdetailsSlice";
//We have to import reducer without {    } curly braces

const store = configureStore({
    reducer: {
        userDetails: userdetailsReducer,
    },
});

export default store;
