import React, {Component} from 'react';
import {Modal, Input, Form, Icon, message} from 'antd';
const {TextArea} = Input;
import * as Action from "../../action/highProfitAccount";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

/**
 * 批量导入账号modal
 * @param props
 * @returns {*}
 * @constructor
 */
const ImportModal = (props) => {
    const {visible, form, okText, status, confirmLoading, notExits = [], isExits = [], isDistinct = []} = props;
    const {handleOk, handleCancel, validator} = props;
    const {getFieldDecorator} = form;
    return (
        <Modal
            className="operationslabel-detail"
            title={<span>批量导入账号</span>}
            onOk={handleOk}
            onCancel={handleCancel}
            cancelText="取消"
            visible={visible}
            okText={okText}
            confirmLoading={confirmLoading}>
            <div>
                <Form>
                    <h4>请输入account_id，一行一个，单次最多导入1000个</h4>
                    <p className="tips-auto-delete">
                        <span className="warning">说明：</span>
                        {status === VerificationImportAccountModal.START_IMPORT && '重复账号在导入进标签时会自动剔除'}
                        {status === VerificationImportAccountModal.CONFIRM_IMPORT && '重复账号会自动剔除'}
                    </p>
                    <Form.Item>
                        {getFieldDecorator('accountId', {
                            initialValue: "",
                            rules: [{validator: validator }],
                        })(<TextArea
                            autosize={{minRows: 7, maxRows: 10}}
                            disabled={status === 2}/>)}
                    </Form.Item>
                    {status === 2 ?
                        <div className="account-check-result">
                            <h4>一、账号检测结果</h4>
                            <p>
                                {notExits.length > 0 ?
                                    <span className="warning">
                                        <b>{notExits.length}</b>个账号未找到,account_id为{notExits.join(",")}
                                    </span> : <span><b>{notExits.length}</b>个账号未找到</span>};
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
 * 批量导入账号结果modal
 * @param props
 * @returns {*}
 * @constructor
 */
const ImportResultModal = (props) => {
    const { visible, successList = [], failList = [], handleCancel } = props;
    return (
        <Modal
            className="operationslabel-detail"
            title={<span>批量导入账号</span>}
            visible={visible}
            footer={null}
            onCancel={handleCancel}>
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


class VerificationImportAccountModal extends Component {

    // 开始导入
    static START_IMPORT = 1;
    // 确认导入
    static CONFIRM_IMPORT = 2;
    // 导入结果
    static IMPORT_RESULT = 3;

    constructor(props) {
        super(props);
        this.state = {
            status: VerificationImportAccountModal.START_IMPORT,
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

    /**
     * 表单验证
     * @param rule
     * @param data
     * @param callback
     */
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
        if (this.state.status === VerificationImportAccountModal.START_IMPORT) {
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
                                // 校验规则通过后, 状态改为确认导入
                                status: VerificationImportAccountModal.CONFIRM_IMPORT,
                                confirmLoading: false,
                                okText: '确认导入'

                            })
                        });
                });
            });
        }
        if (this.state.status === VerificationImportAccountModal.CONFIRM_IMPORT) {
            if (!this.props.importAccountCheck.isExits.length) {
                this.setState({
                    status: VerificationImportAccountModal.START_IMPORT,
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
                                status: VerificationImportAccountModal.IMPORT_RESULT,
                                okText: '开始导入'
                            })
                        })
                })
            }
        }
    }

    handleCancel = () => {
        this.props.handleCancel();
        setTimeout(() => {
            this.setState({
                status: VerificationImportAccountModal.START_IMPORT,
                okText: '开始导入',
                confirmLoading: false,
            }, () => {
                this.props.form.resetFields();
            });
        }, 200);
    }


    render() {
        const {visible, form} = this.props;
        const {notExits = [], isExits = [], isDistinct = []} = this.props.importAccountCheck || {};
        const {successList = [], failList = []} = this.props.importAccount || {};
        const importModalParams = {
            visible: visible,
            form: form,
            okText: this.state.okText,
            confirmLoading: this.state.confirmLoading,
            notExits: notExits,
            isExits: isExits,
            isDistinct: isDistinct,
            status: this.state.status,
            handleOk: this.handleOk,
            handleCancel: this.handleCancel,
            validator: this.validator

        };
        const ImportResultModalParams = {
            visible,
            successList,
            failList,
            handleCancel: this.handleCancel
        }

        // status = 1 或者 2 的时候显示导入modal
        let isImportModal = (this.state.status === VerificationImportAccountModal.START_IMPORT
            || this.state.status === VerificationImportAccountModal.CONFIRM_IMPORT);
        // status 3 显示导入结果modal
        let IsImportResultModal = (this.state.status === VerificationImportAccountModal.IMPORT_RESULT);
        return (
            <div>
                {
                    (isImportModal) &&
                    <ImportModal {...importModalParams}></ImportModal>
                }
                {
                    IsImportResultModal &&
                    <ImportResultModal {...ImportResultModalParams}></ImportResultModal>
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

