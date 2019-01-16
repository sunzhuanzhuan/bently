import React, { Component } from "react"
import { Modal, Popover, message } from 'antd'
import PropTypes from 'prop-types'

import './index.less'


class MultipleBoxList extends Component {
	static propTypes = {
		items: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.isRequired,
			name: PropTypes.string,
			title: PropTypes.string,
			desc: PropTypes.string
		})).isRequired,
		value: PropTypes.arrayOf(PropTypes.number)
	}
	state = {
		value: this.props.value || [this.props.items[0]['id'], -1],
	}

	handleClick = item => () => {
		let newVal = [...this.state.value]
		if (String(newVal[1]) === String(item.id)) return
		newVal[1] = item.id
		this.setState({ value: newVal}, () => {
			this.props.onChange && this.props.onChange(newVal)
		})
	}
	onToggerCategory = item => () => {
		let newVal = [...this.state.value]
		if (String(newVal[0]) === String(item.id)) return
		newVal = [item.id, -1]
		this.setState({ value: newVal })
	}

	constructor(props) {
		super(props)
		this.itemsMap = props.items.reduce((obj, item) => {
			obj[item['id']] = item
			return obj
		}, {})
	}

	render() {
		const { items } = this.props
		const value = this.state.value
		const children = (this.itemsMap[value[0]] && this.itemsMap[value[0]]['children']) || []
		return (
			<div>
				<Modal
					id="video-dispatch-single-box-list-modal-id"
					wrapClassName='multiple-box-list-modal'
					title={'选择分类'}
					width={620}
					cancelText='取消'
					okText='确定'
					{...this.props}
					onOk={() => {
						if (value[1] < 0) return message.error('请选择一个分类')
						this.props.onOk(this.state.value)
					}}
				>
					<header>
						{this.props.children}
					</header>
					<main className='items-container clearfix'>
						<div className='left-items'>
							{
								items.map(item =>
									<CategoryItem key={item.id} cur={String(value[0]) === String(item.id)} onClick={this.onToggerCategory(item)} desc={item.desc}>{item.name || item.title}</CategoryItem>
								)
							}
						</div>
						<div className='right-items'>
							{
								children.length ? children.map(item =>
									<RadioBtn key={item.id} cur={String(value[1]) === String(item.id)} onClick={this.handleClick(item)} desc={item.desc}>{item.name || item.title}</RadioBtn>
								) : <p>请先选择一级分类!</p>
							}

						</div>

					</main>
				</Modal>
			</div>
		)
	}
}


const CategoryItem = ({ children, cur, onClick }) => {
	return <div onClick={onClick} className={'category-items' + (cur ? ' active' : '')}>{children}</div>
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

export default MultipleBoxList
