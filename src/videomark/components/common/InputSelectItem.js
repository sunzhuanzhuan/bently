import React, { Component, Fragment } from 'react'
import { Form, Input, Button, DatePicker, Select, Icon } from 'antd'
import './InputSelectItem.less'
const Option = Select.Option;

export default class InputSelectItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: ''
        }
    }

    onChange = (id) => {
        if (this.props.onChange) {
            this.props.onChange(id)
        }
    }
    onSearch = (query) => {
        this.setState({
            query: query.replace(/(^\s*)|(\s*$)/g, '')
        })
    }
    handleDisplayText = (text) => {
        const { query } = this.state
        const start = text.indexOf(query)
        const len = query.length

        if (start >= 0) {
            return <Fragment>
                {text.slice(0, start)}
                <span style={{ color: '#000000', fontWeight: 600 }}>
                    {text.slice(start, start + len)}
                </span>
                {text.slice(start + len)}
            </Fragment>

        }
        return text
    }
    filterOption = (obj) => {
        if (Object.prototype.toString.call(obj) === '[object Array]') {
            return true
        } else if (Object.prototype.toString.call(obj) === '[object String]') {
            return false
        } else if (Object.prototype.toString.call(obj) === '[object Object]') {
            return this.filterOption(obj.props.children)
        }
    }
    render () {
        const {
            options,
            displayStr,
            keyStr
        } = this.props
        const { query } = this.state
        return <Select
            placeholder="输入/选择"
            className="select-width input-select-wrap"
            showSearch
            filterOption={(input, option) => {
                if (input.replace(/(^\s*)|(\s*$)/g, '')) {
                    return this.filterOption(option.props.children)
                } else {
                    return true
                }
            }}
            onSearch={this.onSearch}
            onChange={this.onChange}
            getPopupContainer={() => document.querySelector('.input-select-wrap')}
        >
            <Option key='0'>请选择</Option>
            {
                options.length > 0 ?
                    options.map(item => {
                        return <Option key={item[keyStr]}
                            value={item[keyStr]}
                        >
                            {
                                query ?
                                    this.handleDisplayText(item[displayStr])
                                    : item[displayStr]
                            }
                        </Option>
                    }) : ""
            }
        </Select >
    }
}