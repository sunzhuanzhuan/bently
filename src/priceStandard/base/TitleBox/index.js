import React from 'react'
import './index.less'
function TitleBox(props) {
  return (
    <div className='title-box'>
      <div className='left-box'>{props.title}</div>
      {props.children ? <div className='children'>{props.children}</div> : null}
    </div>
  )
}

export default TitleBox
