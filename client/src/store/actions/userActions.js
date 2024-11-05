import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from 'axios'

export const authUser = createAsyncThunk('user/auth', async ({ user, mode }) => {
    const response = await axios.post(`/api/auth/${mode}`, user)
    return response.data
})

export const updateUser = createAsyncThunk('user/update', async (userData) => {
    const { id, data } = userData
    for(let key in data) {
        if(!data[key]) {
            delete data[key]
        }
    }
    const response = await axios.patch(`/api/user/update/${id}`, data)
    return response.data
})

export const deleteUser = createAsyncThunk('user/delete', async ({ userId, mode }) => {
    console.log( userId, mode)
    return await axios.delete(`/api/user/delete/${userId}`)
})

export const signoutUser = createAsyncThunk('user/delete', async({ mode }) => {
    console.log(mode)
    return await axios.post('/api/auth/signout')
})

export const signout = createAction('user/signout')