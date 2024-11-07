import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './slices/userSlice'
import listingReducer from './slices/listingSlice'
import toastReducer from './slices/toastSlice'
import modalReducer from './slices/modalSlice'

import { userSliceActions } from '../store/slices/userSlice'
import { listingSliceActions } from './slices/listingSlice'
import { toastSliceActions } from './slices/toastSlice'
import { modalSliceActions } from './slices/modalSlice'

import contactReducer from './slices/contactSlice'

const rootReducer = combineReducers({
    user: userReducer,
    listings: listingReducer,
    contact: contactReducer,
    toast: toastReducer,
    modal: modalReducer
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export { 
    userSliceActions, 
    listingSliceActions, 
    toastSliceActions,
    modalSliceActions
}
export * from './actions/userActions'
export * from './actions/listingActions'
export * from './actions/contactActions'
export * from './actions/modalActions'
export const persistor = persistStore(store)