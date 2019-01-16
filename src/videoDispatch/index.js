import React, { Component } from "react"
import { Form } from 'antd';
import { Route } from 'react-router-dom'
import lazyLoadComponent from '../components/LazyLoadComponent'
// 懒加载路由级组件
const CreateMicroFlashes = lazyLoadComponent(() => import('./containers/CreateMicroFlashes'))


class VideoDispatchIndex extends Component {
	state = {
		show: true
	}

	render() {
		return (
			<div>
				<Route exact path='/videoDispatch/editvideoDispatch' component={CreateMicroFlashes} />
			</div>
		)
	}
}

export default Form.create()(VideoDispatchIndex)
