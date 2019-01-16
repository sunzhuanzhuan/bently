import React, { Component } from 'react'
import { urlPathMap } from "../../../constants/urlPathMap";
import "./index.less"
class BaseInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { baseDetail = {} } = this.props
		const {
			brand_id,
			brand_name,
			gr_id,
			po_code,
			po_id,
			project_id,
			project_name,
			total_budget,
			old_b_host
		} = baseDetail


		return (
			<div className="base-info-flex" >
				<div>
					<table>
						<tbody>
							<tr>
								<td className="info-title">执行凭证号（PO号）：</td>
								<td>
									<a
										href={urlPathMap(old_b_host, po_id).poUrl}
										target="_blank">
										{po_code}
									</a>
								</td>
							</tr>
							<tr>
								<td className="info-title">执行凭证总额：</td>
								<td>{total_budget} CNY</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div>
					<table>
						<tbody>
							<tr>
								<td className="info-title">所属项目：</td>
								<td>
									<a
										href={urlPathMap(old_b_host, project_id).projectUrl}
										target="_blank">
										{project_name}
									</a>
								</td>
							</tr>
							<tr>
								<td className="info-title">品牌：</td>
								<td>{brand_name}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div >
		);
	}
}

export default BaseInfo;
