import React, {Component} from "react";
import {Table} from "antd";
import {connect} from 'react-redux';
import storeAction from './store/action'
import styles from './account.module.css'
import {Modal, Button, Spin} from 'antd';
import {KeyValueInput, PasswordInput, TextAreaInput} from "../../components/inputs/inputs";

@connect(state => ({storeState: state.accountReducer}), storeAction)
class Account extends Component {
    state = {
        columns: [
            {
                title: 'id',
                dataIndex: 'accountId',
                key: 'accountId',
            },
            {
                title: '用户账号',
                dataIndex: 'account',
                key: 'account',
            },
            {
                title: '描述',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
            },
            {
                title: '创建人',
                dataIndex: 'createBy',
                key: 'createBy',
            },
            {
                title: '修改时间',
                dataIndex: 'updateTime',
                key: 'updateTime',
            },
            {
                title: '修改人',
                dataIndex: 'updateBy',
                key: 'updateBy',
            },
        ],
    }

    componentDidMount() {
        this.props.init();
    }

    setRePwd = e => {
        this.props.setRePwd(e, this.props.storeState.pwd)
    }

    render() {
        const {account, dataSource, visible, spin, accountTip, pwdTip, rePwdTip} = this.props.storeState;
        const {
            setAccount,
            search,
            setVisible,
            setModalAccount,
            setAccountType,
            setPwd,
            setDescription,
            addAccount
        } = this.props;
        return (
            <Spin delay={500} spinning={spin}>
                <Modal
                    title="新增账号"
                    visible={visible}
                    onOk={addAccount.bind(this, this.props.storeState)}
                    onCancel={setVisible.bind(this, false)}
                    okText={'新增'}
                    cancelText='取消'
                    maskClosable={false}
                    centered={true}
                    width={'60%'}
                >
                    <div className={styles['modal-row']}>
                        <KeyValueInput title={'用户账号'} placeholder={'请输入用户账号'} onChange={setModalAccount}
                                       tip={accountTip}/>
                        <KeyValueInput title={'用户类型'} placeholder={'请输入用户类型'} onChange={setAccountType}/>
                    </div>
                    <div className={styles['modal-row']}>
                        <PasswordInput title={'密码'} placeholder={'请输入密码'} onChange={setPwd} tip={pwdTip}/>
                        <PasswordInput title={'确认密码'} placeholder={'请输入确认密码'} onChange={this.setRePwd} tip={rePwdTip}/>
                    </div>
                    <div style={{marginRight: '30px'}}>
                        <TextAreaInput title={'描述信息'} placeholder={'请输入描述信息'} onChange={setDescription}
                                       rows={4}/>
                    </div>
                </Modal>


                <div className={styles['search-input']}>
                    <div className={styles['search-input-left']}>
                        <KeyValueInput title={'用户账号'} placeholder={'请输入用户账号'} onChange={setAccount}/>
                    </div>
                    <div className={styles['search-input-right']}>
                        <Button type="primary" onClick={search.bind(this, account)}>搜索</Button>
                        <Button type="default" style={{marginLeft: '20px'}}
                                onClick={setVisible.bind(this, true)}>新增</Button>
                    </div>
                </div>
                <Table dataSource={dataSource} columns={this.state.columns}
                       rowKey={data => data.accountId}/>
            </Spin>
        );

    }
}

export default Account;
