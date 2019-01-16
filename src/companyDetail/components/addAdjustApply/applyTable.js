import React from 'react'
import { Table } from "antd";
import { WBYTableFooter } from 'wbyui'
import qs from 'qs'
import difference from 'lodash/difference';


class ApplyTable extends React.Component {
	constructor() {
		super();
		this.state = {
		}
	}
	onCheckAllChange = e => {
		const { type, curSelectRowKeys, dataSource, handleSelected } = this.props;
		let ary = dataSource.map(item => item.order_id);
		let filterData = dataSource.filter(item => item.status === '1');
		let filterAry = filterData.map(item => item.order_id);
		let rowKeys = difference(curSelectRowKeys, ary);
		let fillterRowKeys = difference(curSelectRowKeys, filterAry);
		let rows, curRowKeys;
		if (e.target.checked) {
			if (type === 'write_detail') {
				curRowKeys = fillterRowKeys.concat(filterAry);
				rows = filterData;
			} else {
				curRowKeys = rowKeys.concat(ary);
				rows = dataSource;
			}
		} else {
			curRowKeys = rowKeys;
			rows = [];
		}
		handleSelected(curRowKeys, rows);
	}
	selectedAry = type => {
		const { dataSource, curSelectRowKeys, curSelectRows } = this.props;
		const curAry = difference(curSelectRowKeys, curSelectRows.map(item => item.order_id));
		const data = type === 'write_detail' ? dataSource.filter(item => item.status === '1') : dataSource;
		const ary = data.map(item => item.order_id);
		const flag = ary.every(item => curSelectRowKeys.includes(item));
		return flag ? ary : curAry
	}
	render() {
		const { type, rowKey, loading, columns, dataSource, page, total, queryAction, curSelectRowKeys, handleSelected, scroll = {} } = this.props;
		const search = qs.parse(this.props.location.search.substring(1));
		const data = type === 'write_detail' ? dataSource.filter(item => item.status === '1') : dataSource;
		const ary = this.selectedAry(type);
		const page_size = search.keys ? search.keys.page_size : 50;
		let paginationObj = {
			onChange: (current) => {
				queryAction({ page: current, ...search.keys });
			},
			total: parseInt(total),
			current: parseInt(page),
			pageSize: parseInt(page_size),
			showQuickJumper: true,
		};
		let rowSelectionObj = type === 'write_detail' ? {
			selectedRowKeys: curSelectRowKeys,
			onChange: (selectedRowKeys, selectedRows) => {
				handleSelected(selectedRowKeys, selectedRows);
			},
			getCheckboxProps: record => ({
				disabled: !(record.status === "1")
			}),
		} : {
				selectedRowKeys: curSelectRowKeys,
				onChange: (selectedRowKeys, selectedRows) => {
					handleSelected(selectedRowKeys, selectedRows);
				}
			};
		return <div>
			{type === 'read_detail' ? <Table className='top-gap'
				rowKey={rowKey}
				columns={columns}
				dataSource={dataSource}
				scroll={scroll}
				bordered
				pagination={dataSource.length ? paginationObj : false}
				loading={loading}
			/> : null}
			{type === 'write_detail' ? <Table className='top-gap'
				rowKey={rowKey}
				columns={columns}
				dataSource={dataSource}
				scroll={scroll}
				bordered
				pagination={false}
				loading={loading}
				rowSelection={rowSelectionObj}
				footer={() => {
					return <WBYTableFooter
						plainOptions={data}
						selectedRowKeys={ary}
						onChange={this.onCheckAllChange}
						title={'全选'}
						pagination={dataSource.length ? paginationObj : false}
					/>
				}}
			/> : null}
			{type === 'add' ? <Table className='top-gap'
				rowKey={rowKey}
				columns={columns}
				dataSource={dataSource}
				scroll={scroll}
				bordered
				pagination={false}
				loading={loading}
				rowSelection={rowSelectionObj}
				footer={() => {
					return <WBYTableFooter
						plainOptions={dataSource}
						selectedRowKeys={ary}
						onChange={this.onCheckAllChange}
						title={'全选'}
						pagination={dataSource.length ? paginationObj : false}
					/>
				}}
			/> : null}
		</div>
	}
}

export default ApplyTable;
