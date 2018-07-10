import { combineReducers, createStore } from 'redux'
import reducer, { Data } from './reducer'

const app = combineReducers({
  reducer
})

const data: Data = { node: [], edge: [] };
const store = createStore(app, data)

export default store;