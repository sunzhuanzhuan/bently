import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as goldenActions from '../actions/goldenApply'
import { Upload, Icon, message, Button } from 'antd';
import './golden.less'
const Dragger = Upload.Dragger;

class AdjustApplyInput extends React.Component {
	constructor() {
		super();
		this.state = {
			current: 0,
			fileList: []
		}
	}
	render() {
		const props = {
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			accept: ".xlsx,.xls",
			showUploadList: true,
			multiple: true,
			fileList: this.state.fileList,
			customRequest: obj => {
				const hide = message.loading("上传中，请稍候...");
				const { postImportApplication } = this.props.actions;
				const { fileList } = this.state;
				let content = new window.FormData();
				content.append('file_path', obj.file);
				postImportApplication(content).then(() => {
					let ary = [...fileList,
					{
						uid: obj.file.uid,
						name: '已导入' + obj.file.name,
						status: 'done',
						url: '',
					}];
					this.setState({ fileList: ary });
					hide();
					message.success('上传成功！');
				}).catch(({ errorMsg }) => {
					hide();
					message.error(errorMsg || '上传失败！')
				});
			}
		};
		return <div className='adjust-apply-input'>
			<div className='sale-upload-container top-gap'>
				<Dragger {...props}>
					<p className="ant-upload-drag-icon">
						<Icon type="upload" />
					</p>
					<p className="ant-upload-text">拖拽或点击选择上传模板</p>
				</Dragger>
			</div>
			<div className='top-gap' style={{ textAlign: 'center' }}><Button type='primary' href='/golden/adjustApply'>返回</Button></div>
			{/* <p className='apply-input-tip'>
				<span className='red-font'><Icon type="exclamation-circle-o" />提示：</span>如果您还没有批量订单调价导入模板，请点击
				<a href='/api/finance/readjust/excelExportView'>订单调价导入模板下载.xlsx</a>
			</p> */}
		</div>
	}
}
const mapStateToProps = () => {
	return {
	}
};
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({ ...goldenActions }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(AdjustApplyInput);
