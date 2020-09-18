import React from "react";
import {DownOutlined} from '@ant-design/icons';
import {Menu, Dropdown} from "antd";
import styles from "./keyValueDropDown.module.css";

export default function KeyValueDropDown(props) {
    const {
        kindMenu, menuIndex, title, clickMenu = () => {
        }
    } = props;

    const menu = (
        <Menu onClick={clickMenu}>
            {kindMenu.map((item, index) => <Menu.Item key={index.toString()}>
                <span>{item.kindName}</span>
            </Menu.Item>)}
        </Menu>
    );

    return (
        <div>
            <div className={styles['drop-down-div']}>
                <span className={styles['drop-down-left']}>{title}：</span>
                <Dropdown overlay={menu} trigger={['click']} className={styles['drop-down-right']}>
                    <div className={styles['content']}>
                        <div>{kindMenu.length > 0 ? kindMenu[menuIndex].kindName : ''}</div>
                        <DownOutlined/>
                    </div>
                </Dropdown>
            </div>
            <span className={styles['tip']}> </span>
        </div>)
}
