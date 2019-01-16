import React, { Component } from "react"
import throttle from 'lodash/throttle'
import PropTypes from 'prop-types'
import { moduleMap, levelsMap } from '../constants/config'

export const scroll = ({ scrollElementSelector = '', targetsSelector = '.J-scroll-follow-nav', offset = 0 }) => C => {
	return class ScrollWrap extends Component {
		state = { navCurrent: '', sidebarData: [] }
		toggleNav = val => this.setState({ navCurrent: val })
		// 处理当前目标
		changeActiveTarget = (target) => {
			this._activeTarget = target
			this._clear()
			let curId = target.id
			this.toggleNav(curId)
		}
		// 清除选中
		_clear = () => this.toggleNav('')
		// 初始化或重置位置信息
		initRefresh = () => {
			const offsetBase = offset
			const targets = [...this.nodeList]
			targets
				.map((target) => {
					if (target) {
						const targetBCR = target.getBoundingClientRect()
						if (targetBCR.width || targetBCR.height) {
							return [
								target.offsetTop + offsetBase,
								target
							]
						}
					}
					return null
				})
				.filter((item) => item)
				.sort((a, b) => a[0] - b[0])
				.forEach((item) => {
					this._offsets.push(item[0])
					this._targets.push(item[1])
				})
			// this.scrollProcess()
		}
		// 滚动跟随逻辑
		scrollProcess = () => {
			const scrollTop = this.scrollBox.scrollTop
			const scrollHeight = this.scrollBox.scrollHeight
			const maxScroll = scrollHeight - this.scrollBox.getBoundingClientRect().height

			if (scrollTop >= maxScroll) {
				const target = this._targets[this._targets.length - 1]

				if (this._activeTarget !== target) {
					this.changeActiveTarget(target)
				}
				return
			}

			if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
				this._activeTarget = null
				this._clear()
				return
			}

			const offsetLength = this._offsets.length
			for (let i = offsetLength; i--;) {
				const isActiveTarget = this._activeTarget !== this._targets[i] &&
					scrollTop >= this._offsets[i] &&
					(typeof this._offsets[i + 1] === 'undefined' ||
						scrollTop < this._offsets[i + 1])

				if (isActiveTarget) {
					this.changeActiveTarget(this._targets[i])
				}
			}
		}
		// 生成导航数据
		createNavData = (nodes) => nodes.filter(node => node.id).map((node) => ({
			id: node.id,
			title: moduleMap[node.id].name
		}))

		static childContextTypes = {
			refresh: PropTypes.func
		}

		getChildContext() {
			return { refresh: this.initRefresh }
		}

		constructor(props) {
			super(props)
			this.scrollProcess = throttle(this.scrollProcess, 200)
			this._offsets = []
			this._targets = []
			this._activeTarget = null
			this.scrollBox = null
			this.nodeList = []
		}

		componentDidMount() {
			// this.scrollBox = document.querySelector(scrollElementSelector)
			// this.scrollBox = document.querySelector(scrollElementSelector)
			this.nodeList = [...document.querySelectorAll(targetsSelector)]
			// this.scrollBox.addEventListener('scroll', this.scrollProcess)
			this.setState({ sidebarData: this.createNavData(this.nodeList) })
			// this.initRefresh()
		}

		componentWillUnmount() {
			// this.scrollBox.removeEventListener('scroll', this.scrollProcess)
		}

		render() {
			return <C {...this.props} sidebarData={this.state.sidebarData} navCurrent={this.state.navCurrent} toggle={this.toggleNav} refresh={this.initRefresh} />
		}
	}
}
export const targets = ({ id = '', classText = 'J-scroll-follow-nav' }) => C => {
	return props => <div id={id} className={classText}>
		<C {...props} />
	</div>
}
