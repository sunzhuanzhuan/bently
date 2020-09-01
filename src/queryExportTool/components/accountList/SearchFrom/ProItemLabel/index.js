import React from 'react';
import MoreOperate from "../../../common/MoreOperate";
import './index.less';

class ProItemLabel extends React.PureComponent{
	constructor(props) {
		super(props);
		this.state = {
			scrollContainer: null, // 滚动容器
			itemData: {},
			popover: {
				show: false,
				width: 0,
				top: 0,
				left: 0
			}
		}
	}

	static LEVEL_2 = 'level2';
	static LEVEL_3 = 'level3';

	componentWillMount() {
		const scrollContainer = document.getElementById('app-content-children-id');
		this.setState({
			scrollContainer: scrollContainer
		});
		scrollContainer.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount(){
		this.state.scrollContainer.removeEventListener('scroll',this.handleScroll);
	}

	handleScroll = () => {
		let show = this.state.popover.show;
		show && this.setState({
			popover: {
				show: false
			}
		});
	}


	/**
	 * 获取item
	 * @param id
	 * @returns {*|*[]}
	 */
	getCurItemData = (code) => {
		const { data = [] } = this.props;
		return data.find(item => item.code === Number(code)) || {};
	};


	/**
	 * 鼠标进入事件
	 * @param e
	 */
	onMouseEnter = (e) => {
		const target = e.target;
		// 一级菜单是否选中
		const id = target.getAttribute('id');
		let popover = {
			show: true
		};
		if (id) {
			let rect = target.getBoundingClientRect();
			let offsetWidth = target.offsetWidth;
			let top = rect.top;
			let left = rect.left;
			let height = target.offsetHeight;
			popover.top = top + height;
			popover.left = left;
			popover.width = offsetWidth;
		}
		this.setBorderRadius(e,false);
		this.setState({
			popover: popover
		}, () =>{
			if (id) {
				// itemData 赋值
				const itemData = this.getCurItemData(id);
				this.setState({
					itemData: itemData
				});
			}
		});
	}

	/**
	 * 鼠标离开事件
	 */
	onMouseLeave = (e) => {
		this.setBorderRadius(e,true);
		this.setState({
			popover: {
				show: false
			}
		});
	};

	/**
	 * 设置一级label的border-radius样式
	 * @param e
	 * @param isHasRadius
	 */
	setBorderRadius = (e, isHasRadius = true) => {
		const target = e.target;
		let id = target.getAttribute('id');
		id = id || this.state.itemData.code;
		const ele = document.getElementById(id);
        if (isHasRadius) {
			ele.style.borderRadius = '4px';
		} else {
			ele.style.borderRadius = '0';
		}
	};

	/**
	 * 渲染二级
	 */
	renderSecond = (data = {}) => {
		let children = data.children || [];
		return (
			<ul>
				{
					children.map(item => <li
						key={item.code}
						className={this.getChildrenIsSelected(data.code, item.code, true) ? 'selected' : ''}
						onClick={this.selected.bind(null, data.code, item, true)}>
						<span>{item.name || ''}</span>
						{
							item.children && this.renderThree(data, item.children)
						}
					</li>)
				}
			</ul>
		);
	};

	/**
	 * 渲染三级菜单
	 * @param firstData - 一级菜单data
	 * @param data
	 * @returns {*}
	 */
	renderThree = (firstData, data = []) => {
		return (
			<ul>
				{
					data.map(item => <li
						key={item.code}
						className={this.getChildrenIsSelected(firstData.code, item.code, false) ? 'selected' : ''}
						onClick={this.selected.bind(null,firstData.code, item, false)}
					>{item.name || ''}</li>)
				}
			</ul>
		);
	};

	/**
	 * 获取一级菜单是否选中
	 * @returns {boolean}
	 */
	getFirstIsSelected = (code) => {
		if (!code) {
			return false;
		}
		let { selected = [] } = this.props;
		let item = selected.find(item => {
			let key = Number(Object.keys(item)[0]);
			return key === code;
		});
		return !!item;
	}

	/**
	 * 获取子级菜单是否选中
	 * @param firstCode - 一级菜单code
	 * @param childrencode - 子级菜单code
	 * @param isLevel2 - 是否是二级菜单
	 */
	getChildrenIsSelected = (firstCode, childrenCode, isLevel2) => {
		let info = this.getSelectedInfo(firstCode).info;
		if (!info) {
			return false;
		}
		let codes = [];
		if (isLevel2) {
            codes = info[firstCode][ProItemLabel.LEVEL_2];
		} else {
            codes = info[firstCode][ProItemLabel.LEVEL_3];
		}
		return codes && codes.includes(childrenCode);
	};

	/**
	 * 一级菜单单击事件
	 */
	firstClick = (code) => {
		const info = this.getSelectedInfo(code);
		if (info) {
			const index = info.index;
			const { selected, onChange } = this.props;
			if (onChange && typeof onChange === 'function') {
				selected.splice(index, 1);
				onChange(selected, this.selectedToNames(selected));
			}

		}
	};

	/**
	 * 通过一级code获取选中的信息
	 */
	getSelectedInfo = (code) => {
		const { selected = [] } = this.props;
		let index = selected.findIndex(item => {
			let key = Object.keys(item)[0];
			return Number(key) === code;
		});
		return index < 0 ? {index: -1, info: null} : {index: index, info: selected[index]};
	};

	/**
	 * 树形数据结构转换为对象
	 * @param code
	 * @returns {{}|null}
	 */
	treeDataToObj = (code) => {
		let { data = [] } = this.props;
		let info = data.find(item => item.code === code);
		if (info) {
			let result = {};
			let firstName = info.name;

			let level2Data = info.children || [];
			// 二级菜单
			level2Data.forEach(item => {
				let level2Code = item.code;
				let level2Name = item.name;
				let level3Data = item.children;
				if (!level3Data) {
					result[level2Code] = `${firstName}：${level2Name}`;
				} else {
					level3Data.forEach(l3Item => {
						let level3Code = l3Item.code;
						let level3Name = l3Item.name;
						result[level3Code] = `${firstName}：${level2Name}：${level3Name}`;
					});
				}
			});
			return result;
		}
		return null;
	}

	/**
	 * selected to names
	 * @param selected
	 */
	selectedToNames = (selected = []) => {
		let result = [];
		selected.forEach(item => {
			let firstCode = Number(Object.keys(item)[0]);
			let resultInfo = {firstCode: firstCode, children: []};
			let namesInfo = this.treeDataToObj(firstCode) || {};
			let level2Data = item[firstCode][ProItemLabel.LEVEL_2];
			if (level2Data) {
				level2Data.forEach(code => {
					let childInfo = {isLevel2: true, code: code, namePath: namesInfo[code]};
					resultInfo.children.push(childInfo);
				});
			}
			let level3Data = item[firstCode][ProItemLabel.LEVEL_3];
			if (level3Data) {
				level3Data.forEach(code => {
					let childInfo = {isLevel2: false, code: code, namePath: namesInfo[code]};
					resultInfo.children.push(childInfo);
				});
			}
			result.push(resultInfo);
		});
		return result;
	};

	/**
	 * 删除某个一级菜单的选中项
	 * @param firstCode
	 * @param id
	 * @param isLevel2
	 * @param selected
	 */
	del = (firstCode, code, isLevel2, selected) => {
		let selectedInfo = this.getSelectedInfo(firstCode);
		let info = selectedInfo.info;
		if (!info) {
			return;
		}
		let selectedIndex = selectedInfo.index;
		let level = isLevel2 ? ProItemLabel.LEVEL_2 : ProItemLabel.LEVEL_3;
		let item = info[firstCode];
		let levelData = item[level];
		let index = levelData.findIndex(cCode => cCode === code);
		if (index < 0) {
			return;
		}
		// 取消该项的选中
		levelData.splice(index, 1);
		// 说明该一级菜单中对应级别已没有选中项
		if (levelData.length <= 0) {
			// 删除某个level
			delete item[level];
			// level2 和 level3 都不存在说明该一级菜单已没有选中的项
			if (!item[ProItemLabel.LEVEL_2] && !item[ProItemLabel.LEVEL_3]) {
				// 从selected中删除该一级菜单
				selected.splice(selectedIndex, 1);
			}
		}
	}

	/**
	 * 选择单击事件
	 * @param firstCode - 一级菜单code
	 * @param childData - 子级菜单Data
	 * @param isLevel2 - 是否是二级菜单
	 */
	selected = (firstCode, childData, isLevel2 = true) => {

		if (childData.children) {
			return;
		}

		const { selected = [], onChange } = this.props;

		let childCode = childData.code;
		let selectedInfo = this.getSelectedInfo(firstCode);
		let info = selectedInfo.info;
		let level = isLevel2 ? ProItemLabel.LEVEL_2 : ProItemLabel.LEVEL_3;

		// info 不存在说明此一级菜单下还没有选中的项
		if (!info) {
			let item = {[firstCode]: {[level]: [childCode]}};
			selected.push(item);
		} else {
			let item = info[firstCode];
			let levelData = item[level];
			if (!levelData) {
				levelData = [];
				item[level] = levelData;
			}

			// 说明该项已经被选中
			if (levelData.includes(childCode) > 0) {
				this.del(firstCode, childCode, isLevel2, selected);
			} else {
				// 没有被选中则添加到对应的level数组中
				levelData.push(childCode);
			}
		}
		if (onChange && typeof onChange === 'function') {
			let names = this.selectedToNames(selected);
			onChange(selected, names);
		}
	};


	render() {
		let { data = [] } = this.props;
		return (
			<div className='pro-item-label'>
				<MoreOperate lineHight={40}>
					<ul className='pro-container'>
						{
							data.map(item => <li
								key={item.code}
								id={item.code}
								className={this.getFirstIsSelected(item.code) ? 'selected' : ''}
								onClick={this.firstClick.bind(null, item.code)}
								onMouseEnter={this.onMouseEnter}
								onMouseLeave={this.onMouseLeave}>
								{item.name || ''}
							</li>)
						}
					</ul>
				</MoreOperate>
				<div className='pro-item-label-popover' onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} style={{
					display: this.state.popover.show ? 'block' : 'none',
					top: this.state.popover.top + 'px',
					minWidth: this.state.popover.width + 'px',
					left: this.state.popover.left + 'px',
				}}>
					{
						this.renderSecond(this.state.itemData)
					}
				</div>
			</div>
		);
	}
}

export default ProItemLabel;
