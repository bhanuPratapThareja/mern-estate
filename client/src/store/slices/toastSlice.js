import { createSlice } from '@reduxjs/toolkit'

const toastSlice = createSlice({
    name: 'toast',
    initialState: {
        show: false,
        type: '',
        header: '',
        body: ''
    },
    reducers: {
        showToast: (state, action) => {
            state.show = true
            state.type = action.payload.type
            state.header = action.payload.header
            state.body = action.payload.body
        },
        hideToast: (state, action) => {
            state.show = false
            state.type = ''
            state.header = ''
            state.body = ''
        },
    }
})

export const toastSliceActions = toastSlice.actions
export default toastSlice.reducer