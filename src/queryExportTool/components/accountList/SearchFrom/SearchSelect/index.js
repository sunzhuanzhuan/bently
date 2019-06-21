import React, { Component } from 'react'

import { Select, Spin, Input, Button, Icon } from 'antd';
import debounce from 'lodash/debounce';
import api from "../../../../../api";
const InputGroup = Input.Group;
const { Option } = Select;

class UserRemoteSelect extends Component {
	constructor(props) {
		super(props);
		this.lastFetchId = 0;
		this.fetchUser = debounce(this.fetchUser, 800);
	}

	state = {
		optionList: [],
		value: [],
		fetching: false,
	};
	componentDidMount = () => {
		this.fetchUser()
	}
	fetchUser = value => {
		console.log('fetching user', value);
		this.lastFetchId += 1;
		const fetchId = this.lastFetchId;
		this.setState({ fetching: true, optionList: [] });
		api.get('operator-gateway/search/export/getBrand', { params: { name: value } })
			.then(({ data }) => {
				console.log(fetchId, this.lastFetchId)
				if (fetchId !== this.lastFetchId) {
					return;
				}
				if (!data.length > 0) {
					data = [{ id: "none", name: `没有“${value}”相关的内容热词或品牌词` }]
				}
				this.setState({ optionList: data, fetching: false });
			})

	};

	handleChange = value => {
		console.log("TCL: value", value)
		this.setState({
			value,
		});
	};
	searchName = () => {
		const { onChange } = this.props
		console.log('searchName', this.state.value);
		onChange && onChange(this.state.value)
	}
	render() {
		const { fetching, optionList, value } = this.state;
		return (
			<InputGroup compact>
				<Select
					mode="multiple"
					value={value}
					placeholder="输入账号发文中的内容关键词、提及的品牌词，多个以空格隔开"
					notFoundContent={fetching ? <Spin size="small" /> : null}
					onSearch={this.fetchUser}
					onChange={this.handleChange}
					style={{ width: 493 }}
					filterOption={false}
					allowClear={true}
				>
					{optionList.map(one => <Option key={one.id} disabled={one.id == 'none'} value={one.name}>{one.name}</Option>)}
				</Select>
				<Button type='primary' onClick={this.searchName} style={{ width: 47.5 }}>
					<Icon type="search" style={{ fontSize: 15 }} />
				</Button>
			</InputGroup>
		);
	}
}

export default UserRemoteSelect
