import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/Header'
import ProductCard from '../../components/ProductCard'
import { getRestaurantById } from '../../services/api'
import type { Restaurant } from '../../types/restaurant'
import {
  Hero,
  HeroContent,
  HeroOverlay,
  Loading,
  MenuGrid,
  MenuSection,
  NotFound
} from './styles'

const Profile = () => {
  const { id } = useParams()
  const [restaurant, setRestaurant] = useState<Restaurant>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRestaurantById(Number(id))
      .then(setRestaurant)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <>
        <Header compact />
        <Loading>Carregando restaurante...</Loading>
      </>
    )
  }

  if (!restaurant) {
    return (
      <>
        <Header compact />
        <NotFound>Restaurante não encontrado.</NotFound>
      </>
    )
  }

  return (
    <>
      <Header compact />

      <Hero $background={restaurant.capa}>
        <HeroOverlay />
        <HeroContent>
          <span>{restaurant.tipo}</span>
          <h1>{restaurant.titulo}</h1>
        </HeroContent>
      </Hero>

      <MenuSection>
        <MenuGrid>
          {restaurant.cardapio.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </MenuGrid>
      </MenuSection>
    </>
  )
}

export default Profile
