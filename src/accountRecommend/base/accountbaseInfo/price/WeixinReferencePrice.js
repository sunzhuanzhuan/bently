import React, { Component } from "react"
import "./WeiboReferencePrice.less"
import money from "../../image/rmb_1x.png"
export default class WeixinReferencePrice extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		const { account } = this.props
		//原创+发布价格
		const origin_title =
			(account.is_famous == 1 &&
				account.can_origin == 1 &&
				account.only_support_original == 1) ||
				(account.is_famous == 1 && account.can_origin == 1)
				? "原创+发布"
				: null
		//发布价格
		const issue_title =
			(account.is_famous == 1 && account.can_origin == 1) ||
				(account.is_famous == 1 && account.can_origin != 1) ||
				account.is_famous == 2
				? "发布"
				: null
		const time = account.price_validity_period ? account.price_validity_period : "-"
		return (
			<span>
				<table className="account-price-recommend">
					<thead>
						<tr>
							<th>
								<span className="account-others-title">参考报价</span>
							</th>
							<th>
								{/*原创+发布*/}
								<span className="account-others-title">{origin_title}</span>
							</th>
							<th>
								{/*发布*/}
								<span
									className="account-others-title"

								>
									{issue_title}
								</span>
							</th>
							<th>
								{/*发布*/}
								<span
									className="account-others-title"
								>
									阅读量
                                </span>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="text-left">多图文第一条</td>
							<td>
								<span className="color-high-light">
									{(account.is_famous == 1 &&
										account.can_origin == 1 &&
										account.only_support_original == 1) ||
										(account.is_famous == 1 && account.can_origin == 1) ? (
											<b>
												{account.price_multi_top_original_writing > 0 ? (
													<b>
														<img src={money} alt="" />
														{account.price_multi_top_original_writing}
													</b>
												) : (
														"-"
													)}
											</b>
										) : null}
								</span>
							</td>
							<td>
								{/* 原创+发布 发布的价格  多图文第一条*/}
								<span className="color-high-light">
									{account.is_famous == 1 && account.can_origin == 1 ? (
										<b>
											{account.price_multi_top > 0 ? (
												<span className="rmb-price">
													<img src={money} alt="" />
													{account.price_multi_top}
												</span>
											) : (
													"-"
												)}
										</b>
									) : null}
									{/*预约 只有发布的情况 预约*/}
									{account.is_famous == 1 && account.can_origin != 1 ? (
										<b>
											{account.price_multi_top > 0 ? (
												<span className="rmb-price">
													<img src={money} alt="" />
													{account.price_multi_top}
												</span>
											) : (
													"-"
												)}
										</b>
									) : null}
									{/*预约 只有发布的情况 非预约*/}
									{account.is_famous == 2 ? (
										<b>
											{account.price_multi_graphic_top_price > 0 ? (
												<span className="rmb-price">
													<img src={money} alt="" />
													{account.price_multi_graphic_top_price}
												</span>
											) : (
													"-"
												)}
										</b>
									) : null}
								</span>
							</td>
							<td>
								{/*阅读量*/}
								{account.multi_graphic_top_read_num ? (
									<span className="color-read-black">
										{account.multi_graphic_top_read_num > 100000
											? "100000+"
											: Number(
												parseInt(
													account.multi_graphic_top_read_num
												).toFixed(0)
											)}
									</span>
								) : (
										"-"
									)}
							</td>
						</tr>
						<tr>
							<td className="text-left">多图文第二条</td>
							<td>
								<span className="color-high-light">
									{(account.is_famous == 1 &&
										account.can_origin == 1 &&
										account.only_support_original == 1) ||
										(account.is_famous == 1 && account.can_origin == 1) ? (
											<b>
												{account.price_multi_second_original_writing > 0 ? (
													<span
														className="rmb-price"
														style={{ dispaly: "inlineBlock" }}
													>
														<img src={money} alt="" />
														{account.price_multi_second_original_writing}
													</span>
												) : (
														"-"
													)}
											</b>
										) : null}
								</span>
							</td>
							<td>
								{/* 原创+发布 发布的价格 多图文第二条 */}
								<span className="color-high-light">
									{account.is_famous == 1 && account.can_origin == 1 ? (
										<b>
											{account.price_multi_second > 0 ? (
												<span className="rmb-price">
													<img src={money} alt="" />
													{account.price_multi_second}
												</span>
											) : (
													"-"
												)}
										</b>
									) : null}
									{/*预约 只有发布的情况*/}
									{account.is_famous == 1 && account.can_origin != 1 ? (
										<b>
											{account.price_multi_second > 0 ? (
												<span className="rmb-price">
													<img src={money} alt="" />
													{account.price_multi_second}
												</span>
											) : (
													"-"
												)}
										</b>
									) : null}
									{/*预约 只有发布的情况 非预约*/}
									{account.is_famous == 2 ? (
										<b>
											{account.price_multi_graphic_second_price > 0 ? (
												<span className="rmb-price">
													<img src={money} alt="" />
													{account.price_multi_graphic_second_price}
												</span>
											) : (
													"-"
												)}
										</b>
									) : null}
								</span>
							</td>
							<td>
								{/*阅读量*/}
								{account.multi_graphic_second_read_num ? (
									<span className="color-read-black">
										{account.multi_graphic_second_read_num > 100000
											? "100000+"
											: Number(
												parseInt(
													account.multi_graphic_second_read_num
												).toFixed(0)
											)}
									</span>
								) : (
										"-"
									)}
							</td>
						</tr>
						{account.is_famous == 1 ? (
							<tr>
								<td className="text-left">多图文3-N条</td>
								<td>
									<span className="color-high-light">
										{(account.is_famous == 1 &&
											account.can_origin == 1 &&
											account.only_support_original == 1) ||
											(account.is_famous == 1 && account.can_origin == 1) ? (
												<b>
													{account.price_multi_other_original_writing > 0 ? (
														<span
															className="rmb-price"
															style={{ dispaly: "inlineBlock" }}
														>
															<img src={money} alt="" />
															{account.price_multi_other_original_writing}
														</span>
													) : (
															"-"
														)}
												</b>
											) : null}
									</span>
								</td>
								<td>
									{/* 原创+发布 发布的价格 多图文第二条 */}
									<span className="color-high-light">
										{account.is_famous == 1 && account.can_origin == 1 ? (
											<b>
												{account.price_multi_other > 0 ? (
													<span
														className="rmb-price"
														style={{ dispaly: "inlineBlock" }}
													>
														<img src={money} alt="" />
														{account.price_multi_other}
													</span>
												) : (
														"-"
													)}
											</b>
										) : null}
										{/*预约 只有发布的情况*/}
										{account.is_famous == 1 && account.can_origin != 1 ? (
											<b>
												{account.price_multi_other > 0 ? (
													<span
														className="rmb-price"
														style={{ dispaly: "inlineBlock" }}
													>
														<img src={money} alt="" />
														{account.price_multi_other}
													</span>
												) : (
														"-"
													)}
											</b>
										) : null}
									</span>
								</td>
								<td>
									{/*阅读量*/}
									{account.multi_graphic_other_read_num ? (
										<span className="color-read-black">
											{account.multi_graphic_other_read_num > 100000
												? "100000+"
												: Number(
													parseInt(
														account.multi_graphic_other_read_num
													).toFixed(0)
												)}
										</span>
									) : (
											"-"
										)}
								</td>
							</tr>
						) : (
								""
							)}
						<tr>
							<td className="text-left">单图文</td>
							<td>
								<span className="color-high-light">
									{(account.is_famous == 1 &&
										account.can_origin == 1 &&
										account.only_support_original == 1) ||
										(account.is_famous == 1 && account.can_origin == 1) ? (
											<b>
												{account.price_single_original_writing > 0 ? (
													<span className="reb-price">
														{" "}
														<img src={money} alt="" />
														{account.price_single_original_writing}
													</span>
												) : (
														"-"
													)}
											</b>
										) : null}
								</span>
							</td>
							<td>
								{/* 原创+发布 发布的价格 单图文 */}
								<span className="color-high-light">
									{account.is_famous == 1 && account.can_origin == 1 ? (
										<b>
											{account.price_single > 0 ? (
												<span className="rmb-price">
													<img src={money} alt="" />
													{account.price_single}{" "}
												</span>
											) : (
													"-"
												)}
										</b>
									) : null}
									{/*预约 只有发布的情况*/}
									{account.is_famous == 1 && account.can_origin != 1 ? (
										<b>
											{account.price_single > 0 ? (
												<span className="rmb-price">
													<img src={money} alt="" />
													{account.price_single}{" "}
												</span>
											) : (
													"-"
												)}
										</b>
									) : null}
									{/*预约 只有发布的情况 非预约*/}
									{account.is_famous == 2 ? (
										<b>
											{account.price_single_graphic_price > 0 ? (
												<span className="rmb-price">
													<img src={money} alt="" />
													{account.price_single_graphic_price}
												</span>
											) : (
													"-"
												)}
										</b>
									) : null}
								</span>
							</td>
							<td>
								{/*阅读量*/}
								{account.single_graphic_read_num ? (
									<span className="color-read-black">
										{account.single_graphic_read_num > 100000
											? "100000+"
											: Number(
												parseInt(account.single_graphic_read_num).toFixed(
													0
												)
											)}
									</span>
								) : (
										"-"
									)}
							</td>
						</tr>
					</tbody>
				</table>
				{account.is_famous == 1 ? (
					<p className="color-light font-size-small">
						<span>价格有效期：{time}</span>
					</p>
				) : (
						""
					)}
			</span>
		)
	}
}
