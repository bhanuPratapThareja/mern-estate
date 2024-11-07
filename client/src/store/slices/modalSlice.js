import { createSlice } from '@reduxjs/toolkit'

import { onCancel, onConfirm } from '../actions/modalActions'

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        show: false,
        header: '',
        body: '',
        confirm: false
    },
    reducers: {
        showModal: (state, action) => {
            state.show = true
            state.header = action.payload.header
            state.body = action.payload.body
        },
        hideModal: (state) => {
            state.show = false
            state.header = ''
            state.body = ''
        }
    },
    extraReducers(builder) {
        builder.addCase(onConfirm, (state) => {
            state.confirm = true
        })
        builder.addCase(onCancel, (state) => {
            state.confirm = false
        })
    }
})

export const modalSliceActions = modalSlice.actions
export default modalSlice.reducer