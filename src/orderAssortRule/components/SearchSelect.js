import React, { Component } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import api from '../../api'
import Interface from '../constants/Interface'
const { Option } = Select;

class UserRemoteSelect extends Component {
	constructor(props) {
		super(props);
		this.lastFetchId = 0;
		this.fetchUser = debounce(this.fetchUser, 800);
		this.state = {
			data: [],
			value: props.value || [],
			fetching: false,
		};
	}
	fetchUser = value => {
		this.lastFetchId += 1;
		const fetchId = this.lastFetchId;
		this.setState({ data: [], fetching: true });
		api.get(Interface.queryBrandList, {
			params: {
				queryBrandName: value,
				bpId: this.props.bpId,
				page: 1,
				pageSize: 50
			}
		}).then(({ data }) => {
			if (fetchId !== this.lastFetchId) {
				// for fetch callback order
				return;
			}
			this.setState({ data: data.list || [], fetching: false });
		}
		)
	};

	handleChange = value => {
		const { onChange } = this.props
		this.setState({
			value,
			data: [],
			fetching: false,
		});
		onChange && onChange(value)
	};

	render() {
		const { fetching, data, value, } = this.state;
		const { isEdit } = this.props
		return (
			<Select
				mode="multiple"
				labelInValue
				value={value}
				placeholder="请输入品牌名称"
				notFoundContent={fetching ? <Spin size="small" /> : null}
				filterOption={false}
				onSearch={this.fetchUser}
				onChange={this.handleChange}
				style={{ width: '100%' }}
				disabled={!isEdit}
			>
				{data.map(d => (
					<Option key={d.companyBrandId}>{d.brandName}（{d.companyName}）</Option>
				))}
			</Select>
		);
	}
}

export default UserRemoteSelect 
