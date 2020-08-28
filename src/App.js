import React, {Component} from "react";
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import Login from "./pages/login/login";
import Home from "./pages/Home";
import {Modal, Spin} from 'antd';

class App extends Component {
    componentDidMount() {
        this.props.history.listen(() => {
            Modal.destroyAll();
        });
    }

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