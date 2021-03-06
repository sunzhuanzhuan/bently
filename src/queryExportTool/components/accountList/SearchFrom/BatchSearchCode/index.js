/**
 * 批量找号查询组件
 */
import React, { Component } from 'react';
import { Form, Select, Row, Col, Input, Button, Cascader } from 'antd';
import "./inedex.less"
import { withRouter } from "react-router-dom";
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const searchMap = {
	1: { name: "账号昵称", key: 'snsNames' },
	2: { name: "账号ID", key: 'snsIds' },
	3: { name: "账号accountId", key: 'accountIds' },
}
const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 6 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 18 },
	},
};
class BatchSearchCode extends Component {
	constructor(props) {
		super(props);
		this.state = {
			accoutName: [],
			selectValue: 2,//需求变更：模糊匹配删除账号昵称查询
			cascaderValue: 1,
		};
	}
	onSearchAccout = (e) => {
		e.preventDefault();
    let { accoutName } = this.state
		this.props.form.validateFields((err, values) => {
			const platformId = values.platformId[values.platformId.length - 1]
			delete values.vailAccoutName
			delete values.keyword

			if (!err) {
        if (values.fieldType === 3) {
          if (accoutName && Array.isArray(accoutName)) {
            let newAccountName = [];
            accoutName.forEach(item => {
              item = item.replace(/\s*/g, "");
              newAccountName.push(item);
            });
            accoutName = newAccountName;
          }
        }
				const allValue = {
					fieldType: values.fieldType,
					platformId: platformId ? platformId : null,
					queryType: values.queryType,
					[searchMap[values.fieldType].key]: accoutName,
					accoutName: accoutName
				}
				this.props.batchSearch({ ...allValue })
			}
		});
	}
	//清空数据
	cleanAccount = () => {
		this.props.form.resetFields('keyword')
		this.setState({ accoutName: [] })
	}
	//处理账号
	onChangeAccount = (e) => {
		const accoutName = e.target.value.split(/[\n]/).filter(one => one && one.replace(/(^\s*)|(\s*$)/g, ""))
		this.setState({ accoutName })
	}
	//
	//个数验证
	vailAccoutName = (rule, value, callback) => {
		const { selectValue } = this.state
		const accoutName = (value.split(/[\n]/)).filter(one => one && one.replace(/(^\s*)|(\s*$)/g, ""))

		const parent = /^[\r\s\n0-9]+$/
		if (accoutName)
			if (accoutName.length > 200) {
				callback("最多可输入200个账号")
			} else if (!parent.test(value) && selectValue == 3) {
				callback("只能输入数字")
			}
			else {
				callback()
			}

	}
	//设置选中的值
	handleSelectChange = (value) => {
		this.setState({
			selectValue: value
		},
			() => {
				//查询条件变化时强行校验keyword的值（解决切换查询条件时，不校验keyword的值）
				const { validateFields, getFieldValue } = this.props.form;
				getFieldValue('keyword') && validateFields(['keyword'], { force: true })
			})
	}

	onChangeCascader = (value) => {
		this.setState({
			cascaderValue: value
		}, () => {
			/* 当选择不限时，查询方式只能是精确，只能查询accountId */
			if (value == 0) {
				this.setState({ selectValue: 3 })
				this.props.form.setFieldsValue({ fieldType: 3 })
				this.props.form.setFieldsValue({ queryType: 2 })
			}
		})
	}
	/* 修改查询方式时，查询条件默认为2:账号ID */
	queryTypeChange = (value) => {
		this.props.form.setFieldsValue({ fieldType: 2 })
	}
	render() {
		const { selectValue, cascaderValue } = this.state
		const { getFieldDecorator, getFieldValue } = this.props.form;
		const { filtersMetaMap = {} } = this.props
		function displayRender(label) {
			return label[label.length - 1];
		}
		const isShowSearch = getFieldValue('keyword') && getFieldValue('keyword').replace(/(^\s*)|(\s*$)/g, "")
		return (
			<Form className="batch-search-code">
				<Row>
					<Col span={8}>
						<FormItem
							label="平台"
							{...formItemLayout}
						>
							{getFieldDecorator('platformId', {
								initialValue: [9],
							})(
								<Cascader
									popupClassName="batch-serach-code-cascader"
									fieldNames={{ label: 'name', value: 'platformId', children: 'groupedPlatforms' }}
									options={filtersMetaMap && filtersMetaMap.groups}
									expandTrigger="click"
									displayRender={displayRender}
									onChange={this.onChangeCascader}
									placeholder="请选择"
									allowClear={false}
								/>
							)}
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem
							label="查询方式"
							{...formItemLayout}
						>
							{getFieldDecorator('queryType', {
								initialValue: 2,
							})(
								<Select placeholder="请选择"
									onChange={this.queryTypeChange}
									disabled={getFieldValue('platformId') == 0}>
									<Option value={1} >模糊匹配</Option>
									<Option value={2} >精确查询</Option>
								</Select>
							)}
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem
							label="查询条件"
							{...formItemLayout}
						>
							{getFieldDecorator('fieldType', {
								initialValue: selectValue,
							})(
								<Select
									placeholder="请选择"
									onChange={this.handleSelectChange}
									disabled={cascaderValue == 0}
								>
									<Option value={2} key={2}>账号ID</Option>
									{getFieldValue('queryType') == 2 ? <Option value={3} key={3}>账号accountId</Option> : null}
									<Option value={1} key={1}>账号昵称</Option>
								</Select>
							)}
						</FormItem>
					</Col>
				</Row>
				<div className="account-name">
					<div className="text">请输入<span style={{ color: "red" }}>{searchMap[getFieldValue('fieldType')].name}</span>，一行一个，最多200个</div>
					<FormItem>
						{getFieldDecorator('keyword', {
							rules: [{ validator: this.vailAccoutName }],
						})(
							<TextArea autosize={{ minRows: 10, maxRows: 10 }} onChange={this.onChangeAccount} />
						)}
					</FormItem>
				</div>
				<Button type="primary" className="search-button" onClick={this.cleanAccount} disabled={!isShowSearch}>清空</Button>
				<Button type="primary" className="search-button" onClick={this.onSearchAccout} disabled={!isShowSearch}>查询</Button>
			</Form>
		);
	}
}
const BatchSearchCodeForm = Form.create()(withRouter(BatchSearchCode));
export default BatchSearchCodeForm;
