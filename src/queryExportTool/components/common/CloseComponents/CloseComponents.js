import React, { Component } from 'react'

import './CloseComponents.css'

export default class CloseComponents extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { imgSize, hide, title } = this.props
        let topSize = ""
        if (title) {
            topSize = "-44"
        }
        return <a href="javascript:;" className="wby-close" onClick={hide} style={{ top: topSize + "px" }}>
            <img src={require('./images/close.png')} width={imgSize} alt="" />
        </a>
    }
}


