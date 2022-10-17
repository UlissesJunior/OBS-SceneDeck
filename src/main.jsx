import React from 'react'
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById("root"))
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from '../src/App'
import Validation from '../src/pages/Validation'
import Rota from '../src/routes/route'

root.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" exact={true} element={<Rota />}></Route>
        <Route path="/Validation" exact={true} element={<Validation />}></Route>
        <Route path="/ScreenDeck" element={<App />}></Route>
    </Routes>
  </BrowserRouter>
);