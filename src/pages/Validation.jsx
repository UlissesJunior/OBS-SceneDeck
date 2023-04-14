import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OBSWebSocket from "obs-websocket-js";
import "../assets/styles/app.css";

function Validation() {
  const [IP, setIP] = useState();
  const [portal, setPortal] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const Login = () => {
    const data = {
      IP: IP,
      Portal: portal,
      Password: password,
    };
    sessionStorage.setItem("Login", JSON.stringify(data));
  };

  async function AddLocalStorage() {
    Login();
    navigate("/ScreenDeck");
  }

  return (
    <>
      <div className="container-login">
        <input
          onChange={(e) => {
            setIP(e.target.value);
          }}
          placeholder="IP da porta"
          type="text"
        />
        <input
          onChange={(e) => {
            setPortal(e.target.value);
          }}
          placeholder="Porta do Servidor"
          type="text"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Senha"
          type="text"
        />
        <button className="button-login" onClick={AddLocalStorage}>Login</button>
      </div>
    </>
  );
}

export default Validation;
