import React, {Component} from "react";
import {Table} from "antd";
import {connect} from 'react-redux';
import {init} from './accountStore'

@connect(state => ({result: state.accountReducer}), {init})
class Account extends Component {

    componentDidMount() {
        this.props.init();
        console.log(this.props.result)
    }

    render() {
        const columns = [
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
        ];

        return (
            <Table dataSource={this.props.dataSource} columns={columns}/>
        );

        // return <div>falsdkjfakl</div>
    }
}

export default Account;
