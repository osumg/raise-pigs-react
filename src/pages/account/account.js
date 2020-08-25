import React, {Component} from "react";
import {Table, Pagination} from "antd";
import {connect} from 'react-redux';
import storeAction from './store/action'
import styles from './account.module.css'
import {Modal, Button, Spin} from 'antd';
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
            }
        ],
    }

    componentDidMount() {
        const {current, size} = this.props.storeState;
        this.props.init(current, size);
    }

    setRePwd = e => {
        this.props.setRePwd(e, this.props.storeState.pwd)
    }

    render() {
        const {account, dataSource, visible, spin, accountTip, pwdTip, rePwdTip, usernameTip, loading, modalAccount, username, pwd, rePwd, current, total} = this.props.storeState;
        const {
            setAccount,
            search,
            setVisible,
            setModalAccount,
            setUsername,
            setPwd,
            addAccount,
            onShowSizeChange,
            onPaginationChange
        } = this.props;
        return (
            <Spin delay={500} spinning={spin}>
                <Modal
                    title="新增账号"
                    visible={visible}
                    onOk={addAccount.bind(this, this.props.storeState)}
                    onCancel={setVisible.bind(this, false)}
                    okButtonProps={{loading: loading}}
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


                <div className={styles['search-input']}>
                    <div className={styles['search-input-left']}>
                        <KeyValueInputNoTip title={'用户账号'} placeholder={'请输入用户账号'} onChange={setAccount}/>
                    </div>
                    <div className={styles['search-input-right']}>
                        <Button type="primary" onClick={search.bind(this, account)}>搜索</Button>
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
