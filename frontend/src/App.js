import React, { useEffect, useState } from "react";
import ToDo from "./ToDo";
import Registration from "./Registration";
import Signin from "./Signin";
// akkor kell kapcsos zárójelben beimportálni a file-t ha nincs export default csak sima export
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";

function App() {
  const [token, setToken] = useState(null);


  useEffect(() => {
    let tokenFromLocalStorage = localStorage.getItem("token");

     if (tokenFromLocalStorage) {
        setToken(tokenFromLocalStorage);
      }
  });
  // console.log(token);

  function handleLogOut() {
    localStorage.removeItem("token");

    setToken(null);

  }

 if (!token) {
   return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/registration">
            <Registration/>
          </Route>
          <Route path="/login">
            <Signin setToken={setToken}/>
          </Route>
          {/* "*" - fallback route */}
          <Route path="*">
            <Signin setToken={setToken}/>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
    );
 } 
   return (
    <>
    <BrowserRouter>
      <Navbar handleLogOut={handleLogOut}/>
      <Switch>
        {/* exact - only route to the path with one / */}
        <Route exact path="/">
          <ToDo token={token}/>
        </Route>
        <Route path="*">
          <ToDo token={token}/>
        </Route>
      </Switch>
    </BrowserRouter>
  </>
  );
 

//  token ? (
//       <>
//       <BrowserRouter>
//         <Route exact path="/">
//           <ToDo/>
//         </Route>
//         <Route path="/registration">
//           <Registration/>
//         </Route>
//         <Route path="/login">
//           <Signin/>
//         </Route>
//       </BrowserRouter>
//     </>
//   ) : (
//       <>
//       <BrowserRouter>
//         <Route exact path="/">
//           <ToDo/>
//         </Route>
//         <Route path="/registration">
//           <Registration/>
//         </Route>
//         <Route path="/login">
//           <Signin/>
//         </Route>
//       </BrowserRouter>
//     </>
//   );
  
};

export default App;
