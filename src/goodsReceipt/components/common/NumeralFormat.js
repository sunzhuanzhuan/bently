import numeral from "numeral";
import React from 'react';
const NumeralFormat = ({ value = 0 }) => {
	function getNumber(value) {
		return numeral(value).format('0.00')
	}
	return <span>
		{getNumber(value)}
	</span>
}
export default NumeralFormat
