import React, { Component } from "react"
import WeiboReferencePrice from "./price/WeiboReferencePrice"
import WeixinReferencePrice from "./price/WeixinReferencePrice"
import "./ColumnReferencePrice.less"
export default class ColumnReferencePrice extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { account } = this.props
        let price = ""
        switch (
            account.weibo_type // 微博价格
        ) {
            case 1:
                price = <WeiboReferencePrice account={account} />
                break
            case 9: //微信价格
                price = <WeixinReferencePrice account={account} />
                break
            default:
                break
        }
        return this.props.type == "weibo" ? (
            <div className="price-text" style={{ width: "155px" }}>
                {price}
            </div>
        ) : (
            <div className="price-text">{price}</div>
        )
    }
}
