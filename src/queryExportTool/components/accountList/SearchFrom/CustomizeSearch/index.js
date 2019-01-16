/**
 * 自定义筛选项组件
 */
import React, { Component } from 'react'
import { Tag, message } from 'antd';
import "./index.less"
import PropTypes from 'prop-types'
const TabBox = (props) => {
	const { lable, list, onChangeAdd, onClose, clickOperate, operate } = props
	return <div className="option-box">
		<div className="lable-text">{lable} <a className="lable-operate" onClick={clickOperate}>{operate}</a></div>
		<div className="lable-list">
			{list.map((one, index) => {
				return <Tag {...props} key={one.id} onClose={onClose && onClose.bind(null, one.id)} onClick={onChangeAdd && onChangeAdd.bind(null, one.id)}>{one.name}</Tag>
			})}
		</div>
	</div>
}
class CustomizeSearch extends Component {
	static propTypes = {
		defaultList: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.isRequired,
				name: PropTypes.string.isRequired,
			})
		).isRequired,
		defaultSelectList: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.isRequired,
				name: PropTypes.string.isRequired,
			})
		).isRequired,
		AudienceList: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.isRequired,
				name: PropTypes.string.isRequired,
			})
		).isRequired,
		otherList: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.isRequired,
				name: PropTypes.string.isRequired,
			})
		).isRequired,

	}
	constructor(props) {
		super(props);
		this.state = {
			defaultList: [],
			selectList: [],
			AudienceList: [],
			otherList: []
		};
	}
	componentDidMount = () => {
		this.setDefultValue()
	}
	setDefultValue = () => {
		const { defaultList, defaultSelectList, AudienceList, otherList } = this.props
		this.setState({
			defaultList: [...defaultList],
			selectList: [...defaultSelectList],
			AudienceList: this.removeItem(defaultSelectList, AudienceList),
			otherList: this.removeItem(defaultSelectList, otherList)
		})
	}
	//去除数据
	removeItem = (selectList, allList) => {
		const ids = selectList.map(one => one.id)
		return allList.filter(item => (!(ids.indexOf(item.id) > -1)))
	}
	// 重置
	clickResetOperate = () => {
		this.setDefultValue()
	}
	//方法
	onChangeAudience = (type) => (id) => {
		const { selectList } = this.state
		if (selectList.length > 5) {
			message.error("筛选框已满，请删除不常用的选项")
		} else {
			const itemNow = this.state[type].filter(item => id == item.id)
			const listNow = this.state[type].filter(item => id != item.id)
			selectList.push(itemNow[0])
			this.setState({
				selectList: selectList,
				[type]: listNow
			})
		}
	}
	//删除已选操作
	onCloseSelected = (id) => {
		const { selectList } = this.state
		const selectListNow = selectList.filter(item => id != item.id)
		this.getPushList("otherList", id)
		this.getPushList("AudienceList", id)
		this.setState({
			selectList: selectListNow,
		})
	}
	//改变数据
	getPushList = (type, id) => {
		const defaultList = this.props[type]
		let nowList = this.state[type]
		const otherListNow = defaultList.filter(item => id == item.id)
		if (otherListNow.length > 0) {
			nowList.push(otherListNow[0])
			this.setState({ [type]: nowList })
		}
	}
	render() {
		const { defaultList,
			selectList,
			AudienceList,
			otherList } = this.state
		return (
			<div className="customize-search">
				<div className="lable-text">选出您常用的筛选类型，添加到已选类型里，最多支持添加6个筛选项</div>
				<div className="have-box">
					<TabBox lable="默认类型" className="defult-item all-item" list={defaultList} />
					<TabBox lable="已选类型" className="selected-item all-item" list={selectList} onClose={this.onCloseSelected} closable operate="重置" clickOperate={this.clickResetOperate} />
				</div>
				<TabBox lable="受众画像筛选项" className="not-selected-item all-item" list={AudienceList} onChangeAdd={this.onChangeAudience("AudienceList")} closable />
				<TabBox lable="其他筛选项" className="not-selected-item all-item" list={otherList} onChangeAdd={this.onChangeAudience("otherList")} closable />
			</div>
		);
	}
}

export default CustomizeSearch;
