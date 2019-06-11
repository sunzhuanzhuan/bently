import React from 'react'

const EmSpan = ({ children, length = 1 }) => {
	return (
		<span style={{ display: 'inline-block', width: length + 'em' }}>{children}</span>
	)
}

export default EmSpan
