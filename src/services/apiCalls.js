
import axios from 'axios';

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