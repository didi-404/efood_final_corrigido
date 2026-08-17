import type { Restaurant } from '../../types/restaurant'
import {
  Card,
  CardBody,
  CardImage,
  CardTitle,
  Description,
  Info,
  Rating,
  Tags,
  ViewButton
} from './styles'

type Props = {
  restaurant: Restaurant
}

const RestaurantCard = ({ restaurant }: Props) => (
  <Card>
    <div>
      <CardImage src={restaurant.capa} alt={restaurant.titulo} />
      <Tags>
        {restaurant.destacado && <span>Destaque da semana</span>}
        <span>{restaurant.tipo}</span>
      </Tags>
    </div>

    <CardBody>
      <Info>
        <CardTitle>{restaurant.titulo}</CardTitle>
        <Rating>
          {restaurant.avaliacao.toFixed(1)} <span>★</span>
        </Rating>
      </Info>

      <Description>{restaurant.descricao}</Description>

      <ViewButton to={`/restaurante/${restaurant.id}`}>Saiba mais</ViewButton>
    </CardBody>
  </Card>
)

export default RestaurantCard
