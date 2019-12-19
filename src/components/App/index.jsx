import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Game from "../Game";
import Menu from "./Menu";
import Tutorial from "./Tutorial";
import "../../styles/index.scss";

export default class App extends React.Component {

	render() {
		return (
			<div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Menu}/>
            <Route path="/game/" component={Game} />
            <Route path="/tutorial/" component={Tutorial} />
          </Switch>
        </Router>
			</div>
		);
	}
}
