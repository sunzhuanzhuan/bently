import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import AccountRecommend from './components/AccountRecommend'
import AccountKeyWord from "./components/AccountKeyWord";
import AccountResult from './components/AccountResult'
class KeyWordIndex extends Component {
	render() {
		return (
			<div>
				<Route exact path='/recommend/keyWordAccount' component={AccountRecommend}/>
				<Route exact path='/recommend/keyWordAccount/AccountTaskAdd' component={AccountKeyWord}/>
				<Route exact path='/recommend/keyWordAccount/AccountKeywordResult' component={AccountResult}/>
			</div>
			);
	}
}
export default KeyWordIndex;


