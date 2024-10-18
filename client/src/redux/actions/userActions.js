import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const signInUser = createAsyncThunk('user/signin', async user => {
    const response = await axios.post('/api/auth/signin', user)
    return response.data
})