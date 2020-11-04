import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3"
,});

// instance.get('/some-page'); =>  https://api.themoviedb.org/3/some-page

export default instance;