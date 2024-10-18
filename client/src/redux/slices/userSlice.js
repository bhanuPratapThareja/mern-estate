import { createSlice } from "@reduxjs/toolkit";

import { signInUser } from "../actions/userActions";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        error: null,
        loading: false
    },
    reducers: {
        addSignedInUser(state, action) {
            state.user = action.payload.user
        }
    },
    extraReducers(builder) {
        builder
            .addCase(signInUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signInUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
            })
            .addCase(signInUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
    }
})

export const userSliceActions = userSlice.actions
export default userSlice.reducer