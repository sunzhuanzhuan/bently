import React, { Component } from "react"
import { Icon, Input, Divider, Form } from 'antd'
import { DragSource, DropTarget } from "react-dnd";
import { findDOMNode } from "react-dom";
import CardType from './CardType'
const DRAG_TYPE = 'ITEM'

// 拖拽源事件对象
const cardSource = {
	beginDrag(props) {
		return {
			id: props.id,
			index: props.index
		}
	},
	canDrag(props, monitor) {
		return true
	}
}
// 拖拽目标事件对象
const cardTarget = {
	hover(props, monitor, component) {
		if (!component) {
			return null
		}
		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index
		if (dragIndex === hoverIndex) {
			return
		}
		const hoverBoundingRect = (findDOMNode(component)).getBoundingClientRect()
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
		const clientOffset = monitor.getClientOffset()
		const hoverClientY = (clientOffset).y - hoverBoundingRect.top
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		}
		props.drag(dragIndex, hoverIndex)
		monitor.getItem().index = hoverIndex
	}
}

@DropTarget(DRAG_TYPE, cardTarget, (connect) => ({
	connectDropTarget: connect.dropTarget()
}))
@DragSource(
	DRAG_TYPE,
	cardSource,
	(connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	})
)
export default class DragItems extends Component {

	constructor(props) {
		super(props)
		this.state = {
			// edit: false,
			errorProps: {},
		}
	}

	render() {
		const {
			isDragging,
			connectDragSource,
			connectDropTarget,
			data = {},
			onEdit,
			onDelete
		} = this.props
		const opacity = isDragging ? 0 : 1

		return connectDragSource && connectDropTarget &&
			connectDragSource(connectDropTarget(
				<div>
					<CardType data={data} onEdit={onEdit} onDelete={onDelete} />
				</div>
			))
	}
}
