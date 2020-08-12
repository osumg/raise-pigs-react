import React, {Component} from "react";
import styles from './login.module.css';
import {DashboardOutlined} from '@ant-design/icons';
import {Input, Checkbox, Button} from "antd";

export default class Login extends Component {

    state = {
        isLogin: true,

    }

    changeType = () => {
        this.setState({
            isLogin: !this.state.isLogin
        })
    }

    render() {
        const {isLogin} = this.state;
        return (
            <div className={styles.main}>
                <div className={styles.icon}>
                    <DashboardOutlined style={{color: '#041527', fontSize: '30px'}}/>
                </div>
                <div className={styles.title}>React个人实践管理系统</div>
                <div className={styles.login}>
                    <div className={styles.loginText}>欢迎登录</div>
                    <div className={styles.inputDiv}>
                        <Input placeholder={'请输入用户账号'} style={{width: '260px'}}/>
                        <Input.Password placeholder={'请输入密码'} style={{width: '260px', marginTop: '10px'}}/>
                        {!isLogin
                            ? <Input.Password placeholder={'请确认密码'} style={{width: '260px', marginTop: '10px'}}/>
                            : null
                        }
                        {isLogin
                            ? <div className={styles.checkboxDiv}>
                                <Checkbox>记住密码</Checkbox>
                                <Checkbox>自动登录</Checkbox>
                            </div>
                            : null
                        }

                        <Button type={isLogin?"primary":'danger'} style={{width: '260px', marginTop: '10px', fontSize: '16px'}}>{isLogin?'登录':'注册'}</Button>
                    </div>
                    <div className={styles.registerUser}>
                        <Button type="text" onClick={this.changeType} style={{fontSize: '13px', color: '#666'}}>
                            {isLogin ? '注册用户' : '去登陆'}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
