import React, { Component } from "react"
import {} from 'antd'
import './test.less'
import 'react-photoswipe/lib/photoswipe.css';

import { PhotoSwipe } from 'react-photoswipe';

let isOpen = true;

let items = [];
function getImageInfos(src) {
	return new Promise((resolve, reject) => {
		let img_url = src
		// 创建对象
		let img = new window.Image()
		// 改变图片的src
		img.src = img_url
		// 加载完成执行
		img.onload = () => resolve(img)
		img.onerror = () => resolve(null)
	})
}


let options = {
	history: false,
	escKey: false,
	closeEl: false,
	captionEl: false,
	shareEl: false,
	tapToClose: false,
	clickToCloseNonZoomable: false,
	pinchToClose: false,
	closeOnScroll: false,
	closeOnVerticalDrag: false,
	modal: false,
	closeElClasses: []
	//http://photoswipe.com/documentation/options.html
};


export default class Test extends Component {
	state = {
		items: []
	}

	componentWillMount() {
		let url = [
		]
		Promise.all(url.map(url => getImageInfos(url))).then(result => {
			let items = result.filter(Boolean).map((img, n) => ({
				src: img.src,
				w: img.width,
				h: img.height,
				title: 'Image ' + n
			}))
			this.setState({ items })
		})
	}

	render() {
		return <div>
			<h2>测试photoSwipe组件</h2>
			<div className='test-container'>
				{this.state.items.length ? <PhotoSwipe isOpen={isOpen} items={this.state.items} options={options} onClose={this.handleClose} /> : <p>...</p>}
			</div>
		</div>
	}
}
