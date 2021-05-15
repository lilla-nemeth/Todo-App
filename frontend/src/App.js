import React from "react";
import ToDo from "./ToDo";
import Registration from "./Registration";
import Signin from "./Signin";
// akkor kell kapcsos zárójelben beimportálni a file-t ha nincs export default csak sima export
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Route exact path="/">
          <ToDo/>
        </Route>
        <Route path="/registration">
          <Registration/>
        </Route>
        <Route path="/login">
          <Signin/>
        </Route>
      </BrowserRouter>
    </>
  );
}

export default App;
