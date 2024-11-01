import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './slices/userSlice'
import { userSliceActions } from '../store/slices/userSlice'

import listingReducer from './slices/listingSlice'
import { listingSliceActions } from './slices/listingSlice'

import contactReducer from './slices/contactSlice'

const rootReducer = combineReducers({
    user: userReducer,
    listings: listingReducer,
    contact: contactReducer
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

export { userSliceActions }
export { listingSliceActions }
export * from './actions/userActions'
export * from './actions/listingActions'
export * from './actions/contactActions'
export const persistor = persistStore(store)