import { IMovie } from "interfaces/movie.interface";
import axiosClient from "./axios";
import { CONFIG_URL } from "./config.enum";

const commonAPI = {
    // add new movie
    addNewMovie: (data: IMovie) => {
        return axiosClient.post<unknown, IMovie>(CONFIG_URL.ADD_MOVIE_URL, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },
};
export default commonAPI;
