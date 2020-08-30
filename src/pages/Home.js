import React, {Component} from "react";
import {routes} from '../config/routes'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Breadcrumb, Layout, Menu, Tabs} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined,} from '@ant-design/icons';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
const {TabPane} = Tabs;

class Home extends Component {
    toPath = (path) => {
        this.props.history.push(`${path}`);
    }


    state = {
        collapsed: false,
        activeKey: '1',
        panes: [
            {title: '查询用户', content: 'Content of Tab Pane 1', key: '1'},
            {title: 'Tab 2', content: 'Content of Tab Pane 2', key: '2'},
        ],
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    onChange = activeKey => {
        this.setState({activeKey});
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    remove = targetKey => {
        let {activeKey} = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({panes, activeKey});
    };


    render() {
        return (
            <Layout style={{width: '100%'}}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{
                    overflow: 'auto',
                    position: 'fixed',
                    zIndex: 1,
                    height: '100vh',
                    left: 0,
                }}>
                    <div className="logo" style={{height: '40px'}}/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <SubMenu key="sub1" icon={<UserOutlined/>} title="权限管理">
                            <Menu.Item key="1" onClick={this.toPath.bind(this, '/service/account')}>用户管理</Menu.Item>
                            <Menu.Item key="2">角色管理</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<UserOutlined/>} title="**管理">
                            <Menu.Item key="3" onClick={this.toPath.bind(this, '/service/account')}>**情况</Menu.Item>
                            <Menu.Item key="4">种类管理</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" icon={<UserOutlined/>} title="资产管理">
                            <Menu.Item key="5" onClick={this.toPath.bind(this, '/service/account')}>圈管理</Menu.Item>
                            <Menu.Item key="6">饲料管理</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <div style={{
                    marginLeft: this.state.collapsed ? '80px' : '200px',
                    width: '100%'
                }}>
                    <Header style={{
                        backgroundColor: '#fff',
                        position: 'fixed',
                        zIndex: 2,
                        width: 'calc(100% - 200px)',
                        paddingLeft: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid #f0f2f5'
                    }}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: this.toggle,
                            })}
                            <Breadcrumb style={{marginLeft: '30px'}}>
                                <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                                <Breadcrumb.Item>查询用户</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <UserOutlined style={{fontSize: 20, marginRight: 15}}/>
                            <span>{localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).username}</span>
                        </div>
                    </Header>
                    <Content
                        style={{
                            minHeight: 280,
                            paddingTop: 60,
                            backgroundColor: '#fff',
                        }}
                    >
                        <div style={{height: 10, backgroundColor: '#f0f2f5'}}/>
                        <Tabs
                            hideAdd
                            onChange={this.onChange}
                            activeKey={this.state.activeKey}
                            type="editable-card"
                            onEdit={this.onEdit}
                        >
                            {this.state.panes.map(pane => (
                                <TabPane tab={pane.title} key={pane.key}>
                                    <Switch>
                                        {routes.map(item => <Route key={item.path} {...item}/>)}
                                        <Redirect path="/" to="/service/account"/>
                                    </Switch>
                                </TabPane>
                            ))}
                        </Tabs>

                    </Content>
                </div>
            </Layout>
        );
    }
}

export default Home;
