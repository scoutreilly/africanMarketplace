import React from "react";
import {BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./Home"

import './App.css';

function App() {
  return (
    <div className="container">
      <header>
        <h1>African Marketplace</h1>
      </header>
      <Router>
        <div>
          <ul className="navigation">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/About">About</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
          </ul>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            {/*create routes to be used later*/}
            {/* <Route path="/about" component={About}></Route>
            <Route path="/login" componnet={Login}></Route> */}
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
