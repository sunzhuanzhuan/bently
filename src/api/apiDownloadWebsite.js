import { saveAs } from 'file-saver'
import axios from 'axios'
const Cookie = require('js-cookie');

import { message } from 'antd'

const apiDownload = (opts, filename = 'file') => {
	opts.baseURL = '/api'
	//opts.responseType = 'blob'
	opts.headers = { "X-Access-Token": Cookie.get('token') || '' }
	axios(opts).then(res => {
		if (res.data.code === '5000') {
			message.error(res.data.msg);
		} else {
			let blob = new Blob([res.data]);
			saveAs(blob, filename)
		}
	})

}
export default apiDownload
