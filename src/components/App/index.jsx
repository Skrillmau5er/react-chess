import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import GameRoutes from "../Game";
import Home from "./Home";
import Tutorial from "./Tutorial";
import Login from "./Login";
import CreateUser from "./CreateUser";
import { auth } from "../../services/firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/App/index.scss";
import ErrorPage from "./ErrorPage";
import PrivateRoute from "./PrivateRoute";
import Menu from "../Common/Menu";
import Account from "./Account";
import GameStats from "./GameStats";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((newUser) => {
      if (newUser) {
        console.log(newUser);
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
            main: '#448AFF'
          }
        },
      }),
    []
  );

  return (
    <div className="App">
      {isLoaded && (
        <ThemeProvider theme={theme}>
          <Router>
            <Menu hide={hideMenu} />
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
                  render={(props) => <GameRoutes {...props} user={user} setHideMenu={setHideMenu} />}
                />
                <PrivateRoute
                  path="/tutorial"
                  render={(props) => <Tutorial {...props} />}
                />
                <Route
                  path="/account"
                  render={(props) => <Account {...props} />}
                />
                <Route
                  path="/stats"
                  render={(props) => <GameStats {...props} />}
                />
                <Route path="*">
                  <ErrorPage />
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
