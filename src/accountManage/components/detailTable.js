import React, { Component } from "react";
import PropTypes from 'prop-types';
// import "./index.css";

const Th = ({ one, index }) => {
	const key = `${one.dataIndex}th${index}`;
	return <th key={key} className="detail-table-th">
		{one.title}
	</th>
}
const Td = ({ one, index, dataSource }) => {
	const key = `${one.dataIndex}td${index}`;
	return <td
		key={key}
		colSpan={one.colspan - 1}
		className="detail-table-td"
	>
		{one.render
			? one.render((dataSource[one.dataIndex] === 0 ? 0 : (dataSource[one.dataIndex] || '-')), dataSource)
			: dataSource[one.dataIndex] === 0 ? 0 :  (dataSource[one.dataIndex] || '-')}
	</td>
}
class DetailTable extends Component {
	constructor(props) {
		super(props);
	}

	getTableList = (dataSource, columns) => {
		const {
			isPendRight = false,
			isPendLast = false,
			columnCount = 4
		} = this.props;
		const columnsForTwDimension = [];
		let number = 0;
		//确定切割数组的索引下标
		let columnsWithColspan = columns.map(item => {
			return { ...item, colspan: (item.colspan || 1) + 1 };
		})
		let splitIndexArr = columnsWithColspan.reduce((arr, item, index, sourceArr) => {
			number += item.colspan;
			if (number > columnCount) {
				//补全行尾的最后一个单元格
				isPendRight && (sourceArr[index - 1].colspan += columnCount - (number - item.colspan));
				number = item.colspan;
				arr.push(index);
			}
			return arr;
		}, []);

		//补全行尾的最后一个单元格
		isPendLast && (columnsWithColspan[columnsWithColspan.length - 1].colspan += (columnCount - number));

		//根据切割下标将一维数组拆成二维数组
		splitIndexArr.push(columnsWithColspan.length);
		splitIndexArr.reduce((pre, next) => {
			let _arr = columnsWithColspan.slice(pre, next);
			columnsForTwDimension.push(_arr);
			return next;
		}, 0);
		return columnsForTwDimension;
	};

	handleChildren = (dataSource, subList) => {
		let children = [];
		subList.forEach((one, index) => {
			children.push(<Th one={one} index={index} />);
			children.push(<Td one={one} index={index} dataSource={dataSource} />)
		});
		return children;
	};
	render() {
		const {
			dataSource,
			columns,
			className,
			style,
			isFilterZero = false
		} = this.props;
		//过滤数值为0的列
		const filterColumns = isFilterZero ? columns.filter(item => (dataSource[item.key] == 0 || dataSource[item.key])) : columns
		if (filterColumns.length == 0) {
			return null;
		}
		const tableList = this.getTableList(dataSource, filterColumns);
		const classNameValue = `detail-table ${className || ''}`;
		return (
			<table style={style} className={classNameValue}>
				<tbody>
					{tableList.map((subList, index) => {
						return (
							<tr key={index} className="detail-table-tr">
								{this.handleChildren(dataSource, subList)}
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	}
}
DetailTable.propTypes = {
	columns: PropTypes.array.isRequired,
	dataSource: PropTypes.object.isRequired,
	isPendRight: PropTypes.bool,	//补全行尾的最后一个单元格 false
	isPendLast: PropTypes.object,		//补全行尾的最后一个单元格 false
	isFilterZero: PropTypes.object,		//是否过滤掉结果为0的统计项 false
	columnCount: PropTypes.number,		//总列数
	style: PropTypes.object,
	className: PropTypes.string

}


export default DetailTable;
