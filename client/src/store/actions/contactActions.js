import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const getContact = createAsyncThunk('/contact/get', async userRef => {
    const response = await axios.get('/api/user/' + userRef)
    return response.data
})