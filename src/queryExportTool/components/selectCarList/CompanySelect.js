import React, { Component } from "react";
import {
	Select, Spin
} from "antd";
import debounce from 'lodash/debounce';


const Option = Select.Option

// 模糊搜索公司
export default class SelectCompany extends Component {
	state = {
		data: [],
		value: null,
		searchIng: false
	}
	search = (value) => {
		let { action } = this.props
		this.lastFetchId += 1;
		const fetchId = this.lastFetchId;
		this.setState({ searchIng: true });
		action({ name: value })
			.then(({ data: list }) => {
				if (fetchId !== this.lastFetchId) {
					return;
				}
				list.unshift({ company_id: 0, name: "不限" })
				!this.isUnmount && this.setState({ data: list, searchIng: false });
			});
	}
	handleChange = (value) => {
		if (!value) this.search('')
		this.setState({
			value,
			data: [],
			searchIng: false
		}, () => {
			this.props.onChange && this.props.onChange(value)
		});
	}
	focusEvent = () => {
		if (!this.state.searchIng && this.state.data.length > 0) {
			this.search('')
		}
	}
	componentWillMount() {
		this.search('')
	}
	componentWillUnmount() {
		this.isUnmount = true
	}

	constructor(props) {
		super(props);
		this.lastFetchId = 0;
		this.search = debounce(this.search, 800);
	}

	render() {
		const { desc = '请输入并从下拉框中选择' } = this.props;
		const { searchIng, data, value } = this.state;
		return (
			<Select
				showSearch
				allowClear
				labelInValue
				filterOption={false}
				value={value}
				placeholder={desc}
				notFoundContent={searchIng ? <Spin size="small" /> : null}
				onSearch={this.search}
				onChange={this.handleChange}
				onBlur={this.focusEvent}
				{...this.props}
			>
				{data.map(({ company_id, name }) => <Option key={company_id}>{name}</Option>)}
			</Select>)
	}
}
