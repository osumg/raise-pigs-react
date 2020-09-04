import React from "react";
import {Redirect} from "react-router-dom";
import Home from "../pages/Home";
import Account from "../pages/account/account";
import Pig from "../pages/pig/pig";
import Pigsty from "../pages/pigsty/pigsty";
import Login from "../pages/login/login";

export default [
    {
        path: '/',
        exact: true,
        render: () => <Redirect to={"/home"}/>
    },
    {
        path: '/home',
        component: Home,
        routes: [
            {
                path: '/home',
                exact: true,
                render: () => <Redirect to={"/home/account"}/>
            },
            {
                path: '/home/pig',
                component: Pig
            },
            {
                path: '/home/account',
                component: Account
            },
            {
                path: '/home/pigsty',
                component: Pigsty
            }
        ]
    },
    {
        path: '/login',
        component: Login
    }
]
