import React, { useState, useEffect } from "react";
import "./Register.css";

import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { bringCharacters, registerUser } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';

export const Register = () => {

  const navigate = useNavigate();

  const [artists, setArtists] = useState([]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    artist: ''
  })

  const [userError, setUserError] = useState({
    nameError: '',
    emailError: '',
    passwordError: '',
    phoneError: ''
  })

  useEffect(()=>{
    
    if(artists.length === 0){
      
      bringCharacters()
        .then(
          results => {
            setArtists(results.data.results)
          }
        )
        .catch(error => console.log(error))
    } else {

      console.log("artists vale...", artists)

    }
  }, [artists]);

  const functionHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorCheck = (e) => {

    let error = "";

    error = validator(e.target.name, e.target.value);

    setUserError((prevState) => ({
        ...prevState,
        [e.target.name + 'Error']: error,
    }));
  }

  const Submit = () => {

    for(let test1 in user){
      if(user[test1] === ""){
        return;
      }

    }

    for(let test in userError){
      if(userError[test] !== ""){
        return;
      }
    }

    registerUser(user)
      .then(
        resultado => {
          //si todo ha ido bien, redirigiremos a login...

          setTimeout(()=>{
            navigate("/login");
          },500)
        }
      )
      .catch(error=> console.log(error));
  }

  return (
    <div className="registerDesign">
      <CustomInput
        disabled={false}
        design={`inputDesign ${userError.emailError !== "" ? 'inputDesignError' : ''}`}
        type={"email"}
        name={"email"}
        placeholder={""}
        value={""}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='errorMsg'>{userError.emailError}</div>
      <CustomInput
        disabled={false}
        design={`inputDesign ${userError.passwordError !== "" ? 'inputDesignError' : ''}`}
        type={"password"}
        name={"password"}
        placeholder={""}
        value={""}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='errorMsg'>{userError.passwordError}</div>
      <CustomInput
        disabled={false}
        design={`inputDesign ${userError.nameError !== "" ? 'inputDesignError' : ''}`}
        type={"text"}
        name={"name"}
        placeholder={""}
        value={""}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className='errorMsg'>{userError.nameError}</div>
      <CustomInput
        disabled={false}
        design={`inputDesign ${userError.phoneError !== "" ? 'inputDesignError' : ''}`}
        type={"text"}
        name={"phone"}
        placeholder={""}
        value={""}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />

      {
        artists.length > 0 &&

        <select name="artist" onChange={functionHandler}>
          <option>Select an artist</option>
          {
            artists.map(
              artist => {
                return (
                  <option key={artist.id}>{artist.name}</option>
                )
              }
            )
          }
        </select>
      }
      <div className='errorMsg'>{userError.phoneError}</div>
      <div className='buttonSubmit' onClick={Submit}>Submit</div>
    </div>
  );
};
