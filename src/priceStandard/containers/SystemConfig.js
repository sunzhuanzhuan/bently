import React from 'react'
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import { connect } from "react-redux";
import TagList from '../components/TagList'
import CardType from '../components/CardType'

function SkuType() {
	return (
		<div>
			<TagList />
			<CardType />

			权益类型页面asdasd
		</div>
	)
}
const mapStateToProps = (state) => {
	return {
		priceStandard: state.priceStandard
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...actions }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(SkuType)
