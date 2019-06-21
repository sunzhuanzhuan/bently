import React, { Component } from 'react';
import "./index.less";
import Cookie from 'js-cookie'
import { Button } from 'antd';
class MaskBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoginedHistoryQueryTool: false
		};
	}
	componentDidMount = () => {
		this.setState({ isLoginedHistoryQueryTool: Cookie.get('isLoginedHistoryQueryTool') })
	}
	isLoginedSet = () => {
		this.setState({ isLoginedHistoryQueryTool: true })
		Cookie.set('isLoginedHistoryQueryTool', true)
	}
	render() {
		return this.state.isLoginedHistoryQueryTool ? null : <div className={'query-export-tool-mask'}>
			<div className='block-line'>
				<div className='crop-box'>
					<img src='http://img.weiboyi.com/vol1/1/102/124/c/m/sp4onpr3866q11r99p5o506o4op229o2/image.png' width='150' height='64' />
				</div>
			</div>
			<div className='query-export-tool-mask-showbox'>
				可以查找微播易平台
				<span style={{ fontWeight: 600 }}>历史成交</span>
				<span>过的账号了哦，快来试试吧！</span>
				<div style={{ textAlign: 'center', marginTop: 4 }}>
					<Button type='primary' size='small' onClick={this.isLoginedSet}>知道了</Button>
				</div>
			</div>
		</div>
	}
}

export default MaskBox
