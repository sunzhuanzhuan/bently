import React from 'react'
import { Modal } from 'antd';

export const ExpandProgressModal = (props) => {
    const {
        creator, updated_at, progress_status_reason, visible, onOK, onCancel, footer, title
    } = props;
    return (
        <Modal
            title={title}
            visible={visible}
            footer={footer}
            onOk={onOK}
            onCancel={onCancel}

        >
            <ul>
                <li>操作人：{creator}</li>
                <li>操作时间：{updated_at}</li>
                <li>原因：{progress_status_reason || '无'}</li>
            </ul>
        </Modal>
    )
}

