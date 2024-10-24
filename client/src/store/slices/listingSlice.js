import { createSlice } from "@reduxjs/toolkit";
import { createListing, deleteListing, fetchListings, showListings } from "../actions/listingActions";
import { signoutUser } from "../actions/userActions";

const listingSlice = createSlice({
  name: "listing",
  initialState: {
    listings: [],
    creating: false,
    loading: false,
    error: null,
    fetchError: null,
    show: false
  },
  extraReducers(builder) {
    builder
      .addCase(createListing.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.creating = false;
        if(action.meta.arg.mode === 'create') {
          state.listings.push(action.payload.listing);
        }
        if(action.meta.arg.mode === 'edit') {
          const index = state.listings.findIndex(listing => {
            return listing.id === action.meta.arg.listing.id
          })
          state.listings[index] = action.payload.listing
        }
      })
      .addCase(createListing.rejected, (state, action) => {
        console.log(action.error);
        state.creating = false;
        state.error = action.error;
      })

      // get listings
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
        state.fetchError = null;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload
      })
      .addCase(fetchListings.rejected, (state, action) => {
        console.log(action.error);
        state.loading = false;
        state.fetchError = action.error;
      })

      .addCase(showListings, (state, action) => {
        state.show = action.payload
      })

    //   .addCase(signout, (state, action) => {
    //     state.listings = [];
    //     state.creating = false;
    //     state.error = null;
    //   });

      .addCase(deleteListing.fulfilled, (state, action) => {
        state.listings = state.listings.filter(listing => listing.id !== action.meta.arg)
      })

      .addCase(signoutUser.fulfilled, (state) => {
          console.log('signoutUser state: ', state)
          state.listings = [];
          state.creating = false;
          state.error = null;
      })
  },
});

export default listingSlice.reducer;
