import React, {Component} from "react";
import {Button, Modal, Space, Spin, Table} from "antd";
import {connect} from "react-redux";
import action from './store/action';
import styles from "./pig.module.css";
import {KeyValueInput, KeyValueInputNoTip} from "../../components/inputs/inputs";
import KeyValueDropDown from "../../components/keyValueDropDown/keyValueDropDown";


@connect(state => ({mapState: state.pigReducer}), action)
class Pig extends Component {
    state = {
        columns: [
            {
                title: '编号',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '种类名称',
                dataIndex: 'kindName',
                key: 'kindName',
            },
            {
                title: '年龄(月)',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '性别',
                dataIndex: 'genderMean',
                key: 'genderMean',
            },
            {
                title: '健康状况',
                dataIndex: 'statusMean',
                key: 'statusMean',
            },
            {
                title: '是否检查',
                dataIndex: 'inspectMean',
                key: 'inspectMean',
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
                            <a onClick={this.props.showModifyModal.bind(this, record.id)}>修改</a>
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
        const {current, size} = this.props.mapState;
        this.props.init(current, size);
    }

    render() {
        const {spin, dataSource, idOfSearch, visible, loadingOfAdd, addAgeTip, addAge, kindMenu, kindIndex, genderMenu, genderIndex, visibleOfModify, loadingOfModify, ageOfModify, ageOfModifyTip} = this.props.mapState;
        const {
            setIdOfSearch,
            setVisiblePig,
            addPig,
            setAddAge,
            setKindOfAdd,
            setGenderOfAdd,
            setVisibleOfModal,
            modifyPig,
            setAgeOfModify,
            searchPig
        } = this.props;

        return (
            <Spin delay={500} spinning={spin}>
                <Modal
                    title="新增猪猪"
                    visible={visible}
                    onOk={addPig}
                    onCancel={setVisiblePig.bind(this, false)}
                    okButtonProps={{loading: loadingOfAdd}}
                    okText={'新增'}
                    cancelText='取消'
                    maskClosable={false}
                    centered={true}
                    width={'60%'}
                >
                    <div className={styles['modal-row']}>
                        <KeyValueInput title={'年龄(月)'} placeholder={'请输入年龄'} onChange={setAddAge}
                                       tip={addAgeTip} value={addAge}/>
                        <KeyValueDropDown title={'种类'} kindMenu={kindMenu} menuIndex={kindIndex}
                                          clickMenu={setKindOfAdd}/>
                    </div>
                    <div className={styles['modal-row']}>
                        <KeyValueDropDown title={'性别'} kindMenu={genderMenu}
                                          menuIndex={genderIndex} clickMenu={setGenderOfAdd}/>
                    </div>
                </Modal>

                <Modal
                    title="修改账号"
                    visible={visibleOfModify}
                    onOk={modifyPig}
                    onCancel={setVisibleOfModal.bind(this, false)}
                    okButtonProps={{loading: loadingOfModify}}
                    okText={'修改'}
                    cancelText='取消'
                    maskClosable={false}
                    centered={true}
                    width={'60%'}
                >
                    <div className={styles['modal-row']}>
                        <KeyValueInput title={'年龄(月)'} placeholder={'请输入年龄'} onChange={setAgeOfModify}
                                       tip={ageOfModifyTip} value={ageOfModify}/>
                    </div>
                </Modal>

                <div className={styles['search-input']}>
                    <div className={styles['search-input-left']}>
                        <KeyValueInputNoTip title={'编号'} placeholder={'请输入编号'} onChange={setIdOfSearch}
                                            value={idOfSearch}/>
                    </div>
                    <div className={styles['search-input-right']}>
                        <Button type="primary" onClick={searchPig}>搜索</Button>
                        <Button type="default" style={{marginLeft: '20px'}}
                                onClick={setVisiblePig.bind(this, true)}>新增</Button>
                    </div>
                </div>
                <Table dataSource={dataSource} columns={this.state.columns}
                       rowKey={data => data.id} pagination={false}/>
            </Spin>
        );
    }
}

export default Pig;
