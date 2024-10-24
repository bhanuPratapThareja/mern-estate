import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from 'axios'

export const createListing = createAsyncThunk('listing/create', async listing => {
    if(!listing.imageUrls.length) {
        throw new Error('You must upload atleast one image')
    }
    if(listing.regularPrice < listing.discountPrice) {
        throw new Error('Discount price must be lower than regular price')
    }
    const response = await axios.post('/api/listing/create', listing)
    return response.data
})

export const fetchListings = createAsyncThunk('listings/fetch', async id => {
    const response = await axios.get('/api/user/listings/' + id)
    return response.data
})

export const deleteListing = createAsyncThunk('listing/delete', async id => {
    const response = await axios.delete('/api/listing/delete/' + id)
    return response.data
})

export const showListings = createAction('listings/show')