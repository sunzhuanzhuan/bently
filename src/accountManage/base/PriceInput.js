import React, { Component } from 'react'
import { Input, Popover } from 'antd';

function formatNumber(value) {
	value += '';
	const unit = ['零', '个', '十', '百', '千', '万', '十万', '百万', '千万', '亿']
	const list = value.split('.');
	const prefix = list[0].charAt(0) === '-' ? '-' : '';
	let num = prefix ? list[0].slice(1) : list[0];
	let result = '';
	while (num.length > 3) {
		result = `,${num.slice(-3)}${result}`;
		num = num.slice(0, num.length - 3);
	}
	if (num) {
		result = num + result;
	}
	return [
		unit[list[0].length],
		`${prefix}${result}${list[1] ? `.${list[1]}` : ''}`
	];
}

export default class PriceInput extends Component {
	onChange = (e) => {
		const { value } = e.target;
		// const reg = /^-?(0|[1-9][0-9]*)$/;
		const reg = /^([1-9][0-9]*)$/;
		if ((!isNaN(value) && reg.test(value)) || value === '') {
			this.props.onChange(value);
		}
	}

	onBlur = () => {
		const { value = '', onBlur, onChange } = this.props;
		if (String(value).charAt(value.length - 1) === '.') {
			onChange({ value: value.slice(0, -1) });
		}
		if (onBlur) {
			onBlur();
		}
	}

	render() {
		const { value = '', isEdit = false } = this.props;
		const [_title, _content] = formatNumber(value)
		const title = value ? (
			<span className="price-bold-unit">
        {value !== '-' ? _title : '零'}
      </span>) : '暂无';
		const content = value ? (
			<span className="price-bold-number">
        {value !== '-' ? _content : '-'}
      </span>) : '请输入价格';
		return (isEdit ?
				<Popover
					trigger={['focus']}
					title={title}
					content={content}
					placement="topLeft"
					overlayClassName="price-bold-input"
					getPopupContainer={() => document.querySelector('.price_scroll_container') || document.querySelector('#account-manage-container')}
				>
					{/*{...this.props}*/}
					<Input
						{...this.props}
						onChange={this.onChange}
						onBlur={this.onBlur}
						placeholder="请输入价格"
						maxLength="9"
					/>
				</Popover> : <p style={{textAlign:'center', margin:"0",fontWeight: '500', color: '#333'}}>{value || '-'}</p>
		);
	}
}
