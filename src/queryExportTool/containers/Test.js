import React, { Component } from "react"
import { CreateTemplate } from '@/components/exportTemplate'

export default class Test extends Component {

	render() {
		return (
			<CreateTemplate show templateId={15}/>
		)
	}
}
