import { createSlice } from "@reduxjs/toolkit";

import { updateUser, deleteUser, authUser } from "../actions/userActions";
import { signout } from "../actions/userActions";
import { SIGN_UP, DELETE, SIGN_IN, SUCCESS } from '../../utils/types'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        signedUpUser: { email: '' },
        currentUser: null,
        error: null,
        loading: false,
        updating: false,
    },
    reducers: {
        addSignedInUser(state, action) {
            state.currentUser = action.payload.user
            state.signedUpUser.email = action.payload.user.email
            state.error = null
        },
        removeUserState(state) {
            state.currentUser = null
        }
    },
    extraReducers(builder) {
        builder

            // auth
            .addCase(authUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(authUser.fulfilled, (state, action) => {
                state.loading = false
                state.currentUser = action.payload.user
                if(action.meta.arg.mode === SIGN_IN) {
                    state.signedUpUser = { email: action.payload.user.email }
                }
                if(action.meta.arg.mode === SIGN_UP) {
                    state.signedUpUser = { email: action.meta.arg.user.email }
                }
            })
            .addCase(authUser.rejected, (state, action) => {
                console.log('action: ', action)
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
                if(action.meta.arg.mode === DELETE) {
                    state.signedUpUser = null
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })

            // signout
            .addCase(signout, (state, action) => {
                console.log('signing out from action after invalidating cookie')
                state.currentUser = null
                state.error = null
            })
    }
})

export const userSliceActions = userSlice.actions
export default userSlice.reducer