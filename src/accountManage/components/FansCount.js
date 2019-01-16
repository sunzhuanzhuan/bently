import React from 'react';
import PropTypes from 'prop-types';
// import { WBYDetailTable } from 'wbyui';
import { Form } from 'antd';
import WBYDetailTable from './detailTable'
const FormItem = Form.Item

const _columns = [
	{
		"title": "真粉率",
		dataIndex: "true_fans_rate",
		key: "true_fans_rate"
	},
	{
		"title": "snbt",
		dataIndex: "snbt",
		key: "snbt"
	},
	{
		"title": "视频数",
		dataIndex: "media_count",
		key: "media_count"
	},
	{
		"title": "作品数",
		dataIndex: "media_count",
		key: "media_count"
	},
	{
		"title": "笔记数",
		dataIndex: "media_count",
		key: "media_count"
	},
	{
		"title": "直发微博平均评论数",
		dataIndex: "direct_media_comment_avg",
		key: "direct_media_comment_avg"
	},
	{
		"title": "直发微博平均转发数",
		dataIndex: "direct_media_repost_avg",
		key: "direct_media_repost_avg"
	},
	{
		"title": "直发微博平均点赞数",
		dataIndex: "direct_media_like_av",
		key: "direct_media_like_av"
	},
	{
		"title": "转发微博平均评论数",
		dataIndex: "indirect_media_comment_avg",
		key: "indirect_media_comment_avg"
	},
	{
		"title": "转发微博平均转发数",
		dataIndex: "indirect_media_repost_avg",
		key: "indirect_media_repost_avg"
	},
	{
		"title": "转发微博平均点赞数",
		dataIndex: "indirect_media_like_av",
		key: "indirect_media_like_av"
	},
	{
		"title": "平均点赞数",
		dataIndex: "media_like_avg",
		key: "media_like_avg"
	},
	{
		"title": "视频平均点赞数",
		dataIndex: "media_like_avg",
		key: "media_like_avg"
	},
	{
		"title": "平均评论数",
		dataIndex: "media_comment_avg",
		key: "media_comment_avg"
	},
	{
		"title": "视频平均评论数",
		dataIndex: "media_comment_avg",
		key: "media_comment_avg"
	},
	{
		"title": "平均播放数",
		dataIndex: "media_play_avg",
		key: "media_play_avg"
	},
	{
		"title": "平均观看数",
		dataIndex: "media_play_avg",
		key: "media_play_avg"
	},
	{
		"title": "场均观看",
		dataIndex: "media_play_avg",
		key: "media_play_avg"
	},
	{
		"title": "视频平均观看数",
		dataIndex: "media_play_avg",
		key: "media_play_avg"
	},
	{
		"title": "平均收藏数",
		dataIndex: "media_collect_avg",
		key: "media_collect_avg"
	},
	{
		"title": "平均弹幕数",
		dataIndex: "media_barrage_avg",
		key: "media_barrage_avg"
	},
	{
		"title": "总被赞数",
		dataIndex: "like_count",
		key: "like_count"
	},
	{
		"title": "历史直播数",
		dataIndex: "live_count",
		key: "live_count"
	},
	{
		"title": "直播平均观众数",
		dataIndex: "live_online_avg",
		key: "live_online_avg"
	},
	{
		"title": "直播最高观众数",
		dataIndex: "live_online_max",
		key: "live_online_max"
	},
	{
		"title": "多图文第一条平均阅读数",
		dataIndex: "media_index1_avg_read_num",
		key: "media_index1_avg_read_num"
	},
	{
		"title": "多图文第一条平均点赞数",
		dataIndex: "media_index1_avg_like_num",
		key: "media_index1_avg_like_num"
	},
	{
		"title": "多图文第二条平均阅读数",
		dataIndex: "media_index2_avg_read_num",
		key: "media_index2_avg_read_num"
	},
	{
		"title": "多图文第二条平均点赞数",
		dataIndex: "media_index2_avg_like_num",
		key: "media_index2_avg_like_num"
	},
	{
		"title": "多图文第3-N条平均阅读数",
		dataIndex: "media_other_de_singular_avg_read_num",
		key: "media_other_de_singular_avg_read_num"
	},
	{
		"title": "多图文第3-N条平均点赞数",
		dataIndex: "media_other_de_singular_avg_like_num",
		key: "media_other_de_singular_avg_like_num"
	},
	{
		"title": "视频平均分享数",
		dataIndex: "media_repost_avg",
		key: "media_repost_avg"
	},
	{
		"title": "平均转发数",
		dataIndex: "media_repost_avg",
		key: "media_repost_avg"
	},
	{
		"title": "视频平均收藏数",
		dataIndex: "media_collect_avg",
		key: "media_collect_avg"
	},
	{
		"title": "文章平均点赞数",
		dataIndex: "picture_like_avg",
		key: "picture_like_avg"
	},
	{
		"title": "文章平均收藏数",
		dataIndex: "picture_collect_avg",
		key: "picture_collect_avg"
	},
	{
		"title": "文章平均评论数",
		dataIndex: "picture_comment_avg",
		key: "picture_comment_avg"
	},
	{
		"title": "最近30条平均阅读数",
		dataIndex: "media_avg_read_num",
		key: "media_avg_read_num"
	},
	{
		"title": "最近30条平均点赞数",
		dataIndex: "media_avg_like_num",
		key: "media_avg_like_num"
	}
]
const defaultColumnsMap = _columns.reduce((obj, next) => {
	obj[next.title] = next;
	return obj;
}, {});

export const FansCount = (props) => {
	const { formItemLayout, columnsKeys } = props;
	const dataSource = props.data.accountInfo || {};
	const _columns = columnsKeys.map(item => defaultColumnsMap[item]).filter(item => item);
	return <div>
		<FormItem {...formItemLayout} label='统计数据：'>
			<WBYDetailTable dataSource={dataSource} columns={_columns} columnCount={8} />
		</FormItem>
	</div>
}

FansCount.propTypes = {
	columnsKeys: PropTypes.array.isRequired,	//需要显示的统计项
	formItemLayout: PropTypes.object.isRequired,		//layout
	data: PropTypes.shape({
		accountInfo: PropTypes.object.isRequired
	})
}
