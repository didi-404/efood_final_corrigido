import type { Restaurant } from '../types/restaurant'

const API_URL = 'https://api-ebac.vercel.app/api/efood/restaurantes'

export async function getRestaurants(): Promise<Restaurant[]> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Não foi possível carregar os restaurantes.')
  }

  return response.json() as Promise<Restaurant[]>
}

export async function getRestaurantById(
  id: number
): Promise<Restaurant | undefined> {
  const restaurants = await getRestaurants()
  return restaurants.find((restaurant) => restaurant.id === id)
}
