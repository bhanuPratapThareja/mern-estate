import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../utils/axios-instance";

export const getContact = createAsyncThunk('/contact/get', async userRef => {
    const response = await axiosInstance.get('/api/user/' + userRef)
    return response.data
})