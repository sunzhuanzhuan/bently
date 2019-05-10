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
        const { getFieldDecorator, options, label, keyName, onChange } = this.props
        return <FormItem label={label}>
            {getFieldDecorator(keyName)(
                <Select
                    placeholder="请选择"
                    className="select-width"
                    onChange={onChange}
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