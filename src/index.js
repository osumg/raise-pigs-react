import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import './index.css'
import {Provider} from 'react-redux';
import store from "./config/store";
import {ConfigProvider} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { renderRoutes } from "react-router-config";
import routes from "./config/routes";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ConfigProvider locale={zhCN}>
                {renderRoutes(routes)}
            </ConfigProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

    // If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
