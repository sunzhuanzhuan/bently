import React, { Component } from 'react';
import { Form, Input, Radio, } from 'antd';
import ExplainContents from "../base/ExplainContents";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea
class VideoTitleContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueRadioGroup: 1
        };
        this.isFirstInitialize = true
    }
    componentWillReceiveProps(nextProps) {
        const { isNeedDefault, videoCampaignInfo, isvideoCampaignInfo } = this.props
        if (isNeedDefault && isvideoCampaignInfo && this.isFirstInitialize) {
            const valueRadioGroup = videoCampaignInfo.note ? 1 : 2
            this.setState({ valueRadioGroup })
            this.isFirstInitialize = false
        }
    }
    onChange = (e) => {
        this.setState({ valueRadioGroup: e.target.value })
        if (e.target.value === 2) {
            console.log("进来了 ")
            this.props.setFieldsValue({
                note: null
            })
        }
    }
    //视频标题校验
    vailVideoTitle = (rule, value, callback) => {
        const { minVideoLength, maxVideoLength } = this.props
        if (value.length > maxVideoLength) {
            callback(`视频标题长度不超过${maxVideoLength}个字`);
        } else if (minVideoLength > value.length) {
            callback(`视频标题长度不少于${minVideoLength}个字`);
        }
        else {
            callback();
        }
    }

    render() {

        const { valueRadioGroup } = this.state;
        const { formItemLayout, getFieldDecorator, videoCampaignInfo,
            notePromptText, videoWhat } = this.props

        const videoTitle = videoCampaignInfo && videoCampaignInfo.note
        return (

            <div>
                <FormItem {...formItemLayout} label={<span className="required-label"><span className="required-red-star">*</span>是否添加简介</span>} >
                    <RadioGroup onChange={this.onChange} value={valueRadioGroup} >
                        <Radio value={1}>是</Radio>
                        <Radio value={2}>否</Radio>
                    </RadioGroup>
                    <ExplainContents content={videoWhat} />
                </FormItem>

                {valueRadioGroup === 1 ? <FormItem {...formItemLayout} label="简介内容">
                    {getFieldDecorator('note', {
                        initialValue: videoTitle,
                        validateFirst: true,
                        validateTrigger: 'onBlur',
                        rules: [{
                            required: true,
                            message: '请填写简介内容',
                        }, { validator: this.vailVideoTitle }],
                    })(
                        <TextArea autosize={{ minRows: 4, maxRows: 4 }} />
                    )}
                    <div className="prompt-content">
                        {notePromptText}
                    </div>
                </FormItem> : null}
            </div>

        );
    }
}

export default VideoTitleContent;
