
import moment from "moment";
export const urlPathMap = (host, id) => {
	return {
		poUrl: `${host}/sale/executionevidence/detail?id=${id}`,//PO单号
		projectUrl: `${host}/sale/project/detail?id=${id}`,//项目
		orderResUrl: `${host}/pack/order/info/order_id/${id}`,//预约orderID
		reservationUrl: `${host}/pack/reservationrequirement/infoforsale?reservation_requirement_id=${id}`,//需求orderID
		campaignUrl: `${host}/sale/company/orderlist/campaign_id/${id}`,//微闪投活动
		businessUrl: `${host}/pack/companyextendedbusiness/detail?business_id=${id}`//公司拓展业务活动
	}
}
export const detectionUrl = (host, id, formatted_start_time, formatted_end_time) => {
	return `${host}/sale/detection/dispatchorderlistforsale/begin_time/${formatted_start_time}/end_time/${formatted_end_time}/order_id/${id}/content_type//original_post_type//submit/true/`
}
export default {
	urlPathMap,
	detectionUrl
}
