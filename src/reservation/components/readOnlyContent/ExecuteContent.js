import React from 'react'

const ExecuteContentDetail = (props) => {
	const { platform_name } = props;
	const { data } = props.content;
	let Item = <tr>
		<td>执行内容/要求:</td>
		<td className="special-td" dangerouslySetInnerHTML={{ __html: data.content }}></td>
	</tr>
	return (
		<div className="execute-content-box">
			<table>
				<tbody>
					<tr>
						<td width={140}>执行类型:</td>
						<td>
							{data.execution_type.map((val, index) => {
								return <div key={index} style={{ "display": parseInt(val.checked) === 1 ? "block" : "none" }}>{val.name}</div>
							})
							}
						</td>
					</tr>
					{Item}
					<tr>
						<td>是否含有视频/直播:</td>
						<td>

							{data.video_types.map((val, index) => {
								return <div key={index} style={{ "display": parseInt(val.select) === 1 ? "block" : "none" }}>{val.name}</div>
							})
							}
						</td>
					</tr>
					<tr>
						<td>分发平台:</td>
						<td>
							{data.platform.map((val, index) => {
								return <span key={index} style={{ marginRight: "5px" }}>{val.platform_name}</span>
							})
							}
						</td>
					</tr>
					<tr>
						<td>执行时间:</td>
						<td>{data.start_time + " - " + data.end_time}</td>
					</tr>
					<tr>
						<td>附件:</td>
						<td>
							{data.attachment.map((val, index) => {
								return <div key={index}><a href={val.file_path} target="_blank">{val.original_name}</a></div>
							})
							}

						</td>
					</tr>
					<tr>
						<td>备注(账号可见):</td>
						<td>{data.comment}</td>
					</tr>
					<tr>
						<td>备注(媒介可见):</td>
						<td>{data.comment_for_media}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
};

export default ExecuteContentDetail
