import { createSlice } from "@reduxjs/toolkit";

import { signUpUser, signInUser, updateUser, deleteUser } from "../actions/userActions";
import { signout } from "../actions/userActions";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        signedUpUser: null,
        currentUser: null,
        error: null,
        loading: false,
        updating: false
    },
    reducers: {
        addSignedInUser(state, action) {
            state.currentUser = action.payload.user
            state.error = null
        },
        removeUserState(state) {
            state.currentUser = null
        }
    },
    extraReducers(builder) {
        builder
            // signup
            .addCase(signUpUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.loading = false
                state.signedUpUser = { email: action.meta.arg.email }
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })

            // singin
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

            // update
            .addCase(updateUser.pending, (state) => {
                state.updating = true
                state.error = null
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.updating = false
                state.currentUser = action.payload.user
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.updating = false
                state.error = action.error
            })

            // delete
            .addCase(deleteUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false
                state.currentUser = null
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })

            // signout
            .addCase(signout, (state, action) => {
                console.log('state:: ', state)
                console.log('action::: ', action)
                // state.currentUser = null
                // state.error = null
            })
    }
})

export const userSliceActions = userSlice.actions
export default userSlice.reducer