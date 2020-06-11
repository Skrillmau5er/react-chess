import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { auth } from "../../../services/firebase";
import { withRouter } from "react-router";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import PollRoundedIcon from "@material-ui/icons/PollRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import MenuItem from "./MenuItem";
import "../../../styles/App/Menu.scss";

const Menu = ({ location, hide }) => {
  const [active, setActive] = useState(null);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const signOut = () => {
    auth.signOut().then(() => {
      window.location.href = "/";
    });
  };

  return (
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
          icon={<AccountCircleRoundedIcon className="menu-icon" />}
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
        <Link className="menu-link" onClick={signOut}>
          <ExitToAppRoundedIcon className="menu-icon" />
          <p className="menu-item-title">Logout</p>
        </Link>
      </div>
    </div>
  );
};

export default withRouter(Menu);
