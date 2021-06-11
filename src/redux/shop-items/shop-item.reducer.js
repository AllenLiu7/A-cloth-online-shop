import { createSlice } from '@reduxjs/toolkit';

// const INITIAL_STATE = {
//   collections: null,
//   isFetching: false,
//   errorMessage: undefined,
// };

// const shopItemsReducer = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case shopItemActionTypes.FETCH_COLLECTIONS_START:
//       return {
//         ...state,
//         isFetching: true,
//       };
//     case shopItemActionTypes.FETCH_COLLECTIONS_SUCCESS:
//       return {
//         ...state,
//         isFetching: false,
//         collections: action.payload,
//       };
//     case shopItemActionTypes.FETCH_COLLECTIONS_FAILURE:
//       return {
//         ...state,
//         isFetching: false,
//         errorMessage: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default shopItemsReducer;

const shopItemSlice = createSlice({
  name: 'shopItem',
  initialState: {
    collections: null,
    isFetching: false,
    errorMessage: undefined,
  },
  reducers: {
    fetchCollections: (state) => ({ ...state, isFetching: true }),
    fetchCollectionsSuccess: (state, action) => ({
      ...state,
      isFetching: false,
      collections: action.payload,
    }),
    fetchCollectionsFailure: (state, action) => ({
      ...state,
      isFetching: false,
      errorMessage: action.payload,
    }),
  },
});

export const {
  fetchCollections,
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} = shopItemSlice.actions;
export default shopItemSlice.reducer;
