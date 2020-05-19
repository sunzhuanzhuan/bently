import React, { Component } from "react";
import {
	Select, Spin
} from "antd";
import debounce from 'lodash/debounce';
import api from '../../../api'

const Option = Select.Option

// 模糊搜索公司
export default class TempleSelect extends Component {
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
		api.get('/export/account/getTemplateListByName', { params: { name: value } }).then(res => {
			const { data = [] } = res.data
			if (fetchId !== this.lastFetchId) {
				return;
			}
			!this.isUnmount && this.setState({ data: data, searchIng: false });
		});
	}
	handleChange = (value) => {
		if (!value) this.search('')
		this.setState({
			value,
			data: [],
			searchIng: false
		}, () => {
			const { onChange, } = this.props
			onChange && onChange(value)

		});
	}
	componentDidMount = () => {
		this.search('')
	}
	focusEvent = () => {
		if (!this.state.searchIng && !this.state.data.length) {
			this.search('')
		}
	}
	selectValue = (value) => {
		const { setTempleName } = this.props
		const template_id = value.key
		api.get('/operator-gateway/export/account/quotation/templateDetail', { params: { template_id: template_id } }).then(res => {

			const { company_name, company_id = 0 } = res.data
			setTempleName && setTempleName(company_id, company_name)
		})
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
				onSelect={this.selectValue}
				onBlur={this.focusEvent}
				onChange={this.handleChange}
				{...this.props}
			>
				{data.map((one) => <Option key={one.id} value={one.id}>{one.name}</Option>)}
			</Select>)
	}
}
