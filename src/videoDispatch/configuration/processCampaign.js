import moment from 'moment';
export const processCampaign = (values, uploadToken) => {
	let video = values.video_type === 4 ? {} : values.video[0]
	const allValue = {
		...values,
		video_path: video.filepath,
		//数据处理
		note: values.note || "",
		title_content: values.title_content || "",
		hot_category_id: values.hot_category_id ? values.hot_category_id[1] : "",
		link: values.link || "",
		first_frame_path: video.cover,
		is_allow_service: values.is_allow_service ? 1 : 2,
		start_time: moment(values.start_time).format("YYYY-MM-DD HH:mm:ss"),
		last_feedback_at: values.is_last_feedback == 1 ? moment(values.last_feedback_at).format("YYYY-MM-DD HH:mm:ss") : "",
		uploadgoodsqualityinput: values.uploadgoodsqualityinput || "",
		token_video: uploadToken.tokens['215'],
		token_img: uploadToken.tokens['217'],
	}
	delete allValue.video
	delete allValue.hot_category
	delete allValue.typeCover
	return allValue
}
