import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import SelectFormItem from '../common/SelectFormItem'
const FormItem = Form.Item;

class BrandHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.levelOption = [
            { id: 1, value: '主品牌' },
            { id: 2, value: '子品牌' },
        ];
        this.signOption = [
            { id: 1, value: '可用' },
            { id: 2, value: '不可用' },
        ];
    }

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const levelInit = {
            initialValue: undefined,
        };
        const signInit = {
            initialValue: undefined,
        };

        return (
            <div className='formHeaderWrapper'>
                <Form layout='inline' key='formHeader' className='brand_header_form'>
                    <SelectFormItem
                        getFieldDecorator={getFieldDecorator}
                        label={'品牌类型'}
                        keyName={'level'}
                        options={this.levelOption}
                        initObj={levelInit}
                    />
                    <SelectFormItem
                        getFieldDecorator={getFieldDecorator}
                        label={'标注可用'}
                        keyName={'is_signed_available'}
                        options={this.signOption}
                        initObj={signInit}
                    />
                    <FormItem label="品牌名称">
                        {getFieldDecorator('content_type_id', {
                            initialValue: undefined,
                        })(
                            <Input />
                        )}
                    </FormItem>
                </Form>
                <Button key='searchBtn' type='primary'>搜索</Button>
                <Button key='addBtn' type='primary'>添加品牌</Button>
            </div>
        )
    }
}

export default Form.create()(BrandHeader);
