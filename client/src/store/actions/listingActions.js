import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios-instance";

export const createListing = createAsyncThunk('listing/create', async ({ listing, mode }, { rejectWithValue }) => {
    const url = mode === 'create' ? '/api/listing/create' : '/api/listing/update/' + listing.id
    const method = mode === 'create' ? 'POST': 'PUT'

    if(!listing.offer) {
        listing.discountPrice = 0
    }

    try {
        const response = await axiosInstance(url, {
            method: method,
            data: listing
        })
        return response.data   
    } catch (error) {
        throw rejectWithValue(error)
    }
})

export const fetchListings = createAsyncThunk('listings/fetch', async userId => {
    console.log('userID: ', userId)
    const response = await axiosInstance.get('/api/user/listings/' + userId)
    console.log('response.data: ', response.data)
    return response.data
})

export const deleteListing = createAsyncThunk('listing/delete', async (listingId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete('/api/listing/delete/' + listingId)
        return response.data
    } catch (error) {
        throw rejectWithValue(error)
    }
})

export const getListing = createAsyncThunk('listing/get', async listingId => {
    const response = await axiosInstance.get('/api/listing/fetch/' + listingId)
    return response.data
})

export const searchListings = createAsyncThunk('listings/search', async searchQuery => {
    const response = await axiosInstance.get('/api/listing/search?' + searchQuery)
    return response.data
})

export const showListings = createAction('listings/show')