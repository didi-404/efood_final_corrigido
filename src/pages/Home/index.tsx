import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import RestaurantCard from '../../components/RestaurantCard'
import { getRestaurants } from '../../services/api'
import type { Restaurant } from '../../types/restaurant'
import { ErrorMessage, Grid, LoadingMessage, Main } from './styles'

const Home = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getRestaurants()
      .then(setRestaurants)
      .catch(() => setError('Não foi possível carregar os restaurantes.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Header />

      <Main>
        {loading && <LoadingMessage>Carregando restaurantes...</LoadingMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {!loading && !error && (
          <Grid>
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </Grid>
        )}
      </Main>
    </>
  )
}

export default Home
