import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './reducers/cart'
import { checkoutApi } from '../services/checkoutApi'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [checkoutApi.reducerPath]: checkoutApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(checkoutApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
