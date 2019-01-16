import React, { Component } from "react"
import { Button } from 'antd'
import { CreateTemplate } from '../components/exportTemplate'

export default class TestContainer extends Component {
	state = {
		show: false,
		templateId: null
	}
	handleClose = () => { this.setState({ show: false }) }

	componentWillMount() {}

	render() {
		return <div>
			<Button onClick={() => this.setState({
				show: true,
				templateId: null,
				type: 'create'
			})}>新建模板</Button>
			<Button onClick={() => this.setState({
				show: true,
				templateId: 12,
				type: 'edit'
			})}>编辑模板</Button>
			{this.state.show && <CreateTemplate show={true} close={this.handleClose} templateId={this.state.templateId} type={this.state.type} onCreate={id => console.log(id,'===')}/>}
		</div>
	}
}
