import React, { Component } from "react"
import './CommonBackgroudIcon.css'
const getMarginSize = (bgTransform, bgWidth, bgMargin = 4) => {
    let marginSize = (1 - bgTransform) * bgWidth / 2
    if (marginSize <= bgMargin) {
        marginSize = bgMargin - marginSize
    } else {
        marginSize = -(marginSize - bgMargin)
    }
    return marginSize
}
export default class CommonBackgroudIcon extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { img, bgHeight, bgWidth, bgTransform = 1, bgMargin = 4 } = this.props
        const marginSize = getMarginSize(bgTransform, bgWidth, bgMargin)
        return <span
            className="wby-backgroud-img"
            style={{
                backgroundImage: "url(" + img + ")",
                height: bgHeight,
                lineHeight: bgHeight + "px",
                width: bgWidth,
                transform: "scale(" + bgTransform + ")",
                margin: "0 " + marginSize + "px",
            }}>
        </span>
    }
}

export const BackGroundSpriteIcon = ({ img, bgHeight, bgWidth, bgPadding, bgTransform = 1,
    bgFontSize, text, bgMargin, bgPosition, fontColor }) => {
    const marginSize = getMarginSize(bgTransform, bgWidth, bgMargin)
    return <span
        className={"wby-backgroud-list-img " + bgPosition}
        style={{
            backgroundImage: "url(" + img + ")",
            height: bgHeight,
            lineHeight: bgHeight + "px",
            width: bgWidth,
            padding: bgPadding,
            margin: "0 " + marginSize + "px",
            transform: "scale(" + bgTransform + ")",
            fontSize: bgFontSize,
            color: fontColor
        }}>
        {text}
    </span>
}

