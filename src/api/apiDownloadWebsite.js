import { saveAs } from 'file-saver'
import axios from 'axios'
const Cookie = require('js-cookie');

import { message } from 'antd'

const apiDownload = (opts, filename = 'file') => {
	opts.baseURL = '/api'
	opts.responseType = 'blob'
	opts.headers = { "X-Access-Token": Cookie.get('token') || '' }
	axios(opts).then(res => {
		if (res.data.type === "application/json") {
			message.error("数量过多，请选择筛选条件过滤部分数据");
		} else {
			let blob = new Blob([res.data]);
			saveAs(blob, filename)
		}
	})

}
export default apiDownload
