import React, { Component } from "react"
import { Skeleton } from 'antd'
import debounce from 'lodash/debounce';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import DragItems from "./DragItems";

const listDefault = [
	{
		name: '权益类型：',
		value: 'ddd',
		type: 'text'
	}, {
		name: '权益单/选设置',
		value: '单选',
		type: 'text'
	}, {
		name: '权益单/选设置',
		value: [],
		type: 'tags'
	}
]
@DragDropContext(HTML5Backend)
export default class EditSelectedFieldsContent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [
				{ id: 1, list: listDefault },
				{ id: 12, list: listDefault },
				{ id: 3, list: listDefault },
				{ id: 4, list: listDefault }
			]
		}
	}
	handleDrag = (dragIndex, hoverIndex) => {
		const { data } = this.state
		console.log("EditSelectedFieldsContent -> handleDrag -> dragIndex, hoverIndex", dragIndex, hoverIndex)
		data.splice(hoverIndex, 0, ...data.splice(dragIndex, 1))
		this.setState(data)
	}

	handleDelete = (deleteIndex) => {
		console.log("EditSelectedFieldsContent -> handleDelete -> deleteIndex", deleteIndex)
	}
	onEdit = () => {
		this.props.showEdit(2)
	}
	render() {
		// 搜索筛选
		return <div className='fields-selected-area-container'>
			<div className='content-fields-list'>
				<div>
					{this.state.data.map((item, n) =>
						<DragItems
							key={item.id}
							index={n}
							data={item}
							drag={this.handleDrag}
							del={this.handleDelete}
							onEdit={this.onEdit}
						/>)}
				</div>
			</div>
		</div>
	}
}
