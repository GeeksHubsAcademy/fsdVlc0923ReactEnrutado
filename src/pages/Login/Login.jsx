import React, { useState, useEffect } from "react";
import "./Login.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { logUser } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';
import { validator } from "../../services/useful";
import { jwtDecode } from "jwt-decode";

//Importo Rdx

import { useSelector, useDispatch } from "react-redux";  //useDispatch es necesario para emitir acciones
import { login, userData } from "../userSlice";

export const Login = () => {

  const navigate = useNavigate();

  const rdxUserData = useSelector(userData);
  const dispatch = useDispatch();

  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });

  const [msgError, setMsgError] = useState('');

  useEffect(()=>{
    if(rdxUserData.credentials.token){
      navigate("/")
    }
  },[rdxUserData])

  const functionHandler = (e) => {
    setCredenciales((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const errorCheck = () => {
    console.log("ha ha ha ha");
  }

  const logMe = () => {

    logUser(credenciales)
        .then(
            resultado => {

                let decodificado = jwtDecode(resultado.data.token);
                console.log("soy el token decodificado....", decodificado);
                //Aqui guardaría el token........en RDXXX
                dispatch(login({ credentials: resultado.data }))

                //Una vez guardado el token....nos vamos a home....
                setTimeout(()=>{
                    navigate("/");
                },500);
            }
        )
        .catch(error => {
          console.log(error)
          setMsgError(error.message);
        });

  }

  return (
    <div className="loginDesign">
      <CustomInput
        disabled={false}
        design={"inputDesign"}
        type={"email"}
        name={"email"}
        placeholder={""}
        value={""}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <CustomInput
        disabled={false}
        design={"inputDesign"}
        type={"password"}
        name={"password"}
        placeholder={""}
        value={""}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='buttonSubmit' onClick={logMe}>Log Me!</div>
      <div>{msgError}</div>
    </div>
  );
};
