
import axios from 'axios';

const API_KEY_TMDB = '210d6a5dd3f16419ce349c9f1b200d6d';
const ROOT_API_TMDB = 'https://api.themoviedb.org/3/';

export const bringCharacters = async () => {

    return await axios.get(`https://rickandmortyapi.com/api/character/?page=6`);
}

export const logUser = async (body) => {

    let user = {
        username : body.email,
        password: body.password
    }
    //SIMULACRO DE CONEXION REAL A API
    return await axios.post(`https://dummyjson.com/auth/login`, user);

}

export const registerUser = async (body) => {
    //SIMULACRO DE CONEXION REAL A API
    // return await axios.post(`elendpointdemipreciosobackend`, body);
    return "todo ha ido bien"
}

export const searchMovie = async (criteria) => {

    return await axios.get(`${ROOT_API_TMDB}search/movie?query=${criteria}&include_adult=false&language=en-US&page=1&api_key=${API_KEY_TMDB}`)
}

export const latestMovie = async () => {

    return await axios.get(`${ROOT_API_TMDB}trending/movie/day?language=en-US&page=1&api_key=${API_KEY_TMDB}`)
}

