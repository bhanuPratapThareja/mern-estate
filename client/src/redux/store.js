import { configureStore } from '@reduxjs/toolkit'

import userReducer from './slices/userSlice'
import { userSliceActions } from './slices/userSlice'

export const store = configureStore({
    reducer: {
        user: userReducer
    }
})

export { userSliceActions }