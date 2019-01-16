import React, { Component } from "react"
import { Steps } from 'antd';
import PropTypes from 'prop-types'
import './index.less'
const Step = Steps.Step;
/**
 * 步骤的组件
 */
class CustomSteps extends Component {
    static propTypes = {
        step: PropTypes.number
    }
    render() {
        return (
            <div className='custom-steps'>
                <Steps labelPlacement='vertical' current={this.props.step}>
                    <Step title="填写活动内容" />
                    <Step title="选择账号" />
                    <Step title="确认提交已选账号" />
                </Steps>
            </div>
        )
    }
}

export default CustomSteps
