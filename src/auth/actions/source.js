import api from '../../api/index'
import { GET_SOURCELIST, DELETE_SOURCE, GET_SOURCETYPE_LIST, ADD_SOURCE, UPDATE_SOURCE, GET_SOURCE_DETAIL, TRANS_SOURCE_PARAM } from "../constants/ActionTypes";
import qs from 'qs'
export const getSourceList = (params) => (dispatch) => {
	api.get('/rbac/getResourceList?' + qs.stringify(params))
		.then((response) => {
			dispatch({
				type: GET_SOURCELIST,
				payload: {
					sourceList: response.data
				}
			})
		})
}

export const deleteSource = (id) => (dispatch) => {
	api.get('/rbac/deleteResource?id=' + id).then(() => {
		dispatch({
			type: DELETE_SOURCE,
			payload: {
				id
			}
		})
	})
}

export const getSourceTypeList = () => (dispatch) => {
	api.get('/rbac/getResourceTypeList').then((response) => {
		const sourceTypeList = response.data.rows;
		dispatch({
			type: GET_SOURCETYPE_LIST,
			payload: {
				sourceTypeList
			}
		})
	})
}

export const addSource = (values) => (dispatch) => {
	return api.post('/rbac/addResource', { ...values }).then((response) => {
		const { data } = response;
		dispatch({
			type: ADD_SOURCE,
			payload: {
				data
			}
		})
		return response
	})
}

export const updateSource = (values) => (dispatch) => {
	return api.post('/rbac/updateResource', { ...values }).then((response) => {
		const { data } = response;
		dispatch({
			type: UPDATE_SOURCE,
			payload: {
				data
			}
		})
		return response
	})
}

export const getSourceDetail = (id) => (dispatch) => {
	return api.get('/rbac/getResource?id=' + id).then((response) => {
		const { data } = response;
		dispatch({
			type: GET_SOURCE_DETAIL,
			payload: {
				data
			}
		})
	})
}

export const getSourceParam = (param) => (dispatch) => {
	dispatch({
		type: TRANS_SOURCE_PARAM,
		payload: {
			param
		}
	})
}
