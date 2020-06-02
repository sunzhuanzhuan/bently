/**
 * unlimitedValue 多选时传入，选择此值时，清空其他选择值
 * isoOnlyOne 是否单选
 * tagsArray标签数组
 */
import React, { Component } from 'react';
import MoreOperate from "../../../common/MoreOperate";
import { Tag, Tooltip } from 'antd';
import "./index.less";
const CheckableTag = Tag.CheckableTag;
class ItemLable extends Component {
	static propTypes = {
		// tagsArray: PropTypes.array.isRequired,
		// onChange: PropTypes.func.isRequired
	}
	constructor(props) {
		super(props);
		this.state = {
			selectedTags: [],
		};
	}
	componentDidMount = () => {
		const { value } = this.props
		console.log("ItemLable -> componentDidMount -> value", value)
		this.setState({ selectedTags: value })

	}
	componentWillReceiveProps(nextProps) {

		if ("value" in nextProps) {
			this.setState({
				selectedTags: nextProps.value || []
			})
			console.log("ItemLable -> componentWillReceiveProps -> nextProps.value", nextProps.value)

		}
	}

	handleChange(tagId, checked) {
		const { selectedTags = [] } = this.state;
		let nextSelectedTags = [];
		const { onChange, unlimitedValue, isoOnlyOne } = this.props;
		if (tagId == unlimitedValue || isoOnlyOne) {
			nextSelectedTags = checked ? [tagId] : [];
		} else {
			nextSelectedTags = checked
				? [...selectedTags, tagId]
				: selectedTags.filter(t => t !== tagId);
		}
		if (!("value" in this.props)) {
			this.setState({ selectedTags: nextSelectedTags });
		}
		// onChange && onChange(nextSelectedTags, nextSelectedTags)

		this.triggerChange(nextSelectedTags)

	}
	triggerChange = changedValue => {
		const onChange = this.props.onChange;
		const { onClick, tagsArray = [] } = this.props;

		const map = tagsArray.reduce((obj, item) => {
			obj[item.value || item.id] = item.name;
			return obj;
		}, {})
		onClick && onClick({ optionsNames: changedValue.map(item => map[item]) });

		if (onChange) {
			onChange(changedValue);
		}

	}
	render() {
		const { tagsArray = [], isTooltip } = this.props
		const { selectedTags } = this.state;
		console.log("ItemLable -> render -> selectedTags", selectedTags)
		return (
			<div className="item-lable-box">
				<MoreOperate lineHight={40} textMore="更多" >
					{tagsArray.map((tag) => {
						const checkedNow = selectedTags && selectedTags.indexOf(tag.id) > -1;
						const brandList = (tag.brand_list || []).map(one => one.name)
						return <CheckableTag
							className="ant-tag-theme-thin"
							key={tag.id}
							checked={checkedNow}
							onChange={checked => this.handleChange(tag.id, checked)}
						>
							{isTooltip && tag.brand_list && tag.brand_list.length > 0 ? <Tooltip title={`${brandList.join('、')}等品牌使用过的账号`}
								getPopupContainer={() => document.querySelector('.query-export-tool')}>
								{tag.name}
							</Tooltip> : tag.name}
						</CheckableTag>
					})
					}
				</MoreOperate>
			</div >
		);
	}
}

export default ItemLable;
