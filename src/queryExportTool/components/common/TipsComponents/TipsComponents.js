import React, { Component } from "react"
import { Popover } from "antd";
import CloseComponents from "../CloseComponents/CloseComponents";
export default class WeixinQrCode extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
        }
    }

    componentDidMount() { }

    hide = () => {
        this.setState({
            visible: false,
        });
    }

    handleVisibleChange = (visible) => {
        this.setState({ visible });
    }
    render() {
        const { trigContent, title, content, trigger, arrowPointAtCenter, placement, autoAdjustOverflow } = this.props
        return <Popover
            visible={this.state.visible}
            onVisibleChange={this.handleVisibleChange}
            title={title}
            content={<TipsContent content={content} hide={this.hide} trigger={trigger} title={title} />}
            trigger={trigger}
            arrowPointAtCenter={arrowPointAtCenter}
            autoAdjustOverflow={autoAdjustOverflow}
            placement={placement}
        >
            {trigContent}
        </Popover>
    }
}

export const TipsContent = ({ content, hide, trigger, title }) => {

    return <div style={{ 'position': 'relative' }}>
        {(trigger == 'click' || null) && <CloseComponents imgSize='9' hide={hide} title={title} />}
        {content}
    </div>
}