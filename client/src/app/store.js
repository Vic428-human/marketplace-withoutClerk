import { configureStore, Tuple } from '@reduxjs/toolkit'
import listingReducer from './feature/listingSlice'
import userAccountReducer from './feature/userAccountSlice'
const reducer = {
  listing: listingReducer,
  userAccount: userAccountReducer, 
}

export const store = configureStore({
  reducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
//   devTools: process.env.NODE_ENV !== 'production',
//   preloadedState,
//   enhancers: (getDefaultEnhancers) =>
//     getDefaultEnhancers({
//       autoBatch: false,
//     }).concat(batchedSubscribe(debounceNotify)),
})
