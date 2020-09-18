import React, {Component} from "react";
import {Breadcrumb, Layout, Menu, Modal, Tabs} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined,} from '@ant-design/icons';
import {renderRoutes} from "react-router-config";
import menu from "../config/menu";

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
const {TabPane} = Tabs;

class Home extends Component {
    constructor(props) {
        super(props);

        let pathname = menu[0].menus[0].url;
        this.state = {
            collapsed: false,

            upName: menu[0].title,
            downName: menu[0].menus[0].subTitle,

            //打开和选中的菜单key
            openKeys: [menu[0].key],
            selectedKeys: [pathname],

            activeKey: pathname,
            panes: [
                {title: menu[0].menus[0].subTitle, key: pathname},
            ]
        };
    }


    componentDidMount() {
        this.props.history.listen(() => {
            Modal.destroyAll();
        });
        let pathname = this.props.location.pathname;
        let upName = '首页';
        let downName = '';
        let openKeys = [];
        menu.map(item => {
            if (pathname.split('/')[2] === item.key) {
                upName = item.title;
                openKeys = [item.key];
            }
            item.menus && item.menus.map(ele => {
                if (pathname === ele.url) {
                    downName = ele.subTitle;
                }
            })
        })

        let panes;
        if (upName === '首页') {
            panes = [];
        }else {
            panes = [
                {title: downName, key: pathname}
            ];
        }

        this.setState({
            upName,
            downName,
            openKeys,
            selectedKeys: [pathname],
            activeKey: pathname,
            panes
        });
    }

    toPath = (path, upName, downName) => {
        const {panes} = this.state;

        for (let i = 0; i < panes.length; i++) {
            if (path === panes[i].key) {
                this.setState({
                    activeKey: panes[i].key,
                    upName,
                    downName
                }, () => {
                    this.props.history.replace(panes[i].key);
                })
                return;
            }
        }

        panes.push({
            title: downName,
            key: path
        });

        this.setState({
            panes, activeKey: path,
            upName,
            downName
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
                this.props.history.replace(pane.key)
            }
        })

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
        const panes = this.state.panes.filter(pane => {
            return pane.key !== targetKey
        });

        //关闭的是当前页面
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
                this.props.history.replace(panes[lastIndex].key);
            } else {
                activeKey = panes[0].key;
                this.props.history.replace(panes[0].key);
            }
        }

        if (panes.length === 0) {
            this.setState({
                upName: '首页',
                downName: ''
            })
            this.props.history.replace('/home/main-page');
        }
        this.setState({panes, selectedKeys: [activeKey], activeKey});
    };

    //SubMenu 展开/关闭的回调,设置每次只打开一个块
    onOpenChange = (openKeys) => {
        this.setState({
            openKeys: [openKeys[openKeys.length - 1]]
        })
    }

    //被选中时调用
    onSelect = ({item, key, keyPath, selectedKeys}) => {
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
                    <Menu theme="dark" mode="inline" openKeys={this.state.openKeys}
                          selectedKeys={this.state.selectedKeys}
                          onOpenChange={this.onOpenChange} onSelect={this.onSelect}>
                        {menu.map(({title, key, icon, menus}) => <SubMenu key={key} icon={icon} title={title}>
                            {menus.map(({subTitle, url}) => <Menu.Item key={url}
                                                                       onClick={this.toPath.bind(this, url, title, subTitle)}>{subTitle}</Menu.Item>
                            )}
                        </SubMenu>)}

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
                                <TabPane tab={pane.title} key={pane.key}/>
                            ))}
                        </Tabs>
                        {renderRoutes(this.props.route.routes)}
                    </Content>
                </div>
            </Layout>
        );
    }
}

export default Home;

