import React from "react"
import './Secondary.less'

const Secondary = ({ genderName, areaName, ageGroup }) => {
	const data = []
	if (genderName) {
		data.push(genderName)
	}
	if (areaName) {
		data.push(areaName)
	}
	if (ageGroup) {
		data.push(ageGroup)
	}

	return <ul className='account-secondary-wrapper' >
		{data.map((text, index) => <li className='account-secondary-item' key={index}>{text}</li>)}
	</ul>
}

export default Secondary
