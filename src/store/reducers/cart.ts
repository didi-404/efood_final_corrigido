import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '../../types/restaurant'

export type CartItem = Product & {
  quantity: number
}

type CartState = {
  items: CartItem[]
  isOpen: boolean
}

const initialState: CartState = {
  items: [],
  isOpen: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Product>) => {
      const item = state.items.find((product) => product.id === action.payload.id)

      if (item) {
        item.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((product) => product.id !== action.payload)
    },
    clear: (state) => {
      state.items = []
    },
    openCart: (state) => {
      state.isOpen = true
    },
    closeCart: (state) => {
      state.isOpen = false
    }
  }
})

export const { add, remove, clear, openCart, closeCart } = cartSlice.actions
export default cartSlice.reducer
