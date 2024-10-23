import { createSlice } from "@reduxjs/toolkit";

import { signInUser, updateUser, deleteUser } from "../actions/userActions";
import { signout } from "../actions/signoutActions";

const userSlice = createSlice({
    name: 'user',
    initialState: {
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