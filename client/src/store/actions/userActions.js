import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

import axios from "axios";
import { invalidateTokenCookie } from "../../utils/cookies";

import { pauseFn } from '../../utils/pause'

export const authUser = createAsyncThunk('user/auth', async ({ user, mode }, { rejectWithValue }) => {
    await pauseFn(3000)
    try {
        const response = await axios.post(`/api/auth/${mode}`, user)
        return response.data
    } catch (error) {
        throw rejectWithValue(error)
    }
})

export const updateUser = createAsyncThunk('user/update', async (userData, { rejectWithValue }) => {
    const { id, data } = userData
    for(let key in data) {
        if(!data[key]) {
            delete data[key]
        }
    }

    try {
        const response = await axios.patch(`/api/user/update/${id}`, data)
        return response.data   
    } catch (error) {
        throw rejectWithValue(error)
    }
})

export const deleteUser = createAsyncThunk('user/delete', async ({ userId, mode }) => {
    return await axios.delete(`/api/user/delete/${userId}`)
})

export const signoutUser = createAsyncThunk('user/delete', async () => {
    return await axios.post('/api/auth/signout')
})

export const signout = createAction('user/signout', () => {
    console.log('cookie invaidation in progress')
    invalidateTokenCookie()
    return { user: null }
})