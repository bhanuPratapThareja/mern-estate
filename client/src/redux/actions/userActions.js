import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const signInUser = createAsyncThunk('user/signin', async user => {
    const response = await axios.post('/api/auth/signin', user)
    return response.data
})

export const updateUser = createAsyncThunk('user/update', async (userData) => {
    const { id, formData } = userData
    const response = await axios.post(`/api/user/update/${id}`, formData)
    return response.data
})