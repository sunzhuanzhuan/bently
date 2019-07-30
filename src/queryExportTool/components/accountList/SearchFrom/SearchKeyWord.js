import React from 'react';
import { Input, Icon } from 'antd';
import "./index.less";
import SearchSelect from "./SearchSelect";
const Search = Input.Search;
const searchMap = [{
	name: '账号名称/ID',
	keyName: 'account',
}, {
	name: '账号简介/认证信息',
	keyName: 'remark',
}, {
	name: '内容热词/提及品牌词',
	keyName: 'tag',
}]
const infoMap = {
	account: '输入账号名称、ID，多个以空格隔开',
	remark: '输入账号简介、认证信息中的关键词，多个以空格隔开'
}
export class DefaultSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			checkedType: 'account'
		};
	}

	emitEmpty = () => {
		const { onSearch } = this.props;
		this.userNameInput.focus();
		// this.setState({ userName: '' });
		this.userName = '';
		this.props.form.setFieldsValue({ keyword: '' });
		onSearch && onSearch({ optionsNames: '' });
	}

	componentWillReceiveProps(nextProps) {
		// debugger;
		if ("keyword" in nextProps) {
			this.setState({
				userName: nextProps.keyword
			})
		}
	}

	onSearch = () => {
		const { form } = this.props;
		const { onSearch } = this.props;
		const userName = form.getFieldValue('keyword')
		onSearch && onSearch({ optionsNames: userName || '' });

	}
	// onChangeUserName = (e) => {
	// 	// const { onChange } = this.props;
	// 	// this.setState({ userName: e.target.value });
	// 	// this.userName = e.target.value;
	// 	// onChange && onChange({ userName: e.target.value })
	// }
	render() {

		const { form } = this.props;
		const { getFieldDecorator } = form;
		const { userName } = this.state;
		const suffix = userName ? <span key='1' style={{ padding: "0 10px" }}><Icon type="close-circle" onClick={this.emitEmpty} /></span> : null;
		return (
			<div className='key-word-box'>
				<div className='key-word-tab'>
					{searchMap.map(one => <div
						key={one.name}
						className={`${one.keyName == this.state.checkedType ? 'checked-style' : ''}`}
						onClick={() => this.setState({ checkedType: one.keyName })}>
						{one.name}
					</div>)}
				</div>
				{getFieldDecorator('keyword', {
					initialValue: userName
				})(
					this.state.checkedType != 'tag' ? <Search
						// onChange={this.onChangeUserName}
						style={{ width: "540px" }}
						placeholder={infoMap[this.state.checkedType]}
						suffix={suffix}
						enterButton
						onSearch={this.onSearch}
						ref={node => this.userNameInput = node}
					/> : <SearchSelect />
				)}

			</div>
		);
	}
}


export default DefaultSearch;
