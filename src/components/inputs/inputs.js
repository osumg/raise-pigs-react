import React from "react";
import {Input} from "antd";
import styles from './inputs.module.css'
import {Menu, Dropdown, Button} from 'antd';
import {DownOutlined} from '@ant-design/icons';

export function KeyValueInput(props) {
    const {title, placeholder, onChange, tip} = props;
    return (
        <div className={styles['input-comp']}>
            <div className={styles['main-input']}>
                <span className={styles['input-span']}>{title}：</span>
                <Input placeholder={placeholder} allowClear style={{width: '200px'}} onChange={onChange}/>
            </div>
            {tip
                ? <span className={styles['tip']}>{tip}</span>
                : null
            }
        </div>
    )
}

export function PasswordInput(props) {
    const {title, placeholder, onChange, tip} = props;
    return (
        <div className={styles['input-comp']}>
            <div className={styles['main-input']}>
                <span className={styles['input-span']}>{title}：</span>
                <Input.Password placeholder={placeholder} style={{width: '200px'}} onChange={onChange}/>
            </div>
            {tip
                ? <span className={styles['tip']}>{tip}</span>
                : null
            }
        </div>
    );
}

export function TextAreaInput(props) {
    const {title, placeholder, onChange, rows} = props;
    return (
        <div style={{
            display: 'flex',
            'margin': '10px 0'
        }}>
            <span className={styles['input-span']}>{title}：</span>
            <Input.TextArea placeholder={placeholder} style={{flex: 2}} rows={rows} onChange={onChange}/>
        </div>
    );
}

export function DropdownInput(props) {
    const {} = props;
    const menu = (
        <Menu>
            <Menu.Item key="1">
                1st menu item
            </Menu.Item>
            <Menu.Item key="2">
                2nd menu item
            </Menu.Item>
            <Menu.Item key="3">
                3rd menu item
            </Menu.Item>
        </Menu>
    );
    return (
        <div>
            <Dropdown overlay={menu}>
                <Button>
                    Button <DownOutlined/>
                </Button>
            </Dropdown>
        </div>
    );
}
