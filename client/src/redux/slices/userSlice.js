import { createSlice } from "@reduxjs/toolkit";

import { signInUser } from "../actions/userActions";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        error: null,
        loading: false
    },
    reducers: {
        addSignedInUser(state, action) {
            state.currentUser = action.payload.user
        },
        removeUserState(state) {
            console.log('remove user state')
            state.currentUser = null
            console.log('new state: ', state)
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
                state.currentUser = action.payload.user
            })
            .addCase(signInUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
    }
})

export const userSliceActions = userSlice.actions
export default userSlice.reducer