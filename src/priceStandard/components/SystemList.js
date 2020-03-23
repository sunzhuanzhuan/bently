import React, { Component } from "react"
import { Skeleton } from 'antd'
import debounce from 'lodash/debounce';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import DragItems from "./DragItems";

@DragDropContext(HTML5Backend)
export default class EditSelectedFieldsContent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: []
		}
	}
	componentDidMount() {
		this.setState({ data: this.props.systemEquitiesList })
	}

	handleDrag = (dragIndex, hoverIndex) => {
		const { data } = this.state
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
		const { data } = this.state
		// 搜索筛选
		return <div className='fields-selected-area-container'>
			<div className='content-fields-list'>
				<div>
					{data.map((item, n) =>
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
