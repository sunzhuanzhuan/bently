import React, { Component } from 'react'
import { Select } from 'antd';
const Option = Select.Option

class AppInfo extends Component {
	constructor(props) {
		super(props)
		this.state = {
			permissionFields: props.permissionFields || [],
			checkedFields: props.checkedFields || {},
			resourceList: props.resourceList || []
		}
	}

	render() {
		const { applist = [], searchSourceList, resourceTypeSelect } = this.props;

		return (
			<div style={{ marginBottom: 10, display: 'inline-block' }}>
				应用类型：<Select
					showSearch
					style={{ width: 200, marginRight: 20 }}
					placeholder="请选择应用"
					onChange={this.props.onChange}
					defaultValue={1}
				>
					{applist.map(d =>
						<Option value={d.app_id} key={d.app_id}>{d.app_name}</Option>
					)}
				</Select>
				资源类型：<Select style={{ width: 200, }} onChange={searchSourceList} placeholder='请选择资源'>
					{resourceTypeSelect.map(one => <Select.Option key={one.id} value={one.id}>
						{one.name}
					</Select.Option>)}
				</Select>
			</div>
		)
	}
}

export default AppInfo;
