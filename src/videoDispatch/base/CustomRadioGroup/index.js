import React, { Component } from "react"
import { Radio } from 'antd';

const RadioGroup = Radio.Group;
import PropTypes from 'prop-types'
import './index.less'

/**
 * 多选框组件
 * 封面标题类型 视频标题类型 我要上热门
 * 带上
 * 什么是封面标题?
 * 单行布局
 */
class CustomRadioGroup extends Component {
    state = {
        value: this.props.value || 1
    }
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired
        })).isRequired,
    }
    onChange = (e) => {
        this.setState({ value: e.target.value });
        this.props.onChange && this.props.onChange(e.target.value)
    }

    render() {
        const { items } = this.props
        return (
            <div className='custom-radio-group'>
                <RadioGroup onChange={this.onChange} value={this.state.value}>
                    {
                        items.map(({value, text}) => <Radio key={value} value={value}>{text}</Radio>)
                    }
                </RadioGroup>
                {this.props.children}
            </div>
        )
    }
}

export default CustomRadioGroup
