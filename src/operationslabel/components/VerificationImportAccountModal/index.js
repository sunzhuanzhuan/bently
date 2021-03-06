import React, {Component} from 'react';
import {Modal, Input, Form, Icon, message} from 'antd';
const {TextArea} = Input;
import * as Action from "../../action/highProfitAccount";
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class VerificationImportAccountModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 1, // 1为初始状态,验证accountId输入格式; 2:为校验规则通过后,发送检查请求后的状态;3:显示导入结果modal
            confirmLoading: false,
            okText: '开始导入'
        }
    }

    /**
     * 输入的字符串转换为ids
     * @param data
     */
    toIds(data = "") {
        return data.split(/\n+/g).filter(t => t !== "");
    }

    validator = (rule, data, callback) => {
        if (data) {
            let noNumber = [];
            const reg = /^[0-9]+[0-9]*]*$/;
            //判断是否为数字
            let arr = this.toIds(data);
            arr.forEach(val => {
                if (!reg.test(val)) {
                    noNumber.push(val);
                }
            });
            if (noNumber.length !== 0) {
                callback("account_id必须为数字，非数字的account_id为: " + noNumber.join(",") + ";");
            } else if (data.split(/\n+/g).length > 1000) {
                callback("最多输入1000个账号，请重新输入");
            } else {
                callback();
            }
        } else {
            callback('请输入account_id');
        }
    };

    /**
     * 获取导入的账号
     */
    handleOk = () => {
        //status 1 为初始状态,验证accountId输入格式
        if (this.state.status === 1) {
            this.props.form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                this.setState({
                    confirmLoading: true
                }, () => {
                    //满足验证条件发送请求
                    this.props.actions.getAccountImportCheck({accountIds: this.toIds(values.accountId)})
                        .finally(() => {
                            this.setState({
                                status: 2, // 为校验规则通过后,发送检查请求后的状态
                                confirmLoading: false,
                                okText: '确认导入'

                            })
                        });
                });
            });
        }
        // status 2 为校验规则通过后,发送检查请求后的状态
        if (this.state.status === 2) {
            if (!this.props.importAccountCheck.isExits.length) {
                this.setState({
                    status: 1, //初始状态
                    okText: '开始导入'
                }, () => {
                    message.error("未检测到的账号无法导入，请重新输入账号");
                })
            } else {
                this.setState({
                    confirmLoading: true
                }, () => {
                    this.props.actions.getAccountImport({accountIds: this.props.importAccountCheck.isExits})
                        .finally(() => {
                            this.setState({
                                confirmLoading: false,
                                status: 3,  //发送导入请求后的状态
                                okText: '开始导入'
                            })
                        })
                })
            }
        }
    }

    handleCancel() {
        this.props.handleCancel();
        setTimeout(() => {
            this.setState({
                status: 1, //初始状态
                okText: '开始导入',
                confirmLoading: false,
            }, () => {
                this.props.form.resetFields();
            });
        }, 200);
    }

    /**
     * 批量导入modal
     * @returns {*}
     */
    renderImportModal = () => {
        const {visible, form} = this.props;
        const {getFieldDecorator} = form;
        const {notExits = [], isExits = [], isDistinct = []} = this.props.importAccountCheck || {};
        return (
            <Modal
                className="operationslabel-detail"
                title={<span>批量导入账号</span>}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                cancelText="取消"
                visible={visible}
                okText={this.state.okText}
                confirmLoading={this.state.confirmLoading}>
                <div>
                    <Form>
                        <h4>请输入account_id，一行一个，单次最多导入1000个</h4>
                        <p className="tips-auto-delete">
                            <span className="warning">说明：</span>
                            {this.state.status === 1 && '重复账号在导入进标签时会自动剔除'}
                            {this.state.status === 2 && '重复账号会自动剔除'}
                        </p>
                        <Form.Item>
                            {getFieldDecorator('accountId', {
                                initialValue: "",
                                rules: [{validator: this.validator }],
                            })(<TextArea
                                autosize={{minRows: 7, maxRows: 10}}
                                disabled={this.state.status === 2}/>)}
                        </Form.Item>
                        {this.state.status === 2 ?
                            <div className="account-check-result">
                                <h4>一、账号检测结果</h4>
                                <p>
                                    <span className="warning"><b>{notExits.length}</b>个账号未找到</span>
                                    {notExits.length > 0 ? <span className="warning">,account_id为{notExits.join(",")}</span> : ""};
                                    共检测到<b>{isExits.length}</b>个账号,其中<b>{isDistinct.length}</b>个账号为重复账号
                                    {isDistinct.length >0 ? <span className="warning">,account_id为{isDistinct.join(",")}</span> : ""}
                                </p>
                            </div> : ""}
                    </Form>
                </div>
            </Modal>
        );
    };

    /**
     * 导入结果modal
     */
    renderImportResultModal = () => {
        const {visible} = this.props;
        const {successList = [], failList = []} = this.props.importAccount || {};
        return (
            <Modal
                className="operationslabel-detail"
                title={<span>批量导入账号</span>}
                visible={visible}
                footer={null}
                onCancel={this.handleCancel.bind(this)}>
                <div>
                    {failList.length === 0 ?
                        <h3 className="import-account-status">
                            <Icon className="icon-format" style={{color: "#52c41a"}} type="check-circle-o"/>
                            成功导入账号<b>{successList.length}</b>个,请于五分钟后查看结果
                        </h3> :
                        <div>
                            <h3 className="import-account-status">
                                <Icon className="icon-format" style={{color: "#faad14"}} type="info-circle-o"/>
                                成功导入账号<b>{successList.length}</b>个，
                                失败<b className="warning">{failList.length}</b>个,请于五分钟后查看结果
                            </h3>
                            <p className="warning">{"失败账号account_id: " + failList.join(",")}</p>
                        </div>
                    }
                </div>
            </Modal>
        );
    };

    render() {
        return (
            <div>
                {
                    // status 1 和 2 显示 导入账号modal
                    (this.state.status === 1 || this.state.status === 2) && this.renderImportModal()
                }
                {
                    // status 3 显示导入结果modal
                    this.state.status === 3 && this.renderImportResultModal()
                }
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        importAccountCheck: state.operationslabelReducers.highAccountImportCheck || {},
        importAccount: state.operationslabelReducers.highAccountImport || {}
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        ...Action
    }, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form.create()(VerificationImportAccountModal));

