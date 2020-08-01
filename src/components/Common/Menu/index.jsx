import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { auth } from "../../../services/firebase";
import { withRouter } from "react-router";
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import PollRoundedIcon from "@material-ui/icons/PollRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import MenuItem from "./MenuItem";
import "../../../styles/App/Menu.scss";

const Menu = ({ location, hide, user, history }) => {
  const [active, setActive] = useState(null);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const signOut = () => {
    auth.signOut().then(() => {
      window.location.href = "/";
    });
  };

  const handleChange = (event, newValue) => {
    setActive(newValue);
  };

  return (
    <div className="menu-container">
      <div className={classnames("menu", hide ? "hide-menu" : "")}>
        <div className="menu-items">
          <MenuItem
            dest={"/"}
            active={active}
            setActive={setActive}
            icon={<HomeRoundedIcon className="menu-icon" />}
            title={"Home"}
          />
          <MenuItem
            dest={"/account"}
            active={active}
            setActive={setActive}
            icon={
              <Avatar
                src={user ? user.photoURL : null}
                className="menu-icon avatar"
              />
            }
            title={"Account"}
          />
          <MenuItem
            dest={"/stats"}
            active={active}
            setActive={setActive}
            icon={<PollRoundedIcon className="menu-icon" />}
            title={"Stats"}
          />
        </div>
        <div className="menu-actions">
          <Link className="menu-link py-1" onClick={signOut}>
            <ExitToAppRoundedIcon className="menu-icon" />
            <p className="menu-item-title">Logout</p>
          </Link>
        </div>
      </div>
      <div className={classnames("menu-mobile", hide ? "hide-menu" : "")}>
        <BottomNavigation value={active} showLabels onChange={handleChange}>
          <BottomNavigationAction
            label="Home"
            value="/"
            onClick={() => history.push('/')}
            icon={<HomeRoundedIcon />}
          />
          <BottomNavigationAction
            label="Account"
            value="/account"
            onClick={() => history.push('/account')}
            icon={<Avatar src={user ? user.photoURL : null} className="avatar" />}
          />
          <BottomNavigationAction
            label="Stats"
            value="/stats"
            onClick={() => history.push('/stats')}
            icon={<PollRoundedIcon />}
          />
          <BottomNavigationAction
            label="Logout"
            onClick={signOut}
            value="/logout"
            icon={<ExitToAppRoundedIcon />}
          />
        </BottomNavigation>
      </div>
    </div>
  );
};

export default withRouter(Menu);
