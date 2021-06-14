import React, { useEffect, useState } from "react";
import ToDo from "./ToDo";
import SignUp from "./SignUp";
import Login from "./Login";
// akkor kell kapcsos zárójelben beimportálni a file-t ha nincs export default csak sima export
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import "./App.css";

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
          <Route path="/signup">
            <SignUp/>
          </Route>
          <Route path="/login">
            <Login setToken={setToken}/>
          </Route>
          {/* "*" - fallback route */}
          <Route path="*">
            <Login setToken={setToken}/>
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
//         <Route path="/signup">
//           <SignUp/>
//         </Route>
//         <Route path="/login">
//           <Login/>
//         </Route>
//       </BrowserRouter>
//     </>
//   ) : (
//       <>
//       <BrowserRouter>
//         <Route exact path="/">
//           <ToDo/>
//         </Route>
//         <Route path="/signup">
//           <SignUp/>
//         </Route>
//         <Route path="/login">
//           <Login/>
//         </Route>
//       </BrowserRouter>
//     </>
//   );
  
};

export default App;
