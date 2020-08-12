import React, {Component} from "react";
import {withRouter} from 'react-router-dom'
import Login from "./pages/main/login/login";


class App extends Component {
    render() {
        return <Login/>;
    }
}

export default withRouter(App);
