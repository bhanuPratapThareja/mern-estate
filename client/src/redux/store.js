import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './slices/userSlice'
import { userSliceActions } from './slices/userSlice'

import listingReducer from './slices/listingSlice'

const rootReducer = combineReducers({
    user: userReducer,
    listings: listingReducer
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

export const persistor = persistStore(store)