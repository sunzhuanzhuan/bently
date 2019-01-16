const webpack = require('webpack')
const library = '[name]_lib'
const path = require('path')

module.exports = {
	resolve: {
		alias: {
			'@': path.join(__dirname, 'src')
		}
	}

}
