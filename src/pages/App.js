import React, {Component} from "react";
import {Layout, Menu, Breadcrumb} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {routes} from '../config/routes'
import {Switch, Route, withRouter} from 'react-router-dom'

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

class App extends Component {
    toPath = (path) => {
        this.props.history.push(`/${path}`);
    }

    render() {
        return (
            <Layout className='app'>
                <Header className="header">
                    <div className="logo"/>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%', borderRight: 0}}
                        >
                            {/*<SubMenu key="sub1" icon={<UserOutlined/>} title="用户功能">*/}
                            {/*    <Menu.Item key="1" onClick={this.toPath.bind(this, 'weather')}>天气查询</Menu.Item>*/}
                            {/*    <Menu.Item key="2" onClick={this.toPath.bind(this, 'name-list')}>名称列表</Menu.Item>*/}
                            {/*    <Menu.Item key="3">option3</Menu.Item>*/}
                            {/*    <Menu.Item key="4">option4</Menu.Item>*/}
                            {/*</SubMenu>*/}
                            <Menu.Item key="3"  icon={<UserOutlined/>}>数据统计</Menu.Item>
                            <Menu.Item key="3"  icon={<UserOutlined/>}>消息通知</Menu.Item>
                            <Menu.Item key="3"  icon={<UserOutlined/>}>猪猪管理</Menu.Item>
                            <Menu.Item key="3"  icon={<UserOutlined/>}>猪猪种类</Menu.Item>
                            <Menu.Item key="3"  icon={<UserOutlined/>}>饲料管理</Menu.Item>
                            <Menu.Item key="3"  icon={<UserOutlined/>}>订单管理</Menu.Item>
                            <Menu.Item key="3"  icon={<UserOutlined/>}>采购计划</Menu.Item>
                            <Menu.Item key="3"  icon={<UserOutlined/>}>供货单位</Menu.Item>
                            <Menu.Item key="3"  icon={<UserOutlined/>}>出货单位</Menu.Item>
                            <Menu.Item key="3"  icon={<UserOutlined/>}>预产情况</Menu.Item>
                            <Menu.Item key="3"  icon={<UserOutlined/>}>伤病情况</Menu.Item>
                            <Menu.Item key="3"  icon={<UserOutlined/>}>生产资料</Menu.Item>
                            <Menu.Item key="3"  icon={<UserOutlined/>}>系统参数</Menu.Item>
                            <Menu.Item key="3"  icon={<UserOutlined/>}>用户管理</Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <Switch>
                                {routes.map(item => <Route key={item.path} {...item}/>)}
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(App)
