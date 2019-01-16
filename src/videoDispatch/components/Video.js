import React, { Component } from 'react';
import { Form, } from 'antd';
import qs from "qs";
//视频上传组件
import VideoUpload from "../base/VideoUpload";
const FormItem = Form.Item;
class Video extends Component {
	constructor(props) {
		super(props);
		this.state = { videoUpload: [] };
		this.isFirstInitialize = true
	}
	componentWillReceiveProps(nextProps) {
		const { isNeedDefault, videoCampaignInfo, isvideoCampaignInfo } = this.props
		if (isNeedDefault && isvideoCampaignInfo && this.isFirstInitialize) {
			const { video_host, video_path, first_frame_path } = videoCampaignInfo
			const videoUpload =
				[{
					url: video_host + video_path,
					filepath: video_path,
					cover: first_frame_path,
					cover_url: video_host + first_frame_path
				}]
			this.setState({ videoUpload })
			this.isFirstInitialize = false
		}
	}
	componentWillUnmount = () => {
		this.setState({ videoUpload: [] })
	}
	render() {
		const { videoUpload } = this.state
		const { formItemLayout, getFieldDecorator, videoTypeContentNow, videoCampaignInfo, VideoUploadParam, isNeedDefault } = this.props
		return (
			<div>
				<FormItem {...formItemLayout} label="内容形式">
					{getFieldDecorator('video_type', {
						initialValue: videoCampaignInfo && videoCampaignInfo.video_type || 2
					})(
						<span>视频</span>
					)}
				</FormItem>
				<FormItem {...formItemLayout} label="发布视频">
					{getFieldDecorator('video', {
						initialValue: videoUpload,
						rules: [{
							required: true, message: '请上传视频文件',
						}],
					})(
						(!isNeedDefault || videoUpload.length > 0) ? <VideoUpload  {...VideoUploadParam} ref={node => this.videoUploadNode = node} /> : <span></span>
					)}
					<div className="prompt-content"><span style={{ color: "red" }}>温馨提示：</span>请务必在{videoTypeContentNow.type}平台上试发布该视频，确认其符合{videoTypeContentNow.type}短视频格式
                        （大小、分辨率、宽高比等），因视频格式不满足{videoTypeContentNow.type}平台要求导致的发布失败，与微播易无关！
                    </div>
				</FormItem>
			</div>
		);
	}
}

export default Video;
