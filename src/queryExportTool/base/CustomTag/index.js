import React from "react"
import './index.less'

function isPresetColor(color) {
	if (!color) {
		return false;
	}
	return (/^(green|blue|gary)$/.test(color));
}

const CTag = ({ color, children }) => {
	const className = isPresetColor(color) ? 'custom-tag custom-tag-' + color : 'custom-tag'
	return children ? <div className={className}>{children}</div> : null
}

export default CTag
