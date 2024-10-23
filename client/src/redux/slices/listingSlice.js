import { createSlice } from "@reduxjs/toolkit";
import { createListing, fetchListings } from "../actions/listingActions";
import { signoutUser } from "../actions/userActions";
// import { signout } from "../actions/signoutActions";

const listingSlice = createSlice({
  name: "listing",
  initialState: {
    listings: [],
    creating: false,
    loading: false,
    error: null,
    fetchError: null
  },
  extraReducers(builder) {
    builder

      .addCase(createListing.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.creating = false;
        state.listings.push(action.payload.listing);
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

    //   .addCase(signout, (state, action) => {
    //     state.listings = [];
    //     state.creating = false;
    //     state.error = null;
    //   });

      .addCase(signoutUser.fulfilled, (state) => {
          console.log('signoutUser state: ', state)
          state.listings = [];
          state.creating = false;
          state.error = null;
      })
  },
});

export default listingSlice.reducer;
