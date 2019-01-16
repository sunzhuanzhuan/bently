import React, { Component } from "react"
import { Modal, Pagination, Icon, Spin, message } from 'antd';
import './index.less'
import api from '../../../api'

/**
 * 历史证明选择
 */
class HistoricalProof extends Component {
	state = {
		loading: false,
		list: {},
		selectedRowKeys: [],
		count: 0,
		page: 1
	}
	getImgLists = (companyId = 0, page = 1, size = 6) => {
		this.setState({ loading: true, selectedRowKeys: [] })
		api.get('/company/getAuthenticImg', { params: { company_id: companyId, size, page } }).then(data => {
			this.setState({
				list: data.data.imgList,
				loading: false,
				count: data.data.count,
				page: data.data.currPage
			})
		})
	}

	handleClick = key => () => {
		const { selectedRowKeys, list } = this.state
		let newAry = [...selectedRowKeys], flag = true
		for (let i = 0; i < newAry.length; i++) {
			if (newAry[i] === key) {
				flag = false
				newAry.splice(i, 1)
				i--
			}
		}
		if (flag) {
			if (selectedRowKeys.length >= (this.props.length)) {
				return message.error('最多只能使用5个正品证明图片!')
			} else {
				newAry.push(key)
			}
		}
		this.setState({
			selectedRowKeys: newAry
		}, () => {
			this.props.onChange && this.props.onChange(newAry, newAry.map(key => list[key]))
		})
	}

	componentWillMount() {
		const { companyId } = this.props
		this.getImgLists(companyId)
	}

	render() {
		const { companyId } = this.props
		const { loading, list, selectedRowKeys, count, page } = this.state
		return (
			<div className='historical-proof'>
				<Modal
					id="video-dispatch-historical-proof-modal-id"
					wrapClassName='historical-proof-modal'
					title={'选择历史证明'}
					width={710}
					cancelText='取消'
					okText='确定'
					{...this.props}
					onOk={() => {
						this.props.onOk(selectedRowKeys, selectedRowKeys.map(key => list[key]))
					}}
				>
					<Spin spinning={loading} delay={500}>
						<main className='img-list-container clearfix'>
							{
								list ? Object.keys(list).map(key =>
									<ImgItem key={key} src={list[key]['img_path']} cur={selectedRowKeys.some(k => k === key)} onClick={this.handleClick(key)} />)
									: "无历史证明"}
						</main>
						<Pagination id="video-dispatch-historical-proof-page-id" size="small" total={count} page={page} showQuickJumper onChange={page => {
							this.getImgLists(companyId, page)
						}} />
					</Spin>
				</Modal>
			</div>
		)
	}
}

const ImgItem = props => {
	const { src, cur, onClick } = props
	return <div onClick={onClick} className={'img-list-item' + (cur ? ' active' : '')}>
		<div className='img-list-item-container'>
			<img src={src} />
		</div>
		<span className='img-tick'>
			<Icon type="check" />
		</span>
	</div>
}

export default HistoricalProof
