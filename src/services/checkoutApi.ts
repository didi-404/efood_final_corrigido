import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type CheckoutPayload = {
  products: Array<{
    id: number
    price: number
  }>
  delivery: {
    receiver: string
    address: {
      description: string
      city: string
      zipCode: string
      number: number
      complement: string
    }
  }
  payment: {
    card: {
      name: string
      number: string
      code: number
      expires: {
        month: number
        year: number
      }
    }
  }
}

export type CheckoutResponse = {
  orderId: string
}

export const checkoutApi = createApi({
  reducerPath: 'checkoutApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-ebac.vercel.app/api/efood/'
  }),
  endpoints: (builder) => ({
    purchase: builder.mutation<CheckoutResponse, CheckoutPayload>({
      query: (body) => ({
        url: 'checkout',
        method: 'POST',
        body
      })
    })
  })
})

export const { usePurchaseMutation } = checkoutApi
