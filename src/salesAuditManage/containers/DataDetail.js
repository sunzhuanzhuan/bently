import React, { Component } from "react"
import { Table, Breadcrumb, Spin, Alert } from 'antd'
import { PhotoSwipe } from 'react-photoswipe';
import { Link } from 'react-router-dom';
import 'react-photoswipe/lib/photoswipe.css';
import './DataDetail.less'
import { parseUrlQuery } from '../../util/parseUrl'
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import { connect } from "react-redux";

/**
 * 获取图片详细信息
 * @param src 图片链接
 * @returns {Promise<any>}
 */
function getImageInfos(src) {
	return new Promise((resolve) => {
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
const options = {
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
	closeElClasses: [],
	fullscreenEl: false,
	focus: false
	//http://photoswipe.com/documentation/options.html
};
const columns = [{
	title: '数据项',
	dataIndex: 'display',
	render: (name, { required }) => {
		return required == 1 ? <span>{name}<span style={{ color: 'red' }}>(必填项)</span></span> :
			<span>{name}</span>
	},
	width: '50%'
}, {
	title: '值',
	dataIndex: 'value',
	width: '50%',
	render: (value, { type }) => {
		let suffix = (type === 'double' && value) ? '%' : ''
		return <span>{value + suffix}</span>
	}
}];

class DataDetail extends Component {
	state = { items: [], loading: true, result: {} }

	constructor(props) {
		super(props)
		this.id = parseUrlQuery().id
		this.platform = parseUrlQuery().platform
	}

	componentWillMount() {
		const { ROGetExecutionDataInfo } = this.props.actions
		if (!this.id || !this.platform) return
		// 发起请求
		ROGetExecutionDataInfo({
			order_id: this.id,
			weibo_type: this.platform
		}).then(({ data }) => {
			this.setState({ result: data })
			const imgList = data['sale_data_screenshot_path'] || []
			/*(data['sale_data_screenshot_path'] || []).map(link => data['image_host'] + link)*/
			Promise.all(imgList.map(url => getImageInfos(url))).then(result => {
				let items = result.filter(Boolean).map((img, n) => ({
					src: img.src,
					w: img.width,
					h: img.height,
					title: 'Image ' + n
				}))
				this.setState({
					items,
					loading: false
				})
			})
		});
	}

	render() {
		const { loading, result: { order_id, weibo_name, execution_result_link_for_sale, weibo_type_name, record_for_sale } } = this.state
		return (this.id && this.platform) ? (
			<div className='sales-audit-manage data-detail-page'>
				<header>
					<Breadcrumb>
						<Breadcrumb.Item><Link to='/salesAuditManage/orderReview'>订单执行结果审核</Link></Breadcrumb.Item>
						<Breadcrumb.Item>查看执行数据</Breadcrumb.Item>
					</Breadcrumb>
					<ul className='order-data-info'>
						<li>
							<span className='field-name'>订单ID:</span>
							<span>{order_id || '-'}</span>
						</li>
						<li>
							<span className='field-name'>账号名称:</span>
							<span>{weibo_name || '-'}</span>
						</li>
						<li>
							<span className='field-name'>平台:</span>
							<span>{weibo_type_name || '-'}</span>
						</li>
						<li>
							<span className='field-name'>执行链接:</span>
							{execution_result_link_for_sale ?
								<a href={execution_result_link_for_sale} target='_blank' title={execution_result_link_for_sale} className='link-overflow-ellipsis'>查看执行链接</a> : '-'}
						</li>
					</ul>
				</header>
				{loading ? <Spin /> : <main>
					<section className='data-detail-page-main-left'>
						<h2>
							数据截图
						</h2>
						<div className='photo-swipe-container'>
							{this.state.items.length ?
								<PhotoSwipe isOpen={true} items={this.state.items} options={options} onClose={this.handleClose} /> : '暂无截图'}
						</div>
					</section>
					<section className='data-detail-page-main-right'>
						<h2>
							执行数据
						</h2>
						<div className='data-list'>
							<Table rowKey='id' pagination={false} columns={columns} dataSource={record_for_sale} bordered />
						</div>
					</section>
				</main>}
			</div>) : <Alert
			message="链接错误!"
			description="链接没有传递必要的参数."
			type="error"
			showIcon
		/>
	}
}

const mapStateToProps = (state) => {
	return {
		salesAuditManage: state.salesAuditManage
	}
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...actions }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(DataDetail)
