import React from 'react'
import PropTypes from 'prop-types'
import { Form, Select, Spin } from 'antd';
import debounce from 'lodash/debounce'

import './formStyle.less'

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};


class FormSelectByLocalSearch extends React.Component {
  state = {
    options: [],
    fetching: false,
  };

  constructor(props) {
    super(props);
    this.fetch = debounce(this.fetch, 800);
  }

  fetch = value => {
    if(!(value && value.trim())) return
    this.setState({ data: [], fetching: true });
		this.timer = setTimeout(() => {
			const { sourcesOptions = [] } = this.props
			const result = sourcesOptions.filter(({ name }) => name.indexOf(value) > -1)

			const data = result.slice(0,30)
			this.setState({ options: data, fetching: false });
			clearTimeout(this.timer)
		},300);
  };

  render() {
    const { form, name, label, multiple = false, supportSearch = false } = this.props
    const { options, fetching } = this.state
    const { getFieldDecorator } = form;
    const mode = multiple ? 'multiple' : '';

    if (multiple === true) {
      return (
        <div style={{ display: 'block' }}>
          <FormItem {...formItemLayout} label={label}>
            {getFieldDecorator(name)(
              <Select
                mode={mode}
                style={{ width: 700 }}
                getPopupContainer={triggerNode => triggerNode.parentNode}
                placeholder={`请搜索并选择${label}`}
                onSearch={this.fetch}
								filterOption={false}
								notFoundContent={fetching ? <Spin size="small" /> : "无匹配结果"}
              >
                {
                  options.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
                }
              </Select>
            )}
          </FormItem>
        </div>
      )
    } else {
      return (
        <FormItem {...formItemLayout} label={label}>
          {getFieldDecorator(name, {
            initialValue: "0"
          })(
            <Select mode={mode} style={{ width: 120 }}
                    placeholder={`请搜索并选择${label}`}
                    getPopupContainer={triggerNode => triggerNode.parentNode}
										onSearch={this.fetch}
										filterOption={false}
										notFoundContent={fetching ? <Spin size="small" /> : "无匹配结果"}
            >
              {
                options.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
              }
            </Select>
          )}
        </FormItem>
      )
    }

  }
}

FormSelectByLocalSearch.propTypes = {
  form: PropTypes.object,
  name: PropTypes.string,
  options: PropTypes.array,
  multiple: PropTypes.bool,
  label: PropTypes.string
}

export default FormSelectByLocalSearch

