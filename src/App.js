import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./helpers/ProtectedRoute";
import TokenRoute from "./helpers/TokenRoute";

import Home from "./Components/Home";
import About from "./Components/About";
import SignUpForm from "./Components/signup";
import ItemContext from "./context/itemContext";
import ItemList from "./Components/ItemList";
import ItemForm from "./Components/itemForm";
import Item from "./Components/item";
import Login from "./Components/login";
import { axiosWithAuth } from "./helpers/axiosWithAuth";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useEffect } from "react";

import HeaderOne from "./Components/StyledComponents/H1Styled";
import Container from "./Components/StyledComponents/ContainerStyled";
import Nav from "./Components/StyledComponents/NavStyled";
import StyledLink from "./Components/StyledComponents/LinkStyled";

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
    <Container className="container">
      <header>
        <HeaderOne>African Marketplace</HeaderOne>
        <Router>
          <div>
            <Nav className="navigation">
              <span>
                <StyledLink to="/">Home</StyledLink>
              </span>
              <span>
                <StyledLink to="/About">About</StyledLink>
              </span>
              <span>
                <StyledLink to="/Login">Login</StyledLink>
              </span>
              <span>
                <StyledLink to="/signup">SignUp</StyledLink>
              </span>
              <span>
                <StyledLink to="/" onClick={logout}>
                  Logout
                </StyledLink>
              </span>
              <span>
                <StyledLink to="/listings">Listings</StyledLink>
              </span>
            </Nav>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <TokenRoute path="/login" component={Login} />
              <Route path="/signup" component={SignUpForm} />
              {/*create routes to be used later*/}
              <Route path="/about" component={About}></Route>
              <Route path="/login" componnet={Login}></Route> [X]
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
      </header>
    </Container>
  );
}

export default App;
