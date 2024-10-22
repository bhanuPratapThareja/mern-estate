import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const signInUser = createAsyncThunk('user/signin', async user => {
    const response = await axios.post('/api/auth/signin', user)
    return response.data
})

export const updateUser = createAsyncThunk('user/update', async (userData) => {
    const { id, formData } = userData
    for(let key in formData) {
        if(!formData[key]) {
            delete formData[key]
        }
    }
    const response = await axios.patch(`/api/user/update/${id}`, formData)
    return response.data
})

export const deleteUser = createAsyncThunk('user/delete', async id => {
    return await axios.delete(`/api/user/delete/${id}`)
})

export const signoutUser = createAsyncThunk('user/delete', async() => {
    return await axios.post('/api/auth/signout')
})