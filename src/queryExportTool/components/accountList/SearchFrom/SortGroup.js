import React, {Component} from "react"
import SortBtn from "@/queryExportTool/components/accountList/SearchFrom/SortBtn";
import SortCascader from "./SortCascader";
import {parseUrlQuery} from '@/util/parseUrl'
import {handleMoreList} from '../../../constants/sort'

export default class SortGroup extends Component {
    dataToParams = (key, sort) => {
        const {onSort} = this.props
        let params = {
            order: sort
        }
        if (/:/i.test(key)) {
            let [w, f] = key.split(/:/i)
            key = w
            params = {
                ...params,
                filter: {
                    skuTypeId: f
                }
            }
        }

        onSort && onSort({accountSort: sort && {[key]: params}})
    }

    constructor(props) {
        super(props)
        let keyword = parseUrlQuery()['keyword'];
        //包装数据
        const defaultObject = props.sorter.default
        const key = Object.keys(defaultObject)[0]
        const sort = {[key]: {order: defaultObject[key]}, ...defaultObject}
        this.state = {
            sort: keyword ? {} : (sort || {}),
        }
        this.setSort.bind(this)
        this.dataToParams.bind(this)
        this.handleChange.bind(this)
    }

    handleChange = (field, sort) => {
        this.setState({sort: {[field]: sort,}})
        this.dataToParams(field, sort)
    }
    setSort = (sort) => {
        this.setState(sort)
    }
    reset = (clear) => {
        //包装数据
        const defaultObject = this.props.sorter.default
        const key = Object.keys(defaultObject)[0]
        const sort = {[key]: {order: defaultObject[key]}}
        this.setState({
            sort: (clear ? undefined : sort) || {},
        })
        return {accountSort: (clear ? undefined : sort)}
    }
    isHighlight = (sort, type) => {
        return Object.values(type).filter(one => Object.keys(sort)[0] == one.value).length > 0
    }

    render() {
        const {sorter = {}, sortMore = []} = this.props
        const {buttons = [], more = [], priceGoodBadList = [], noAddSkuPrice} = sorter
        const {sort,} = this.state
        const propsSortCascader = {
            sorter: sorter,
            sort: sort,
            setSort: this.setSort,
            dataToParams: this.dataToParams,
        }
        //平台独有价格项
        const groupSort = handleMoreList(sortMore)
        const allMoreSort = [...more, ...groupSort]
        let priceList = [...allMoreSort]
        priceList.splice(0, 1)
        return <div className='sorter-container'>
            {buttons.map(({field, title, tip}) =>
                <SortBtn key={field} tip={tip} field={field} title={title} sort={sort[field]} onChange={this.handleChange}/>)}
            <SortCascader list={priceList} seletedText='优势报价' {...propsSortCascader} isHighlight={this.isHighlight(sort, priceGoodBadList)}/>
            <SortCascader list={allMoreSort}
                          seletedText='更多排序' {...propsSortCascader}
                          isHighlight={this.isHighlight(sort, allMoreSort)}/>
        </div>
    }
}
