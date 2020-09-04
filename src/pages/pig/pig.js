import React, {Component} from "react";
import {Space, Spin, Table} from "antd";
import {connect} from "react-redux";
import action from './store/action';

@connect(state => ({mapState: state.pigReducer}), action)
class Pig extends Component {
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
                    return (
                        <Space size={'middle'}>
                            <a onClick={()=>{}}>修改</a>
                            <a style={{color: 'red'}} onClick={()=>{}}>删除</a>
                        </Space>
                    )
                }
            }
        ],
    }

    componentDidMount() {
        const {current, size} = this.props.mapState;
        this.props.init(current, size);
    }

    render() {
        const {spin, dataSource} = this.props.mapState;
        return (
            <Spin delay={500} spinning={spin}>
                <Table dataSource={dataSource} columns={this.state.columns}
                       rowKey={data => data.id} pagination={false}/>
            </Spin>
        );
    }
}

export default Pig;
