import React from "react"
import './Secondary.less'

const Secondary = ({ genderName, area_name, age_group }) => {
	const data = []
	if (genderName) {
		data.push(genderName)
	}
	if (area_name) {
		data.push(area_name)
	}
	if (age_group) {
		data.push(age_group + '后')
	}

	return <ul className='account-secondary-wrapper' >
		{data.map((text, index) => <li className='account-secondary-item' key={index}>{text}</li>)}
	</ul>
}

export default Secondary
