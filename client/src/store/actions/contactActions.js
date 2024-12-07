import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const getContact = createAsyncThunk('/contact/get', async userRef => {
    const response = await axios.get('/api/user/' + userRef)
    console.log('response: ', response)
    return response.data
})