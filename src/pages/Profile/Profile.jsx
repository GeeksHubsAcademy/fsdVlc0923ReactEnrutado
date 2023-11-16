import React, { useState, useEffect } from "react";
import "./Profile.css";

import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { useNavigate } from 'react-router-dom';

//Importo elementos para conexión a RDX en modo lectura
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

export const Profile = () => {

  //Instancio navigate para poder navegar
  const navigate = useNavigate();

  //Instancio a RDX en modo lectura
  const datosRdxUser = useSelector(userData);

  //Variables de estado con hook useState en las que voy a guardar los valores de los input
  const [profile, setProfile] = useState({
    email: datosRdxUser.credentials.email,
    firstName: datosRdxUser.credentials.firstName,
    lastName: datosRdxUser.credentials.lastName,
    gender: datosRdxUser.credentials.gender,
  });

  const [profileError, setProfileError] = useState({
    emailError: '',
    firstNameError: '',
    lastNameError: '',
    genderError: '',
  });

  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    //RDX se puede seguir como un hook de useState... por lo tanto seguimos

    if(!datosRdxUser.credentials.token){
      navigate("/")
    }
  }, [datosRdxUser]);

  const errorCheck = (e) => {

    let error = "";

    error = validator(e.target.name, e.target.value);

    setProfileError((prevState) => ({
        ...prevState,
        [e.target.name + 'Error']: error,
    }));
  }

  const functionHandler = (e) => {
    setProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const sendData = () => {
    console.log("wololo")
    setTimeout(()=>{
        setIsEnabled(true)
    }, 1000)
  }

  return (
    <div className="profileDesign">
      <CustomInput
        disabled={isEnabled}
        design={`inputDesign ${
          profileError.firstNameError !== "" ? "inputDesignError" : ""
        }`}
        type={"text"}
        name={"firstName"}
        placeholder={""}
        value={profile.firstName}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <CustomInput
        disabled={isEnabled}
        design={`inputDesign ${
          profileError.lastNameError !== "" ? "inputDesignError" : ""
        }`}
        type={"text"}
        name={"lastName"}
        placeholder={""}
        value={profile.lastName}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <CustomInput
        disabled={isEnabled}
        design={`inputDesign ${
          profileError.emailError !== "" ? "inputDesignError" : ""
        }`}
        type={"email"}
        name={"email"}
        placeholder={""}
        value={profile.email}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <CustomInput
        disabled={isEnabled}
        design={`inputDesign ${
          profileError.genderError !== "" ? "inputDesignError" : ""
        }`}
        type={"text"}
        name={"gender"}
        placeholder={""}
        value={profile.gender}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      {
        isEnabled 
        ? (<div className="editDesign" onClick={()=>setIsEnabled(!isEnabled)}>Edit</div>)

        : (<div className="sendDesign" onClick={()=>sendData()}>Send</div>)
      }
    </div>
  );
};
