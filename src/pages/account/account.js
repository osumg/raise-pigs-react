import React, {Component} from "react";
import {Button, Modal, Pagination, Space, Spin, Table} from "antd";
import {connect} from 'react-redux';
import storeAction from './store/action'
import styles from './account.module.css'
import {KeyValueInput, KeyValueInputNoTip, PasswordInput} from "../../components/inputs/inputs";

@connect(state => ({storeState: state.accountReducer}), storeAction)
class Account extends Component {
    state = {
        columns: [
            {
                title: '用户账号',
                dataIndex: 'account',
                key: 'account',
            },
            {
                title: '姓名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '上次登录',
                dataIndex: 'lastLoginTime',
                key: 'lastLoginTime',
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
            },
            {
                title: '操作',
                key: 'action',
                render: (record) => {
                    console.log('record:',record);
                    return (
                        <Space size={'middle'}>
                            <a onClick={this.props.setVisible1.bind(this, true, record.id)}>修改</a>
                            <a style={{color: 'red'}} onClick={this.deleteById.bind(this, record.id)}>删除</a>
                        </Space>
                    )
                }
            }
        ],
    }

    deleteById = id => {
        Modal.confirm({
            content: '确定删除？',
            centered: true,
            okButtonProps: {
                onClick: () => {
                    this.props.deleteById(id, this.props.storeState);
                    Modal.destroyAll();
                }
            }
        })
    }

    componentDidMount() {
        const {current, size} = this.props.storeState;
        this.props.init(current, size);
    }

    setRePwd = e => {
        this.props.setRePwd(e, this.props.storeState.pwd)
    }

    render() {
        const {account, dataSource, visible, spin, accountTip, pwdTip, rePwdTip, usernameTip, loading, modalAccount, username, pwd, rePwd, current, total, visible1, modalAccount1, loading1, usernameTip1, username1} = this.props.storeState;
        const {
            setAccount,
            search,
            setVisible,
            setModalAccount,
            setUsername,
            setPwd,
            addAccount,
            onShowSizeChange,
            onPaginationChange,
            modifyAccount, setVisible1, setUsername1
        } = this.props;
        return (
            <Spin delay={500} spinning={spin}>
                <Modal
                    title="新增账号"
                    visible={visible}
                    onOk={addAccount.bind(this, this.props.storeState)}
                    onCancel={setVisible.bind(this, false)}
                    okButtonProps={{loading}}
                    okText={'新增'}
                    cancelText='取消'
                    maskClosable={false}
                    centered={true}
                    width={'60%'}
                >
                    <div className={styles['modal-row']}>
                        <KeyValueInput title={'用户账号'} placeholder={'请输入用户账号'} onChange={setModalAccount}
                                       tip={accountTip} value={modalAccount}/>
                        <KeyValueInput title={'用户名'} placeholder={'请输入用户名'} onChange={setUsername}
                                       tip={usernameTip} value={username}/>
                    </div>
                    <div className={styles['modal-row']}>
                        <PasswordInput title={'密码'} placeholder={'请输入密码'} onChange={setPwd} tip={pwdTip} value={pwd}/>
                        <PasswordInput title={'确认密码'} placeholder={'请输入确认密码'} onChange={this.setRePwd}
                                       tip={rePwdTip} value={rePwd}/>
                    </div>
                </Modal>

                <Modal
                    title="修改账号"
                    visible={visible1}
                    onOk={modifyAccount.bind(this, this.props.storeState)}
                    onCancel={setVisible1.bind(this, false)}
                    okButtonProps={{loading: loading1}}
                    okText={'修改'}
                    cancelText='取消'
                    maskClosable={false}
                    centered={true}
                    width={'60%'}
                >
                    <div className={styles['modal-row']}>
                        <KeyValueInput title={'用户名'} placeholder={'请输入用户名'} onChange={setUsername1}
                                       tip={usernameTip1} value={username1}/>
                    </div>
                </Modal>


                <div className={styles['search-input']}>
                    <div className={styles['search-input-left']}>
                        <KeyValueInputNoTip title={'用户账号'} placeholder={'请输入用户账号'} onChange={setAccount}
                                            value={account}/>
                    </div>
                    <div className={styles['search-input-right']}>
                        <Button type="primary" onClick={search.bind(this, this.props.storeState)}>搜索</Button>
                        <Button type="default" style={{marginLeft: '20px'}}
                                onClick={setVisible.bind(this, true)}>新增</Button>
                    </div>
                </div>
                <Table dataSource={dataSource} columns={this.state.columns}
                       rowKey={data => data.id} pagination={false}/>
                <div className={styles['pagination']}>
                    <Pagination defaultCurrent={current} total={total} showSizeChanger
                                onShowSizeChange={onShowSizeChange} onChange={onPaginationChange}/>
                </div>
            </Spin>
        );

    }
}

export default Account;
