import React, { Component } from "react"
import { Upload, Button, Progress, message } from 'antd'
import PropTypes from 'prop-types'
import axios from 'axios'
import './index.less'

const { URL } = window;

/**
 * 发布视频，点击上传按钮，选择视频上传，支持格式为“mp4、mov”，长度不超过5min，大小不超过100M，上传完成后，隐藏添加按钮，显示该视频文件
 * 点击播放按钮，当前页面弹窗播放该视频（需技术支持播放控件）
 * 删除，点击，删除该视频文件
 * 提交进行校验时错误提示语，红色字体显示
 * 未上传，则提示“请上传视频文件”
 * 长度超限，则提示“上传的视频文件不得超过5min”
 */

function handleAccrpt(accept) {
	if (!accept || typeof accept !== 'string') return []
	let ary = accept.split(',')
	return ary.map(s => s.trim())
}


class VideoUpload extends Component {
	static propTypes = {
		token: PropTypes.string.isRequired,
		upload_url: PropTypes.string.isRequired,
		weibo_type: PropTypes.number.isRequired,
		desc: PropTypes.string,
		accept: PropTypes.string,
		durationMin: PropTypes.number,
		durationMax: PropTypes.number,
		size: PropTypes.number,
	}
	state = {
		loading: false,
		disabled: false,
		fileList: [],
		percent: 0,
		messageError: ""
	}
	setMessageError = (value) => {
		this.setState({
			messageError: value
		})
	}
	handleChange = info => {
		this.setMessageError('')
		const { size } = this.props
		const isLtSize = info.file.size > size;
		if (isLtSize) {
			this.setMessageError(`上传的视频大小不得超过${size / 1024 / 1024}M!`)
			return false
		}
		info.onProgress({ percent: '20%' })
		const { upload_url, token, weibo_type } = this.props;
		if (!(upload_url && token)) return console.error('上传失败，upload_url 或 token 获取错误!')
		this.setState({
			loading: true
		})
		let formData = new window.FormData();
		formData.append("qq_file", info.file);
		formData.append("token", token);
		formData.append("weibo_type", weibo_type);
		const that = this
		axios.post(upload_url, formData, {
			onUploadProgress: p => this.setState({ percent: parseInt(100 * (p.loaded / p.total)) })
		}).then((response) => {
			// 获取最新的filelist
			if (response.data.code === 1000) {
				this.setMessageError("")
				let list = [response.data.data]
				this.setState({ fileList: list, loading: false, percent: 0 }, () => {
					this.props.onChange && this.props.onChange([...list])
				})
			} else {
				this.setState({
					loading: false
				}, () => {
					// console.error('错误信息: ' + response.data.msg)
					that.setMessageError('上传失败! 请重新上传!')
					//message.error('上传失败! 请重新上传')
				})
			}
		})
			.catch((err) => {
				console.error('错误信息: ' + err.message)
				message.error('上传失败! 请重新上传')
			})
	}
	beforeUpload = async file => {
		const { durationMin = 0, durationMax = 15, size } = this.props
		const isFile = this.accept.some(type => (
			// 如果传递的是后缀则判断后缀, 否则判断type
			/^\./.test(type) ? file.name.toUpperCase().endsWith(type.toUpperCase()) : file.type === type
		));
		if (!isFile) {
			this.setMessageError('上传格式有误!')
			//message.error('上传格式有误!');
		}
		const isLtSize = file.size / 1024 / 1024 < size;
		if (!isLtSize) {
			this.setMessageError(`上传的视频大小不得超过${size / 1024 / 1024}M!`)
			//  message.error('上传大小有误!');
		}
		if (durationMin > durationMax) {
			console.error('最小时长不能大于最大时长')
			return Promise.reject()
		}
		let url = URL.createObjectURL(file)
		let _videoDom = document.createElement('video')
		_videoDom.src = url;
		const that = this
		const isGreatDuration = new Promise((resolve, reject) => {
			_videoDom.oncanplaythrough = function () {
				let _duration = Math.floor(_videoDom.duration)
				if (_duration <= durationMax && _duration >= durationMin) {
					return resolve(true)
				}
				//message.error('上传时长有误!');
				if (_duration >= durationMax) {
					that.setMessageError("上传的视频长度不得大于" + (durationMax > 60 ? `${durationMax / 60}min` : `${durationMax}s`))
				}
				if (_duration <= durationMin) {
					that.setMessageError(`上传的视频长度不得小于${durationMin}s!`)
				}

				reject(false)
			}
		})
		return isFile && isLtSize && (await isGreatDuration) ? Promise.resolve() : Promise.reject()
	}

	constructor(props) {
		super(props)
		this.accept = handleAccrpt(props.accept)
	}

	componentWillMount() {
		const { value } = this.props
		if (value && Array.isArray(value)) {
			this.setState({ fileList: value.slice(0, 1) })
		}
	}
	deleteFileList = () => {
		this.setState({ fileList: [] })
	}

	render() {
		const { accept, durationMin, durationMax, size } = this.props
		const messageErrorDefault = `视频仅支持mp4、mov格式，时长至少${durationMin}s且不大于${durationMax > 60 ? `${durationMax / 60}min` : `${durationMax}s`}`
		const { fileList: [video], percent, loading, disabled, messageError } = this.state
		return (
			<div>
				{!video ? <Upload
					listType='picture'
					beforeUpload={this.beforeUpload}
					accept={accept}
					fileList={false}
					customRequest={this.handleChange}
					disabled={loading}
				>
					<Button id="videlo-dispatch-base-video-upload-id" type='primary' disabled={loading} loading={this.state.loading}>
						上传
                    </Button>
				</Upload> : <div className='video-container clearfix'>
						<div className='video-warp'>
							<video src={video.url} poster={video.cover_url} controls="controls" preload="metadata" />
						</div>
						<span className='delete-btn' onClick={this.deleteFileList}>删除</span>
					</div>}
				{/*{desc && fileList.length < 1 ? <p>{desc}</p> : null}*/}
				{loading ? <Progress percent={percent} strokeWidth={2} width={200} /> : null}
				<span className="prompt-content" style={{ color: messageError ? 'red' : '#999' }}>{messageError || messageErrorDefault}</span>
			</div>
		)
	}
}

export default VideoUpload
