import axiosClient from "./axiosClient";
import apiConfigs from "./apiConfigs";

export const category = {
    movie: 'Movie'
}

export const movieType = {
    // upcoming: 'upcoming',
    // popular: 'popular',
    // top_rated: 'top_rated',
    title: "title",
    overview: "overview",
    poster_Path: "poster_Path",
    backdrop_Path: "backdrop_Path",
}



const tmdbApi = {
    getMoviesList: (params) => {
        const url = apiConfigs.baseUrl + '/Movie/';
        return axiosClient.get(url, params);
    },
    getDateList: (id, params) => {
        const url = apiConfigs.aPiRoom + '/controller/movie/' + id;
        return axiosClient.get(url, params);
    },
    getVideos: (id, params) => {
        const url = apiConfigs.baseUrl + '/Movie/' + id;
        return axiosClient.get(url, params);
    },
    search: (cate, params) => {
        const url = 'search/' + category[cate];
        return axiosClient.get(url, params);
    },
    detail: (id, params) => {
        const url = '/Movie/' + id;
        return axiosClient.get(url, params);
    },
    creadit: (cate, id) => {
        const url = category[cate] + '/' + id + '/credits';
        return axiosClient.get(url, { params: {} });
    },
    similar: (cate, id) => {
        const url = category[cate] + '/' + id + '/similar';
        return axiosClient.get(url, { params: {} });
    }
}

export default tmdbApi;