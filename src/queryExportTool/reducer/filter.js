
import { handleAction } from 'redux-actions';
import { getFilters_success, getFiltersMeta_success, getClassifications_success } from '../actions'
export const filterOptions = handleAction(getFilters_success, (state, action) => {
	return {
		...state,
		...action.payload
	}
}, {})
export const filtersMetaMap = handleAction(getFiltersMeta_success, (state, action) => {

	let gropusAfter = [...action.payload.data.groups]
	gropusAfter.unshift({ id: 0, name: "不限", platformId: 0 })
	const groups = gropusAfter.map((one, index) => {
		const { groupedPlatforms = [] } = one
		if (groupedPlatforms.length <= 0) {
			delete one.groupedPlatforms
		}
		if (one.platformId <= 0) {
			one.platformId = 0 - index
		}
		return one
	})
	return {
		...action.payload.data,
		groups: groups
	}
}, {})

/**
 * 内容分类、人设分类和风格分类options
 */
export const classificationOptions = handleAction('getClassifications_success', (state, action) => {
    let mockData = {"code":"in dolor aute Ut","msg":"eu","data":{"content":[{"name":"观","code":450000199404138400,"children":[{"name":"江","code":710000199002041900,"children":[{"name":"率","code":"460000200307256361"},{"name":"铁","code":"530000198610072133"},{"name":"政","code":"320000200511279746"}]}]},{"name":"收","code":450000199309119170,"children":[{"name":"观","code":370000201502207360,"children":[{"name":"加","code":"650000199702031875"},{"name":"住","code":"520000198211123093"}]},{"name":"规","code":370000201912199100,"children":[{"name":"日","code":"340000201603272718"},{"name":"至","code":"340000200605256303"}]},{"name":"向","code":150000198604058620,"children":[{"name":"政","code":"460000199102267985"},{"name":"取","code":"230000200508015422"},{"name":"论","code":"130000197609306677"},{"name":"应","code":"210000201512164659"}]}]},{"name":"术","code":330000200805132540,"children":[{"name":"红","code":42000019750609450,"children":[{"name":"面","code":"650000197105286707"},{"name":"共","code":"130000198911116123"}]},{"name":"各","code":510000199001141500,"children":[{"name":"风","code":"650000199807284289"},{"name":"改","code":"810000198410077682"},{"name":"收","code":"45000019980701402X"},{"name":"山","code":"650000201101295381"}]},{"name":"团","code":420000201312278000,"children":[{"name":"示","code":"540000201601016320"},{"name":"什","code":"710000201007279162"},{"name":"子","code":"35000019850708655X"}]},{"name":"情","code":330000200006129300,"children":[{"name":"都","code":"320000200905042434"},{"name":"引","code":"510000201707016913"},{"name":"术","code":"610000198303096215"},{"name":"难","code":"430000200011189432"},{"name":"运","code":"510000197609028321"}]}]},{"name":"动","code":430000199009270200,"children":[{"name":"近","code":220000199311208480,"children":[{"name":"场","code":"410000201901195683"},{"name":"温","code":"530000197004214715"},{"name":"效","code":"620000200405151440"},{"name":"他","code":"630000200408272071"}]},{"name":"将","code":630000199006129500,"children":[{"name":"进","code":"610000198712211384"},{"name":"所","code":"420000199402152373"}]},{"name":"号","code":710000197109066600,"children":[{"name":"叫","code":"710000197608312037"},{"name":"张","code":"150000197206033399"},{"name":"片","code":"710000199012286586"}]},{"name":"出","code":410000200010044600,"children":[{"name":"出","code":"370000200711012594"}]},{"name":"共","code":150000198803049180,"children":[{"name":"规","code":"410000199807316370"},{"name":"反","code":"530000198307254735"},{"name":"斗","code":"620000199610086558"}]}]},{"name":"习","code":610000200903211400,"children":[{"name":"义","code":120000198607044220,"children":[{"name":"状","code":"370000197503047560"},{"name":"青","code":"430000197007207357"},{"name":"集","code":"31000019851207314X"}]},{"name":"酸","code":370000198809117800,"children":[{"name":"题","code":"430000199512097143"},{"name":"级","code":"140000197701143788"},{"name":"该","code":"510000201010188782"},{"name":"拉","code":"820000198105312342"},{"name":"世","code":"21000019920317874X"}]},{"name":"并","code":640000201709121900,"children":[{"name":"织","code":"130000201011273435"}]},{"name":"正","code":150000202003101340,"children":[{"name":"性","code":"450000201501272114"},{"name":"精","code":"360000199911061860"},{"name":"必","code":"710000198202156905"},{"name":"具","code":"650000199103247121"}]},{"name":"位","code":410000201403217300,"children":[{"name":"属","code":"820000201204037838"}]}]}],"style":[{"name":"走况式员据","code":820000200209108500}],"people":[{"name":"黎伟","code":810000201804135700},{"name":"陈军","code":14000020031024260}]}};
    return {
        ...state,
        // ...action.payload
        ...mockData

    }
}, {});
