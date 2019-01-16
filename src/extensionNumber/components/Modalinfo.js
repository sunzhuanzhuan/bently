import React, { Component } from "react";
import { Modal, Progress } from 'antd';
const confirm = Modal.confirm;


class Modalinfo extends Component {
    render() {
        let { visible, percent, rest, total } = this.props
        return (       
            <Modal visible={visible}
                percent={percent}
                footer={null}
                closable={null}
            >
            <div style={{ textAlign: 'center', marginTop: 15,lineHeight:'2em' }}>
                 <p>共处理{total}条数据，还剩下{rest}条</p>
                 <p>数据处理中，请稍后...</p>  
            </div>
                     
           </Modal> 
        );
    }
}
export default Modalinfo;
