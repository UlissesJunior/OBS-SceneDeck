import React from "react";
import "../src/assets/styles/app.css";
import OBSWebSocket from "obs-websocket-js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [scene, setScenes] = useState({ scenes: [] });
  const [OBS, setObs] = useState();
  const navigate = useNavigate();
  const Login = JSON.parse(localStorage.getItem("Login"));

  useEffect(() => {
    async function main() {
      try {
        const obs = new OBSWebSocket();
        // if (Login.IP && Login.Portal && Login.Password == "") {
          // await obs.connect();
        // }
        // if (Login.IP && Login.Portal && Login.Password != "") {
          await obs.connect(
            `ws://${Login.IP}:${Login.Portal}`,
            `${Login.Password}`
          );
        // }
        const datascenes = await obs.call("GetSceneList");
        setScenes(datascenes);
      } catch (e) {
        console.log(e);
        alert(
          "Credenciais erradas! Faça o Login novamente e verifique se o OBS está aberto."
        );
        navigate("/");
        window.location.reload(true);
      }
    }
    main();
  }, []);

  return (
    <>
      <div className="container">
        <div className="nav">OBS Scene Deck</div>
        <div className="buttons">
          {scene.scenes.map((deck) => {
            return <button className="button-deck">{deck.sceneName}</button>;
          })}
        </div>
      </div>
    </>
  );
}

export default App;
