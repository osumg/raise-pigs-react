import React from "react";
import {MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined,} from '@ant-design/icons';

export default [
    {
        title: '主体管理',
        key: 'main',
        icon: <UserOutlined/>,
        menus: [
            {
                subTitle: '猪猪管理',
                url: '/home/main/pig',
            }
        ]
    },
    {
        title: '权限管理',
        key: 'authority',
        icon: <UserOutlined/>,
        menus: [
            {
                subTitle: '用户管理',
                url: '/home/authority/account'
            }
        ]
    }
]
