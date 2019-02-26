import { createHttpAction } from '../../store/ajaxMiddleware'
import { createAction } from 'redux-actions';
import Interface from "../constants/Interface";
import api from "../../api";

//GR申请单-第一步-获取订单信息统计项
// export const {
// 	getPOItemTotalStatistic,
// 	getPOItemTotalStatistic_success
// } = createHttpAction('getPOItemTotalStatistic', Interface.getPOItemTotalStatistic)
