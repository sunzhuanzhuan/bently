import React, { Component } from "react"
import { message, Button,Anchor } from 'antd'

const position = {
	top: 20,
	bottom: 10
}

const { Link } = Anchor;
export default class AffixNav extends Component {
	state = {
		submitLoading: false
	}
	submit = () => {
		const { updateAccountInfo } = this.props
		let ary = Object.values(window.allSubmit.store).map(item => item())
		Promise.all(ary).then((data) => {
			this.setState({
				submitLoading: true
			})
			let result = data.reduce((obj, item) => {
				obj = { ...obj, ...item }
				return obj
			}, {})
			updateAccountInfo(result).then((data) => {
				this.setState({
					submitLoading: false
				})
				message.success(data.message || '保存成功')
			}).catch(({errorMsg}) => {
				message.error('保存出错:' + errorMsg)
				this.setState({
					submitLoading: false
				})
			})
		}).catch((err) => {
			console.error(err);
			message.error('信息填写不合法, 请重新填写')
		})
	}


	render() {
		const { isUpdate,scrollNode = '#app-content-children-id' } = this.props
		return <div className='account-info-sidebar'>
			<Anchor offsetTop={isUpdate ? 0 : position.top} getContainer={() => document.querySelector(scrollNode)}>
				{
					this.props.dataSource.map(li => {
						return <Link key={li.id} href={'#' + li.id} title={li.title} />
					})
				}
				{isUpdate ?
					<p className='fixed-btn-wrapper'>
						<Button block
							loading={this.state.submitLoading}
							type="primary"
							onClick={this.submit}
						>一键提交</Button>
					</p> : null
				}
			</Anchor>
			{/*<Affix offsetTop={position.top} target={() => document.querySelector('#app-content-children-id')}>
				<aside className='sidebar-nav'>{
					<ul>{
						this.props.dataSource.map(li => {
							let isCurrent = li.id === current;
							return <li key={li.id}>
								<a href={"#" + li.id} className={isCurrent ? 'current' : null} onClick={(e) => {
									if (isCurrent) return e.preventDefault()
									this.props.onToggle(li.id)
								}}>{li.title}</a>
							</li>
						})
					}</ul>
				}</aside>
				{isUpdate ?
					<p className=''>
						<Button block
							type="primary"
							onClick={this.submit}
						>一键提交</Button>
					</p> : null
				}
			</Affix>*/}
		</div>
	}
}
