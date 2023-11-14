import React, { useEffect, useState } from "react";
import "./Header.css";
import { LinkButton } from "../LinkButton/LinkButton";
import { useLocation, useNavigate } from 'react-router-dom';

//REDUX
import { useSelector, useDispatch } from "react-redux";
import { logout, userData } from "../../pages/userSlice";
import { add_search } from "../../pages/searchSlice";

export const Header = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const dispatch = useDispatch();
  const rdxCredentials = useSelector(userData);

  const [criteria, setCriteria] = useState("");

  useEffect(()=>{

    //aqui guardaré en redux el criterio de búsqueda......
    dispatch(add_search(criteria))

  },[criteria]);

  const logOutMe = () => {

    dispatch(logout( {credentials : ""}))

    navigate("/")
    
  }

  const handleCriteria = (e) => {
    setCriteria(e.target.value)
  }


  return (
    <div className="headerDesign">

      {
        location.pathname === "/films" &&

        <input 
          type="text"
          placeholder=""
          name="criteria"
          onChange={handleCriteria}
        />
      }


      <LinkButton path={"/"} title={"Home"} />
      <LinkButton path={"/films"} title={"Films"} />

      {!rdxCredentials?.credentials.token ? (
        <>
          <LinkButton path={"/login"} title={"Login"} />
          <LinkButton path={"/register"} title={"Register"} />
        </>
      ) : (
        <>
          <LinkButton path={"/profile"} title={rdxCredentials.credentials.firstName} />
          <div onClick={logOutMe}>
            <LinkButton path={"/"} title={"log out"} />  
          </div>
        </>
      )}
    </div>
  );
};
