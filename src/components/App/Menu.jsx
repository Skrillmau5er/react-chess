import { Link } from "react-router-dom";
import React from "react";
import "../../styles/index.scss";
import Button from "@material-ui/core/Button";

const Menu = () => {
  return (
    <div className="menu">
      <h1>Welcome to Quick Chess</h1>
      <Button variant="container" color="primary">
        <Link to="/game/">Start New Game</Link>
      </Button>
      <Button variant="container" color="primary">
        <Link to="/tutorial/">Tutorial</Link>
      </Button>
    </div>
  );
}

export default Menu;
