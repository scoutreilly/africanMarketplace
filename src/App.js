import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ProtectedRoute from "./helpers/ProtectedRoute";
import TokenRoute from "./helpers/TokenRoute";

import Login from "./components/login";
import Home from "./Home";
import SignUpForm from "./components/signup";
import ItemContext from "./context/itemContext";
import ItemList from "./components/ItemList";
import ItemForm from "./components/itemForm";
import Item from "./components/item";
import { axiosWithAuth } from "./helpers/axiosWithAuth";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [items, setItems] = useLocalStorage("items", []);
  const [locations, setLocation] = useLocalStorage("locations", []);

  const [tempItem, setTempItem] = useLocalStorage("itemsTemp", []);

  const getLocationData = () => {
    axiosWithAuth()
      .get("/locations")
      .then((res) => {
        setLocation(res.data);
        //console.log(res.data)
      })
      .catch((err) => console.log(err));
  };

  const getData = () => {
    axiosWithAuth()
      .get("/items")
      .then((res) => {
        setTempItem(res.data);
        //console.log(res.data)
      })
      .catch((err) => console.log(err));
  };

  const getSaleData = () => {
    axiosWithAuth()
      .get("/items-for-sale")
      .then((res) => {
        setItems(res.data);
        //console.log(res.data)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getLocationData();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="container">
      <header>
        <h1>African Marketplace</h1>
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
              <Route path="/about" component={About}></Route>
              {/* <Route path="/login" componnet={Login}></Route> */}
            </Switch>
          </div>
        </Router>
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
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
            <li>
              <Link to="/" onClick={logout}>
                Logout
              </Link>
            </li>
            <li>
              <Link to="/listings">Listings</Link>
            </li>
          </ul>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <TokenRoute path="/login" component={Login} />
            <Route path="/signup" component={SignUpForm} />
            {/*create routes to be used later*/}
            {/* <Route path="/about" component={About}></Route>
            <Route path="/login" componnet={Login}></Route> [X] */}

            <ItemContext.Provider
              value={{
                items,
                getData,
                setItems,
                tempItem,
                setTempItem,
                locations,
                getLocationData,
                getSaleData,
              }}
            >
              <ProtectedRoute exact path="/listings" component={ItemList} />
              <ProtectedRoute path="/addItem" component={ItemForm} />
              <ProtectedRoute path="/details" component={Item} />
            </ItemContext.Provider>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
