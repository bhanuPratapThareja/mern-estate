import { createSlice } from "@reduxjs/toolkit";

import { getContact } from '../actions/contactActions'

const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        data: null,
        loading: false,
        error: false
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getContact.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(getContact.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.user
            })
            .addCase(getContact.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
    }
})

export default contactSlice.reducer