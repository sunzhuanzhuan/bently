import React, { Component } from "react"
import "./WeiboReferencePrice.less"
export default class WeiboReferencePrice extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { account } = this.props
        const tweet_title = account.is_famous == 1 ? "直发参考报价" : "直发报价"
        const retweet_title = account.is_famous == 1 ? "转发参考报价" : "转发报价"
        const time = account.price_validity_period_end ? account.price_validity_period_end : "-"
        return (
            <span>
                <table className="account-price-recommend">
                    <thead>
                        <tr>
                            <th>
                                <span className="account-others-title">{tweet_title}</span>
                            </th>
                            <th>
                                <span className="account-others-title">{retweet_title}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-left">
                                <span className="color-high-light">
                                    {account.sina_tweet ? (
                                        <b className="money">硬广:{account.sina_tweet} </b>
                                    ) : (
                                        "-"
                                    )}
                                </span>
								
							
                            </td>
							<td>
							<span className="color-high-light">
                                    {account.sina_tweet ? (
                                        <b className="money">硬广:{account.soft_tweet} </b>
                                    ) : (
                                        "-"
                                    )}
                                </span>
								
							</td>                       
                        </tr>
						<tr>
							<td className="text-left">
								<span className="color-high-light">
									{account.sina_retweet ? (
										<b className="money">软广:{account.sina_retweet}</b>
									) : (
											"-"
										)}
								</span>
							</td>
							<td className="text-left">
								<span className="color-high-light">
									{account.sina_retweet ? (
										<b className="money">软广:{account.soft_retweet}</b>
									) : (
											"-"
										)}
								</span>
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
