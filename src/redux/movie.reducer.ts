import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commonAPI from "services/common-api";
import { IMovie } from "interfaces/movie.interface";
import { ACTION_KEY, ACTION_NAME } from "config/global.enum";
interface MoviesState {
    data: IMovie;
    isLoading: boolean;
    error: string;
}
const initialState: MoviesState = {
    data: {} as IMovie,
    isLoading: false,
    error: "",
};

// sử dụng: dispatch(getMovieList(params))
export const addMovie = createAsyncThunk(
    ACTION_KEY.ADD_MOVIE,

    //Hàm này nhận vào 2 tham số:
    // - 1: tham số truyền vào khi dispatch action getMovieList
    // - 2: ThunkAPI: là 1object chứa các hàm của redux thunk như dispatch,getState,...
    async (movie: IMovie) => {
        try {
            const data = await commonAPI.addNewMovie(movie);
            // call api thành công return về data
            return data;
        } catch (error) {
            // call api thất bại
            throw error;
        }
    }
);
const movieSlice = createSlice({
    name: ACTION_NAME.MOVIE, // namespace để tạo ra các action types
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addMovie.pending, (state) => {
            //request đang được thực thi => set isLoading thành true để show loading ra giao diện
            return { ...state, isLoading: true };
        });
        builder.addCase(addMovie.fulfilled, (state, { payload }) => {
            return { ...state, isLoading: false, data: payload };
        });
        builder.addCase(addMovie.rejected, (state, { error }) => {
            // error được throw từ hàm getMovieList
            return { ...state, isLoading: false, error: error.message as string };
        });
    },
});
export default movieSlice.reducer;
