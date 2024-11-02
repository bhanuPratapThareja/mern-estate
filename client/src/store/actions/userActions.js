import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from 'axios'

export const signUpUser = createAsyncThunk('user/signup', async user => {
    const response = await axios.post('/api/auth/signup', user)
    return response.data
})

export const signInUser = createAsyncThunk('user/signin', async user => {
    const response = await axios.post('/api/auth/signin', user)
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

export const deleteUser = createAsyncThunk('user/delete', async id => {
    return await axios.delete(`/api/user/delete/${id}`)
})

export const signoutUser = createAsyncThunk('user/delete', async() => {
    return await axios.post('/api/auth/signout')
})

export const signout = createAction('user/signout')