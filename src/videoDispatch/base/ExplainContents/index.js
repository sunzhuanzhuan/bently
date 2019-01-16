import React, { Component } from "react"
import { Modal } from 'antd'
import PropTypes from 'prop-types'
import './index.less'

//什么是封面标题？什么是描述信息？什么是视频标题？
class ExplainContents extends Component {
	state = { show: false }
	static propTypes = {
		content: PropTypes.shape({
			title: PropTypes.string,
			src: PropTypes.string
		})
	}

	render() {
		const { content = {} } = this.props
		const { title = '标题', desc = '描述', src = '' } = content
		return (<span>
			<span onClick={() => this.setState({ show: true })} className='blue-tips-text'>{title}</span>
			<Modal
				footer={null}
				visible={this.state.show}
				wrapClassName='explain-contents-modal'
				width={368}
				{...this.props}
				onCancel={() => this.setState({ show: false })}
			>
				<header>{title}</header>
				<main>
					<p className='desc'>{desc}</p>
					{src ? <div className='img-box'>
						<img src={src} alt={title} />
					</div> : null}
				</main>
			</Modal>
		</span>
		)
	}
}

export default ExplainContents
