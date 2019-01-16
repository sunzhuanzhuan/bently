import React, { Component } from 'react';
import { Form, Input, Radio, } from 'antd';
import ExplainContents from "../base/ExplainContents";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class VolcanicContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueRadioGroup: 1
        };
    }
    componentDidMount = () => {

    }
    onChange = (e) => {
        this.setState({ valueRadioGroup: e.target.value })
    }
    //话题名称校验
    vailTopic = (rule, value, callback) => {
        if (value.slice(0, 1) !== "#") {
            callback("话题名称必须以“#”开头");
        } else if (value.length > 16) {
            callback("话题名称不得超过16个字");
        } else {
            callback();
        }
    }
    onChangeRadio = (value) => {
        this.setState({ valueRadioGroup: value })
    }
    render() {

        const { valueRadioGroup } = this.state;
        const { formItemLayout, getFieldDecorator, videoCampaignInfo } = this.props
        const topicName = videoCampaignInfo && videoCampaignInfo.topic || ""
        // 	//话题信息
        const topicWhat = {
            title: "什么是话题?",
            src: require("../img/volcanic-topic.jpg"),
            desc: "在发布视频时添加话题，视频会获得更多的曝光机会。如下示意，红色框内的为话题",
        }
        return (
            <div>
                <FormItem {...formItemLayout} label="添加话题">
                    {getFieldDecorator('topic_type_add', {
                        validateFirst: true,
                        initialValue: valueRadioGroup,
                        rules: [{
                            required: true,
                            message: '请输入添加话题',
                        }],
                    })(
                        <RadioGroup onChange={this.onChange}>
                            <Radio value={1}>是</Radio>
                            <Radio value={2}>否</Radio>
                        </RadioGroup>
                    )}
                    <ExplainContents content={topicWhat} />
                </FormItem>

                {valueRadioGroup === 1 ? <FormItem {...formItemLayout} label="话题名称">
                    {getFieldDecorator('topic', {
                        validateFirst: true,
                        initialValue: topicName,
                        rules: [{
                            required: true,
                            message: '请输入话题名称',
                        }, { validator: this.vailTopic }],
                    })(
                        <Input />
                    )}
                    <div className="prompt-content">填写要添加的话题，格式为“#话题名称”，话题名称不超过16个字
					<span style={{ color: 'red' }}>仅可添加一个话题，否则将不识别</span>
                    </div>
                </FormItem> : null}
            </div>
        );
    }
}

export default VolcanicContent;
