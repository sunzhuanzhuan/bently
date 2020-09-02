import React, {Component} from 'react';
import {Modal, Input, Form, Checkbox, Row, Col, Icon, message} from 'antd';
import * as Action from "../../action/highProfitAccount";
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
class VerificationImportAccountModal extends Component{
	constructor(props) {
		super(props);
		this.state = {
			status: 1,//导入步骤状态
			confirmLoading: false,
			okText: '开始导入',
			verification: '',
			is_exits: [],
			is_distinct: [],

		}
	}

	//返回accountId[]
	account_id(data) {
		let accountId = data.split(/\n+/g).filter(t => t !== "");
		return accountId;
	}

	//验证导入账号规则
	verification(data) {
		let noNumber = [];
		const reg = /^[0-9]+[0-9]*]*$/;
	//判断是否为空
		if (!data) {
			this.setState({verification: "请输入account_id"});
			return false;
		} else {
	//判断是否为数字
			let arr = data.split(/\n+/g).filter(t => t !== "");
			arr.map(val => {
				if (!reg.test(val)) {
					noNumber.push(val);
				}
			});
			if (noNumber.length !== 0) {
				this.setState({verification: "account_id必须为数字，非数字的account_id为: " + noNumber.join(",") + ";"});
				return false;
			}
			if (data.split(/\n+/g).length > 1000) {
				this.setState({verification: "最多输入1000个账号，请重新输入"});
				return false;
			}
		}

		return true;
	}
	//获取导入的账号
	handleOk= () =>{
		if(this.state.status === 1){
			this.props.form.validateFields((err, values) => {
				if (this.verification(values.accountId)) {
					this.setState({verification: "", confirmLoading: true}, () => {
						//满足验证条件发送请求
						this.props.actions.getAccountImportCheck({accountIds: this.account_id(values.accountId)})
							.finally(() => {
								this.setState({
									status: 2,
									confirmLoading: false,
									okText: '确认导入'

								})
							});
					});
				}
				return;
			});
		}
		if(this.state.status === 2){
			if(!this.props.importAccountCheck.isExits.length){
				this.setState({
					status: 1,
					okText: '开始导入'
				},() => {
					message.error("未检测到的账号无法导入，请重新输入账号");
				})
			}else{
				this.setState({
					confirmLoading: true
				},() => {
					this.props.actions.getAccountImport({accountIds:this.props.importAccountCheck.isExits})
						.finally(() => {
							this.setState({
								confirmLoading: false,
								status: 3,
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
			this.setState({status: 1, okText: '开始导入', confirmLoading: false, verification: ''}, () => {
				this.props.form.resetFields();
			})
		}, 200);
	}
	render() {
		const { visible, form} = this.props;
		const { notExits = [], isExits = [], isDistinct = []} = this.props.importAccountCheck || {};
		const { successList = [], failList = [] } = this.props.importAccount || {};
		const { TextArea } = Input;
		const { getFieldDecorator } = form;
		return (
			<div>
				{this.state.status === 1 || this.state.status === 2 ? <Modal
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
							<p className="tips-auto-delete"><span className="warning">说明：</span>{this.state.status === 1 && '重复账号在导入进标签时会自动剔除' || this.state.status === 2 && '重复账号会自动剔除'}</p>
							<Form.Item>
								{getFieldDecorator('accountId', {initialValue: ""})(<TextArea
									autosize={{minRows: 7, maxRows: 10}}
									disabled={this.state.status === 2 ? true : false}/>)}
							</Form.Item>
							<div style={{"display": this.state.verification ? "block" : "none", color: "red"}}>
								{this.state.verification}
							</div>
							{this.state.status === 2 ?
								<div className="account-check-result">
									<h4>一、账号检测结果</h4>
									<p>{ notExits.length>0 && <span className="warning">{notExits.length}个账号未找到,account_id为{ notExits.join(",")};</span>}共检测到<b>{isExits.length}</b>个账号,其中<b>{isDistinct.length}</b>个账号为重复账号{isDistinct.length>0 && <span><span className='warning'>,account_id为{isDistinct.join(",")}</span></span>}</p>
								</div> : ""}
						</Form>
					</div>
				</Modal> : ""}
				{this.state.status === 3 ? <Modal
					className="operationslabel-detail"
					title={<span>批量导入账号</span>}
					visible={visible}
					footer ={null}
					onCancel={this.handleCancel.bind(this)}>
					<div>
						{failList.length === 0?
							<h3 className="import-account-status">
								<Icon className="icon-format" style={{color: "#52c41a"}} type="check-circle-o"/>
								成功导入账号<b>{successList.length}</b>个,请于五分钟后查看结果
							</h3> :
							<div>
								<h3 className="import-account-status">
									<Icon className="icon-format" style={{color: "#faad14"}}  type="info-circle-o"/>
									成功导入账号<b>{successList.length}</b>个，失败<b className="warning">{failList.length}</b>个,请于五分钟后查看结果</h3>
								<p className="warning">{"失败账号account_id: " + failList.join(",")}</p>
							</div>
						}
					</div>
				</Modal> : ""}
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

