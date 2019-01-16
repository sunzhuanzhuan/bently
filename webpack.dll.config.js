const webpack = require('webpack')
const library = '[name]_lib'
const path = require('path')

module.exports = {
	entry: {
		vendors: [
			'react',
			'react-dom',
			'react-router-dom',
			'redux',
			'redux-actions',
			'react-redux',
			'react-router-redux',
			'babel-polyfill',
			'react-dnd',
			'react-dnd-html5-backend',
			'lodash',
			'axios',
			'numeral'
		],
		antd310:[
			'moment',
			'antd',
		],
		sensor: ['sa-sdk-javascript'],
		// wbyui: ['wbyui']

	},

	output: {
		filename: '[name].[chunkhash:8].js',
		path: path.resolve('public/static/js/'),
		library,
		libraryTarget:'window'
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new webpack.DllPlugin({
			context: path.join(__dirname, 'public'),
			path: path.join(__dirname, 'public/[name]-manifest.json'),
			// This must match the output.library option above
			name: library
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				comparisons: false
			},
			mangle: {
				safari10: true
			},
			output: {
				comments: false,
				ascii_only: true
			}
		})
	]
}
