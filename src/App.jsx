import React from "react";
import "../src/assets/styles/app.css";
import obsWebSocket from "obs-websocket-js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [scene, setScenes] = useState({ scenes: [] });
  const [obs, setObs] = useState();
  const navigate = useNavigate();
  const Login = JSON.parse(sessionStorage.getItem("Login"));

  useEffect(() => {
    async function main() {
      try {
        const obs = new obsWebSocket();
        await obs.connect(
          `ws://${Login.IP}:${Login.Portal}`,
          `${Login.Password}`
        );
        setObs(obs);
        const datascenes = await obs.call("GetSceneList");
        setScenes(datascenes);
      } catch (e) {
        console.log(e);
        alert(
          "Credenciais erradas! Faça o Login novamente e verifique se o obs está aberto."
        );
        navigate("/");
        window.location.reload(true);
      }
    }
    main();
  }, []);

  async function handleClick(sceneName) {
    try {
      await obs.call("SetCurrentProgramScene", { sceneName: sceneName });
    } catch (e) {
      console.log(e);
    }
  }

  console.log("scenes:", scene.scenes);

  return (
    <>
      <div className="container">
        <div className="nav">OBS Scene Deck</div>
        <div className="buttons">
          {obs &&
            scene.scenes.map((deck) => {
              return (
                <button
                  key={deck.sceneIndex}
                  className="button-deck"
                  onClick={() => handleClick(deck.sceneName)}
                >
                  {deck.sceneName}
                </button>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;
