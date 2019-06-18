import React, { Component } from 'react';
import { Form, Select } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
/** 
 * 单选组件
*/
class SelectFormItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }
    render() {
        const { getFieldDecorator, options, label, keyName, onChange,
            initObj = {}, formItemLayout = {}, showSearch, filterOption
        } = this.props
        return <FormItem {...formItemLayout} label={label}>
            {getFieldDecorator(keyName, initObj)(
                <Select
                    showSearch={showSearch}
                    placeholder="请选择"
                    className="select-width"
                    onChange={onChange}
                    filterOption={filterOption}
                >
                    {
                        options.map(item => {
                            return <Option key={item.id}
                                value={item.id}
                            >
                                {item.value}
                            </Option>
                        })
                    }
                </Select>
            )}
        </FormItem>
    }
}
export default SelectFormItem