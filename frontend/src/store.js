import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { userLoginReducer, userRegisterReducer } from './reducers/user.reducer'

const reducer = combineReducers({
  userLoginReducer, userRegisterReducer
})

export const store = createStore(reducer, applyMiddleware(thunk))