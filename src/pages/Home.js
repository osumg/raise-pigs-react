import React, {Component} from "react";
import {Breadcrumb, Layout, Menu, Modal, Tabs} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined,} from '@ant-design/icons';
import {renderRoutes} from "react-router-config";

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
const {TabPane} = Tabs;

class Home extends Component {
    state = {
        collapsed: false,

        upName: '权限管理',
        downName: '用户管理',
        openKeys: ['sub1'],
        selectedKeys: ['1'],

        activeKey: '/home/account',
        panes: [
            {title: '用户管理', key: '/home/account', path: '/home/account', selectedKeys: ['1']},
        ]
    };

    componentDidMount() {
        this.props.history.listen(() => {
            Modal.destroyAll();
        });
    }

    toPath = (path, upName, name, selectedKeys) => {
        const {panes} = this.state;

        for (let i = 0; i < panes.length; i++) {
            if (path === panes[i].path) {
                this.setState({activeKey: panes[i].key})
                this.props.history.replace(panes[i].path);
                this.setState({
                    upName,
                    downName: name
                })
                return;
            }
        }

        const activeKey = path;
        panes.push({
            title: name,
            key: activeKey,
            path,
            selectedKeys
        });

        this.setState({
            panes, activeKey,
            upName,
            downName: name
        }, () => {
            this.props.history.replace(path);
        })
    }


    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    onChange = activeKey => {
        this.state.panes.map(pane => {
            if (activeKey === pane.key) {
                this.props.history.replace(pane.path)
            }
        })

        this.setState({activeKey});
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    remove = targetKey => {
        let {activeKey, selectedKeys} = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => {
            return pane.key !== targetKey
        });

        //关闭的是当前页面
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
                selectedKeys = panes[lastIndex].selectedKeys;
                this.props.history.replace(panes[lastIndex].path);

            } else {
                activeKey = panes[0].key;
                selectedKeys = panes[0].selectedKeys;
                this.props.history.replace(panes[0].path);
            }
        }
        this.setState({panes, selectedKeys, activeKey});
    };

    //SubMenu 展开/关闭的回调,设置每次只打开一个块
    onOpenChange = (openKeys) => {
        this.setState({
            openKeys: [openKeys[openKeys.length - 1]]
        })
    }

    //被选中时调用
    onSelect = ({item, key, keyPath, selectedKeys}) => {
        console.log('item:', item);
        console.log('key:', key);
        console.log('keyPath:', keyPath);
        this.setState({
            selectedKeys
        })
    }


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
                    <Menu theme="dark" mode="inline" defaultOpenKeys={['sub1']} openKeys={this.state.openKeys}
                          defaultSelectedKeys={['1']} selectedKeys={this.state.selectedKeys}
                          onOpenChange={this.onOpenChange} onSelect={this.onSelect}>
                        <SubMenu key="sub1" icon={<UserOutlined/>} title="权限管理">
                            <Menu.Item key="1"
                                       onClick={this.toPath.bind(this, '/home/account', '权限管理', '用户管理', ['1'])}>用户管理</Menu.Item>
                            <Menu.Item key="2"
                                       onClick={this.toPath.bind(this, '/home/pig', '权限管理', '角色管理', ['2'])}>角色管理</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<UserOutlined/>} title="**管理">
                            <Menu.Item key="3" onClick={this.toPath.bind(this, '/home/pigsty')}>**情况</Menu.Item>
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
                    width: this.state.collapsed ? 'calc(100% - 80px)' : 'calc(100% - 200px)'
                }}>
                    <Header style={{
                        backgroundColor: '#fff',
                        position: 'fixed',
                        zIndex: 2,
                        width: this.state.collapsed ? 'calc(100% - 80px)' : 'calc(100% - 200px)',
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
                                <Breadcrumb.Item>{this.state.upName}</Breadcrumb.Item>
                                <Breadcrumb.Item>{this.state.downName}</Breadcrumb.Item>
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
                            overflow: 'hidden'
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
                                    {renderRoutes(this.props.route.routes)}
                                </TabPane>
                            ))}

                        </Tabs>

                    </Content>
                </div>
            </Layout>
        );
    }
}

function RouteTabs(props) {

    const {onChange, activeKey, onEdit, panes} = props;

    return (
        <Tabs
            hideAdd
            onChange={onChange}
            activeKey={activeKey}
            type="editable-card"
            onEdit={onEdit}
        >
            {panes.map(pane => (
                <TabPane tab={pane.title} key={pane.key}>
                    {this.props.route.component}
                </TabPane>
            ))}

        </Tabs>
    )

}

export default Home;

