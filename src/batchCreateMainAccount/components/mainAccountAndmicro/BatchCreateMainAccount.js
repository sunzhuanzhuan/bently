import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Steps, message } from 'antd';
import * as commonActions from '../../../actions/index'
import * as batchOptionsActions from '../../actions/batchOptions'
import UploadAccountMessage from './UploadAccountMessage'
import { Finish } from './Finish'
import { stepMessage, step2Title, operateClass } from '../../constants/config'
import './BatchCreateMainAccount.less'

const Step = Steps.Step;

class BatchCreateMainAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
  }

  componentWillMount() {
    this.props.getNewDownloadLink()
  }

  upload = (file, originFile) => {
    if (file.length !== 0) {

      let value = {
        uploadUrl: file[0].url,
        operateType: this.props.operateKey,
        originalFileName: originFile.name,
        operateClass: operateClass[this.props.operateKey]
      }
      this.props.actions.saveBatchOperate(value).then(() => {
        this.setState({
          current: 1
        })
      }).catch(() => {
        message.error("请求失败")
      })
    }
  }
  //继续操作
  continueOption = () => {
    this.setState({
      current: 0
    })
  }

  render() {
    return (
      <div>
        <h4>{step2Title[this.props.operateKey]}</h4>
        <Steps current={this.state.current} className="step">
          <Step title={stepMessage[this.props.operateKey].step1Title}
                description={stepMessage[this.props.operateKey].step1Message} />
          <Step title="完成" description={stepMessage[this.props.operateKey].step2Message} />
        </Steps>
        {/* 内容 */}
        {
          this.state.current == 0 ?
            <UploadAccountMessage
              uploadInfo={this.props.uploadInfo}
              upload={this.upload}
              return={this.props.return}
              downloadLink={this.props.downloadLink}
              operateKey={this.props.operateKey}
              getNewToken={this.props.actions.getNewToken}
            ></UploadAccountMessage> :
            <Finish
              return={this.props.return}
              continueOption={this.continueOption}
              operateKey={this.props.operateKey}
            ></Finish>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    uploadInfo: state.batchCreateMainAccountReducers.uploadInfo,
    downloadLink: state.batchCreateMainAccountReducers.downloadLink
  }
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...batchOptionsActions, ...commonActions
  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BatchCreateMainAccount)


