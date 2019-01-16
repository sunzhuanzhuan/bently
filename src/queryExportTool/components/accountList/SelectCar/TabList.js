import React, { Component } from 'react';
import { List, Icon } from 'antd';
import { WBYPlatformIcon } from "wbyui"
import AccountInfos, {
	Avatar,
	AvatarType,
} from "@/queryExportTool/components/common/AccountInfos";
import ValueFormat from "@/queryExportTool/base/ValueFormat";
class TabList extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { list, removeAccout } = this.props
		return (
			<div className="tab-list-box">
				<List
					dataSource={list}
					renderItem={item => (
						<List.Item className="list-item">
							<List.Item.Meta
								avatar={
									<Avatar src={item.avatar_url} name='测试图'>
										<AvatarType type={item.is_famous == 1 ? 'famous' : "micro"} />
									</Avatar>}
								title={<div style={{ fontSize: 14, width: 250 }}><span className="tab-icon-style">
									<WBYPlatformIcon
										weibo_type={item.platform_id}
										widthSize={14}
									/></span>{item.sns_name}</div>}
								description={<div>粉丝数<ValueFormat value={item.follower_count} format='large' /></div>}
								style={{ marginLeft: 10 }}
							/>
							<div className="close-circle-show">
								<Icon type="close-circle" theme="filled"
									style={{ color: "#1da57a" }}
									onClick={() => removeAccout(item.account_id, item.group_type)}
								/>
							</div>
						</List.Item>
					)}
				/>
			</div>
		);
	}
}

export default TabList;
