import React from "react"
import './index.less'
import { Button } from "antd";

const types = [
	/*{
		id: 1,
		name: '参考价'
	},
	{
		id: 2,
		name: '渠道价'
	},
	{
		id: 3,
		name: '刊例价'
	}*/
]


const PriceGroupType = ({ selected = [1], onChange }) => {

	const add = (id) => {
		let newSelected = [...selected]
		newSelected.push(id)
		onChange && onChange(newSelected)
	}
	const remove = (index) => {
		if(selected.length === 1) return
		let newSelected = [...selected]
		newSelected.splice(index, 1)
		onChange && onChange(newSelected)
	}

	return <div className='price-type-select-list'>
		{
			types.map(({ id, name }) => {
				const index = selected.indexOf(id)
				const noChecked = index < 0
				return <Button
					key={id}
					type='primary'
					ghost={noChecked}
					size='small'
					onClick={() => {
						noChecked ? add(id) : remove(index)
					}}
				>
					{name}
				</Button>
			})
		}
		{/*<span className='gray-text'>请选择导出的报价类型(至少一项)</span>*/}
	</div>
}

export default PriceGroupType
