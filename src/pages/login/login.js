import React, {Component} from "react";
import styles from './login.module.css';
import {DashboardOutlined} from '@ant-design/icons';
import {Button, Checkbox, Input} from "antd";
import {connect} from "react-redux";
import storeAction from "./store/action";
import {fetchLogin} from "../../utils/fetchUtils";

@connect(state => ({storeState: state.loginReducer}), storeAction)
class Login extends Component {

    login = () => {
        let {username, password} = this.props.storeState;
        fetchLogin('/login',
            'username=' + username +
            '&password=' + password, res => {
                localStorage.setItem("token", res.token);
                localStorage.setItem("userInfo", res.userInfo);
                this.props.history.push("/service");
            })
    }

    pressEnter1 = () => {
        this.pwdInp.focus();
    }

    pressEnter2 = () => {
        if (this.props.storeState.isLogin) {
            this.btn.click();
        } else {
            //zhuce
        }
    }

    render() {
        const {isLogin} = this.props.storeState;
        const {
            setUsername,
            setPassword,
            changeLoginType,
            login
        } = this.props;
        return (
            <div className={styles.main}>
                <div className={styles.icon}>
                    <DashboardOutlined style={{color: '#041527', fontSize: '30px'}}/>
                </div>
                <div className={styles.title}>React个人实践管理系统</div>
                <div className={styles.login}>
                    <div className={styles.loginText}>欢迎登录</div>
                    <div className={styles.inputDiv}>
                        <Input placeholder={'请输入用户账号'} style={{width: '260px'}} onChange={setUsername}
                               onPressEnter={this.pressEnter1}/>
                        <Input.Password ref={pwdInp => this.pwdInp = pwdInp} placeholder={'请输入密码'}
                                        style={{width: '260px', marginTop: '10px'}}
                                        onChange={setPassword} onPressEnter={this.pressEnter2}/>
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

                        <Button type={isLogin ? "primary" : 'danger'} style={{
                            width: '260px',
                            marginTop: '10px',
                            fontSize: '16px'
                        }} onClick={this.login} ref={btn => this.btn = btn}>{isLogin ? '登录' : '注册'}</Button>
                    </div>
                    <div className={styles.registerUser}>
                        <Button type="text" onClick={changeLoginType.bind(this, !isLogin)}
                                style={{fontSize: '13px', color: '#666'}}>
                            {isLogin ? '注册用户' : '去登陆'}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
