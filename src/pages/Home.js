import React, {Component} from "react";
import {routes} from '../config/routes'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom'
import {Layout, Menu, Breadcrumb} from 'antd';
import {UserOutlined, AppstoreOutlined, NotificationOutlined, AppleOutlined, BugOutlined} from '@ant-design/icons';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

class Home extends Component {
    toPath = (path) => {
        this.props.history.push(`${path}`);
    }

    render() {
        return (
            <Layout>
                <Header style={{position: 'fixed', zIndex: 1, width: '100%', display: 'flex', alignItems: 'center'}}>
                    <AppleOutlined style={{color: '#fff', fontSize: 25}}/><AppleOutlined
                    style={{color: '#fff', fontSize: 25}}/><AppleOutlined
                    style={{color: '#fff', fontSize: 25}}/>
                    <div style={{fontSize: 30, color: '#fff'}}>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                </Header>
                <Layout style={{padding: '0', marginTop: 64}}>
                    <Sider width={200} className="site-layout-background" style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                    }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%', borderRight: 0}}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined/>} title="用户管理">
                                <Menu.Item key="1" onClick={this.toPath.bind(this, '/service/account')}>查询用户</Menu.Item>
                                <Menu.Item key="2">option2</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="pigs" icon={<AppstoreOutlined/>} title="**管理">
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<NotificationOutlined/>} title="subnav 3">
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout" style={{marginLeft: '200px'}}>
                        <Breadcrumb style={{margin: '10px 20px'}}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 16,
                                margin: 0,
                                minHeight: '280px',
                            }}
                        >
                            <Switch>
                                {routes.map(item => <Route key={item.path} {...item}/>)}
                                <Redirect path="/" to="/service/account"/>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default Home;
