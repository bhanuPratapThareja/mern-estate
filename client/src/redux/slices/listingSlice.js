import { createSlice } from "@reduxjs/toolkit";
import { createListing } from "../actions/listingActions";
import { signout } from "../actions/signoutActions";
import { signoutUser } from "../actions/userActions";

const listingSlice = createSlice({
  name: "listing",
  initialState: {
    listings: [],
    creating: false,
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(createListing.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.creating = false;
        state.listings.push(action.payload);
      })
      .addCase(createListing.rejected, (state, action) => {
        console.log(action.error);
        state.creating = false;
        state.error = action.error;
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
