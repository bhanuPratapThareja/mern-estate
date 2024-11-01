import { createSlice } from "@reduxjs/toolkit";
import { createListing, deleteListing, fetchListings, getListing, showListings, searchListings } from "../actions/listingActions";
import { signoutUser } from "../actions/userActions";

const listingSlice = createSlice({
  name: "listing",
  initialState: {
    listings: [],
    searchedListings: [],
    searchedListingsLength: 0,
    creating: false,
    loading: false,
    error: null,
    fetchError: null,
    show: false,
    selectedListing: null
  },
  reducers: {
    resetSerchedListings(state) {
      state.searchedListings = []
    }
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

      .addCase(getListing.pending, (state) => {
        state.loading = true
        state.error = null
        state.selectedListing = null
      })
      .addCase(getListing.fulfilled, (state, action) => {
        state.loading = false
        state.selectedListing = action.payload
      })
      .addCase(getListing.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
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

      // searchmlistings
      .addCase(searchListings.pending, (state) => {
          state.loading = true
          state.error = null
      })
      .addCase(searchListings.fulfilled, (state, action) => {
        state.loading = false
        state.searchedListingsLength = action.payload.length
        const combinedListings = [ ...state.searchedListings, ...action.payload ]
        const listingsObject = combinedListings.map(JSON.stringify)
        const uniqueListings = Array.from(new Set(listingsObject)).map(JSON.parse)
        state.searchedListings = uniqueListings
      })
      .addCase(searchListings.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })

      .addCase(signoutUser.fulfilled, (state) => {
          console.log('signoutUser state: ', state)
          state.listings = [];
          state.creating = false;
          state.error = null;
      })
  },
});

export const listingSliceActions = listingSlice.actions
export default listingSlice.reducer;
