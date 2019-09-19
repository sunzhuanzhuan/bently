import { createHttpAction } from '../../store/ajaxMiddleware'
import Interface from "../constants/Interface";

//获取BP
export const {
	getBPList,
	getBPList_success
} = createHttpAction('getBPList', Interface.getBPList)


