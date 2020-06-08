import React from 'react'
import { Popover, Icon } from 'antd';
import { MoreFilter } from '../../../index'

export default class MoreFilterPopover extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false
		}
	}
	onVisibleChange = (visible) => {
		this.setState({
			visible
		})

	}
	onMoreFilterOk = (params) => {
		//过滤掉未定义的字段
		params = Object.keys(params).reduce((obj, item) => {
			if (params[item] !== undefined) {
				obj[item] = params[item];
			}
			return obj;
		}, {});
		this.props.onChange(params)
	}
	onMoreFilterCancel = () => {
		this.setState({ moreFilterVisible: false })
	}
	render() {
		const { filterMore, style } = this.props;
		const { selectedItems, visible } = this.state;
		console.log('style, ', style)
		return <Popover
			overlayClassName='filter-more-popover'
			overlayStyle={{ width: 600, height: 500, ...style }}
			placement="topLeft"
			title='更多筛选'
			onVisibleChange={this.onVisibleChange}
			visible={visible}
			trigger='click'
			content={<MoreFilter ref={e => this.MoreFilterNode = e} onOk={this.onMoreFilterOk} onCancel={this.onMoreFilterCancel} filterMore={filterMore}></MoreFilter>}
		>
			<span className="filter-common-items-more" onClick={this.showMore}>
				更多筛选<Icon style={{ paddingLeft: '10px' }} type={visible ? 'up' : 'down'}></Icon>
			</span>
		</Popover>
	}
}
