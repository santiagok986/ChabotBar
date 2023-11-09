import {configureStore} from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import counterSlice from './counterSlice'
import cartSlice from './cartSlice'
import authSlice from './authSlice'
import thunk from 'redux-thunk'

const configReducer = {
    key:"beer-market",
    storage
}

const reducers = combineReducers({
    counter:counterSlice, 
    cart:cartSlice,
    auth:authSlice
})

const persitedReducer = persistReducer(configReducer, reducers)


const store = configureStore({
    reducer:persitedReducer,
    middleware:[thunk]
})


export default store
