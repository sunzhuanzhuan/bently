/**
 * 更多组件
 * @param
 * listMore: 组件的数组,
 * ids: 所有list的ID数组,
 * paddingCol: 两个组件件的距离
 * textMore: 更多的文字内容,
	boxFatherId: 父级容器ID,
 */
import React, { Component } from 'react'
import { Icon } from "antd";
import PropTypes from 'prop-types'
class MoreOperate extends Component {
	static propTypes = {
		listMore: PropTypes.array.isRequired,
		ids: PropTypes.array.isRequired,
		paddingCol: PropTypes.number.isRequired,
		textMore: PropTypes.string.isRequired,
		boxFatherId: PropTypes.string.isRequired,
	}
	constructor(props) {
		super(props);
		this.state = {
			isTop: false,
			firstIndex: 0,
		};
		this.setFristIndex = this.setFristIndex.bind(this)
	}
	componentDidMount = () => {
		this.setFristIndex()
		window.addEventListener('resize', () => {
			this.setState({ firstIndex: 0 }, () => {
				this.setFristIndex();
			})
		});
	}

	componentWillUnmount() {
		this.setState({ isTop: false })
		window.removeEventListener('resize', this.setFristIndex);
	}
	setFristIndex = () => {
		const { ids, paddingCol, boxFatherId, textMore } = this.props
		const j_listMoreBox = (document.getElementById(boxFatherId).offsetWidth) - (textMore && (textMore.length + 2) * 12) - 10 - paddingCol
		let number = paddingCol
		let line = 1
		let firstIndex = 0
		ids.map((one, index) => {
			const width = paddingCol + document.getElementById(one).offsetWidth
			number += width
			if (number > j_listMoreBox && line == 1) {
				line = 2
				firstIndex = index
			}
		})
		this.setState({
			boxFatherWidth: j_listMoreBox,
			firstIndex: firstIndex,
			isTop: line == 2
		})
	}
	changeIsTop = () => {
		const { isTop } = this.state
		this.setState({
			isTop: !isTop
		})
	}
	render() {
		const { firstIndex, isTop, boxFatherWidth } = this.state
		const { listMore, textMore = "更多" } = this.props
		const textMoreWidth = textMore && (textMore.length + 2) * 12 + 10
		return (
			<div style={{ float: "left" }}>
				<div style={{ float: "left", width: boxFatherWidth }} >
					{(firstIndex > 0 && isTop ? listMore.slice(0, firstIndex) : listMore).map((one, index) => {
						return <sapn key={index}>{one}</sapn>
					})}
				</div>
				<div style={{ width: textMoreWidth, float: "right" }}>
					{firstIndex > 0 ? <a onClick={this.changeIsTop}>
						{textMore}
						<Icon type={isTop ? "down" : "up"} theme="outlined" />
					</a> : null}
				</div>
			</div>

		);
	}
}

export default MoreOperate;
