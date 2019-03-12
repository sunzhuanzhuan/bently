import { combineReducers } from 'redux'
import * as cooperationPlatform from './cooperationPlatform'
import * as agent from './agent'

export default combineReducers({
	...cooperationPlatform,
	...agent,
})
