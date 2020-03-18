import React from 'react'
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import { connect } from "react-redux";
import TagList from '../components/TagList'
import CardType from '../components/CardType'

function SystemConfig() {
	return (
		<div>
			<h2>系统权益池管理</h2>
			<TagList />
			<CardType />
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
export default connect(mapStateToProps, mapDispatchToProps)(SystemConfig)
