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
		this.handleDrag = debounce(this.handleDrag, 1000)
	}
	componentDidMount() {
		this.setState({ data: this.props.systemEquitiesList })
	}
	static getDerivedStateFromProps(props, state) {
		if (state.data !== props.systemEquitiesList) {
			return { data: props.systemEquitiesList };
		}
		return null;
	}
	handleDrag = (dragIndex, hoverIndex) => {
		const { data } = this.state
		data.splice(hoverIndex, 0, ...data.splice(dragIndex, 1))
		this.setState(data)
		const idSortList = data.map((one, index) => ({ id: one.id, sort: index }))
		this.props.systemEquitiesTypeSortAsync({ idSortList })
	}

	render() {
		const { data } = this.state
		console.log("EditSelectedFieldsContent -> render -> data", data)
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
							onEdit={(data) => this.props.showEdit(2, data)}
							onDelete={() => this.props.systemDeleteEquitiesAsync(item.id)}
						/>)}
				</div>
			</div>
		</div>
	}
}
