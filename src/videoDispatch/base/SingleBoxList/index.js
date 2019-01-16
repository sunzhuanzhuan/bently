import React, { Component } from "react"
import { Modal, Popover } from 'antd'
import PropTypes from 'prop-types'

import './index.less'

/**
 * 热门分类
 * 1.当我要上热门为“是”时，显示此项，点击“选择”按钮，弹窗选择标签，弹窗样式见弹窗1，说明如下
 * 1.1默认不选中
 * 1.2点击可选择一个分类，选中的标签置为“选中”样式
 * 1.3确定、取消按钮
 * 1.3.1点击确定，则判断有无选择分类，否则提示“请选择一个分类”；若已经选择，则关闭弹窗，显示选中的分类
 * 1.3.2点击取消、×，则关闭弹窗；
 * 2提交进行校验时错误提示语，红色字体显示
 *  2.1未选择，则提示“请选择一个分类”
 * 3当添加分类为“否”时，不展示此项
 */
class SingleBoxList extends Component {
	static propTypes = {
		items: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.isRequired,
			name: PropTypes.string,
			title: PropTypes.string,
			desc: PropTypes.string
		})).isRequired,
	}
	state = {
		value: this.props.value || -1
	}

	handleClick = item => () => {
		this.setState({ value: item.id }, () => {
			this.props.onChange && this.props.onChange(item.id)
		})
	}
	render() {
		const { items } = this.props
		return (
			<div>
				<Modal
					id="video-dispatch-single-box-list-modal-id"
					wrapClassName='single-box-list-modal'
					title={'选择分类'}
					width={620}
					cancelText='取消'
					okText='确定'
					{...this.props}
					onOk={() => {
						this.props.onOk(this.state.value)
					}}

				>
					<header>
						{this.props.children}
					</header>
					<main className='radio-buttons-box clearfix'>
						{
							items.map(item =>
								<RadioBtn key={item.id} cur={this.state.value === item.id} onClick={this.handleClick(item)} desc={item.desc}>{item.name || item.title}</RadioBtn>
							)
						}
					</main>
				</Modal>
			</div>
		)
	}
}

const RadioBtn = ({ children, cur, onClick, desc }) => {
	return desc ?
		<Popover placement="bottom" content={
			<div style={{ maxWidth: '360px', lineHeight: '1.1' }}>{desc}</div>
		} trigger="hover">
			<div onClick={onClick} className={'radio-buttons' + (cur ? ' active' : '')}>{children}</div>
		</Popover> :
		<div onClick={onClick} className={'radio-buttons' + (cur ? ' active' : '')}>{children}</div>
}

export default SingleBoxList
