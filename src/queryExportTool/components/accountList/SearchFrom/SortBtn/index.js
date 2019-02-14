import React, { PureComponent } from "react"
import { Icon } from 'antd'
import './index.less'

export default class SortBtn extends PureComponent {
	handleClick = () => {
		const { field, onChange, sort } = this.props
		let newSort;
		switch (sort) {
			case 'asc' :
				newSort = 'desc'
				break;
			case 'desc':
				newSort = 'asc'
				break;
			default:
				newSort = 'desc'
				break
		}
		onChange && onChange(field, newSort)
	}

	render() {
		const { title = '未知', sort = '', tip } = this.props
		return <div title={title} className={"sorter-button-container" + (sort ? ' active' : '')} onClick={this.handleClick}>
			{title}{tip ? tip : null}
			<div className="sorter-suffix-icon">
				<Icon type="caret-up" theme="outlined" className={sort === 'asc' ? 'on' : 'off'} />
				<Icon type="caret-down" theme="outlined" className={sort === 'desc' ? 'on' : 'off'} />
			</div>
		</div>
	}
}
