import { configureStore } from "@reduxjs/toolkit";
// configureStore : mặc định đã được setup redux-devtool và redux thunk
import movie_reducer from "./movie.reducer";
const store = configureStore({
    reducer: {
        movie_reducer,
    },
    //devtools: false // có enable devtool hay không, mặc định là true
    //   devTools: false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
