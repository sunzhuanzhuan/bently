/*
1.这是媒介批量操作的点赞评论组件
2.前端：付羽
3.后端：杨慧
*/
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Icon, Tooltip, Popconfirm, Form, Input, message } from 'antd';
import * as batchOptionsAction from '../../actions/batchOptions'
const FormItem = Form.Item;
const { TextArea } = Input;
import './Suggestion.less'
import './animate.css'

//弹出框
const Modal = (props) => {
	const formItemLayout = {
		labelCol: { span: 3 },
		wrapperCol: { span: 21 },
	};
	const { getFieldDecorator } = props.form;
	return (
		<div className="modal">
			<FormItem
				{...formItemLayout}
				label="点赞"
			>
				<div className="like-icon-box">
					<Icon type="like" className="like-icon" onClick={() => props.likeClick()}
						style={{ color: props.color }}
					/>
					<span className={props.animateClassName}>+1</span>
				</div>
			</FormItem>
			<FormItem
				{...formItemLayout}
				label="建议"
			>
				{getFieldDecorator('comment')(
					<TextArea
						placeholder="请输入您的建议" autosize={{ minRows: 2, maxRows: 6 }}
						onBlur={(e) => props.inputSuggestion(e)}
						onFocus={() => props.preventDefault()}
					/>
				)}
			</FormItem>
		</div>
	)
}

class Suggestion extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isFirst: true,
			color: '#595959',
			animateClassName: 'initClassName',
			likeCount: 0,
			comment: '',
			visible: false
		}
	}
	//按下点赞的事件
	likeClick = () => {
		if (this.state.isFirst == true) {
			this.setState({
				color: 'red'
			})
		}
		let num = this.state.likeCount;
		num += 1;
		this.setState({
			animateClassName: 'animated fadeOutUp',
			likeCount: num
		})
	}
	//关闭弹框的回调函数
	onVisibleChange = () => {
		this.props.form.resetFields()
		this.setState({
			isFirst: true,
			color: '#595959',
			animateClassName: 'initClassName',
			likeCount: 0,
			comment: '',
			visible: false
		})
	}
	preventDefault = () => {
		this.setState({
			animateClassName: 'initClassName'
		})
	}
	inputSuggestion = (e) => {
		this.setState({
			comment: e.target.value
		})
	}
	//提交
	confirm = (e) => {
		e.preventDefault();
		let value = {}
		value.sourceUrl = window.location.href;
		value.comment = this.state.comment;
		value.likeCount = this.state.likeCount;
		value.appId = '101'
		if (value.likeCount == 0 && value.comment == "") {
			message.error("没有进行任何点赞或评论")
		} else {
			this.props.actions.postAdviceAndLike(value).then(() => {
				this.onVisibleChange()
			}).catch(() => {
				this.preventDefault()
				message.error("请求失败")
			})
		}
	}
	showModal = () => {
		this.setState({
			visible: true
		})
	}
	render() {
		return (
			<Popconfirm placement="topRight"
				title={
					<div>
						<div className="suggestion-title">您的建议</div>
						<Form layout="horizontal">
							<Modal
								form={this.props.form}
								likeClick={this.likeClick}
								color={this.state.color}
								animateClassName={this.state.animateClassName}
								inputSuggestion={this.inputSuggestion}
								preventDefault={this.preventDefault}
							></Modal>
						</Form>
					</div>
				}
				visible={this.state.visible}
				onCancel={this.onVisibleChange}
				icon={<Icon type="heart" />}
				onConfirm={this.confirm}
				okText="提交" cancelText="取消">
				<Tooltip placement="left"
					title="请留下您的点赞与建议" arrowPointAtCenter>
					<Button type="primary" className="suggest-btn" onClick={this.showModal}>
						<Icon type="smile" className="suggest-btn-icon" />
					</Button>
				</Tooltip>
			</Popconfirm>
		)
	}
}

const mapStateToProps = () => {
	return {

	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		...batchOptionsAction
	}, dispatch)
})

export default connect(
	mapStateToProps,//redux和react连接起来
	mapDispatchToProps
)(Form.create()(Suggestion))

