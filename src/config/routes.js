import React from "react";
import {Redirect} from "react-router-dom";
import Home from "../pages/Home";
import Account from "../pages/account/account";
import Pig from "../pages/pig/pig";
import Pigsty from "../pages/pigsty/pigsty";
import Login from "../pages/login/login";
import NotFound from "./notFound";
import MainPage from "./mainPage";

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
                render: () => <Redirect to={"/home/main-page"}/>
            },
            {
                path: '/home/main/pig',
                component: Pig
            },
            {
                path: '/home/authority/account',
                component: Account
            },
            {
                path: '/home/pigsty',
                component: Pigsty
            },
            {
                path: '/home/main-page',
                component: MainPage
            }
        ]
    },
    {
        path: '/login',
        exact: true,
        component: Login
    },
    {
        path: '/*',
        component: NotFound
    }
]
