import React from 'react'
import { Icon } from "antd";
import { Link } from "react-router-dom";
import "./index.less";
const BreadCrumbs = ({ isIcon = false, text, lineAfter, linkUrl = "/goodsReceipt/requisitionList" }) => {
	return <div className="bread-crumbs">
		{isIcon ?
			<Link to={linkUrl}>
				<Icon type="left-circle" className="bread-crumbs-icon" />
			</Link> : null}
		<span className="text">{text}</span>
		{lineAfter}
	</div>
}
export default BreadCrumbs
