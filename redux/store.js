import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension' // eslint-disable-line
import logger from 'redux-logger' // eslint-disable-line


const isDev = process.env.NODE_ENV !== 'production'

export const defaultInitState = {
  user: null,
  users: [],
}

const usersReducer = (state = defaultInitState.users, action) => {
  switch (action.type) {
    case '@users/get/start':
    case '@users/get/error':
      return null

    case '@users/get/success':
      return action.payload
    default: return state
  }
}

const userReducer = (state = defaultInitState.user, action) => {
  switch (action.type) {
    case '@user/get/start':
    case '@user/get/error':
      return null

    case '@user/get/success':
      return action.payload
    default: return state
  }
}

const createRootReducer = initialState => combineReducers({
  users: usersReducer,
  user: userReducer,
}, initialState)
export const initializeStore = (initialState = defaultInitState) => createStore(
  createRootReducer(initialState),
  initialState,
  isDev
    ? composeWithDevTools(applyMiddleware(thunkMiddleware, logger))
    : applyMiddleware(thunkMiddleware),
)
