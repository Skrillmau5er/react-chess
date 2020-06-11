import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

const MenuItem = ({ dest, active, setActive, icon, title }) => {
  return (
    <Link
      to={dest}
      className={classNames("menu-link", active === dest ? "active" : "")}
      onClick={() => {
        setActive(dest);
      }}
    >
      {icon}
      <p className="menu-item-title">{title}</p>
    </Link>
  );
};

export default MenuItem;
