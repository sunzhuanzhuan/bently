import React, { Component } from 'react';
import { connect } from "react-redux";
import * as action from '../actions/index'
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
class AuthVisbleIsBP extends Component {
	state = {}
	render() {
		const { authorizationsReducers, noComponent, isComponent } = this.props;
		//是否BP角色
		const authVisble = authorizationsReducers.authVisibleList['is.bp']
		return (
			authVisble ? isComponent : noComponent
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authorizationsReducers: state.authorizationsReducers,
	}
}


const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(action, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(AuthVisbleIsBP))
