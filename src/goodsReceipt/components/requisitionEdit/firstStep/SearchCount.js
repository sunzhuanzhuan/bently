import React, { Component } from 'react'
import { Badge, Button } from "antd";
import TagList from "../../../base/TagList";
import "./SearchCount.less"
class SearchCount extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { list, onCancel, searchIds } = this.props
		const noNumber = list && list.length || 0
		const searchNumber = searchIds && searchIds.split(",").length || 0
		return (
			<div className="search-count">
				<div className="line-text"><Badge status="default" />共计输入{searchNumber}个 ID，匹配到的有{searchNumber - noNumber}个，未匹配到的有 <span style={{ color: "red" }}>{noNumber}</span>个</div>
				{noNumber > 0 ? <div>
					<div className="line-text"><Badge status="default" />未匹配到的ID明细如下</div>
					<div className="item-box">
						<TagList list={list} />
					</div>
				</div> : null}
				<div className="footer-button"><Button type="primary" onClick={onCancel}>好的</Button></div>
			</div>
		);
	}
}

export default SearchCount;
