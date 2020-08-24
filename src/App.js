import React, {Component} from "react";
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import Login from "./pages/main/login/login";
import {routes} from "./config/routes";
import Home from "./pages/Home";


class App extends Component {
    render() {
        return (
            <Switch>
                <Route key={"login"} path={"/login"} component={Login}/>
                <Route key={"home"} path={"/service"} component={Home}/>
                <Redirect path="/" to="/login"/>
            </Switch>
        )
    }
}

export default withRouter(App);
