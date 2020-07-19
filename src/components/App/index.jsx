import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import GameRoutes from "../Game";
import Home from "./Home";
import Tutorial from "./Tutorial";
import Login from "./Auth/Login";
import CreateUser from "./Auth/CreateUser";
import { auth } from "../../services/firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/App/index.scss";
import ErrorPage from "../Common/ErrorPage";
import PrivateRoute from "./Auth/PrivateRoute";
import Menu from "../Common/Menu";
import Account from "./Account";
import GameStats from "./Stats";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((newUser) => {
      if (newUser) {
        setUser(newUser);
      }
      setIsLoaded(true);
    });
  }, []);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        typography: {
          fontFamily: `"Baloo Paaji 2", cursive`,
        },
        palette: {
          type: "dark",
          primary: {
            main: "#EC625F",
          },
          secondary: {
            main: "#448AFF",
          },
        },
      }),
    []
  );

  return (
    <div className="App">
      {isLoaded && (
        <ThemeProvider theme={theme}>
          <Router>
            <Menu hide={hideMenu} user={user} />
            <ToastContainer />
            <div className={`body__content ${hideMenu ? "hide-menu" : ""}`}>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) =>
                    user ? (
                      <Home {...props} user={user} />
                    ) : (
                      <Login {...props} setHideMenu={setHideMenu} />
                    )
                  }
                />
                <Route
                  exact
                  path="/createUser"
                  render={(props) => (
                    <CreateUser {...props} setHideMenu={setHideMenu} />
                  )}
                />
                <Route
                  path="/game"
                  user={user}
                  render={(props) => (
                    <GameRoutes
                      {...props}
                      user={user}
                      setHideMenu={setHideMenu}
                    />
                  )}
                />
                <PrivateRoute
                  user={user}
                  path="/tutorial"
                  render={(props) => <Tutorial {...props} />}
                />
                <PrivateRoute
                  path="/account"
                  component={() => <Account setUser={setUser} user={user}/>}
                  user={user}
                />
                <PrivateRoute
                  path="/stats"
                  component={() => <GameStats setUser={setUser} user={user}/>}
                  user={user}
                />
                <Route path="*">
                  <ErrorPage setHideMenu={setHideMenu} />
                </Route>
              </Switch>
            </div>
          </Router>
        </ThemeProvider>
      )}
    </div>
  );
};

export default App;
