import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { openCart } from '../../store/reducers/cart'
import {
  Brand,
  CartButton,
  HeaderBar,
  HeaderContent,
  HeaderText
} from './styles'

type Props = {
  compact?: boolean
}

const Header = ({ compact = false }: Props) => {
  const dispatch = useAppDispatch()
  const itemCount = useAppSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  )

  return (
    <HeaderBar $compact={compact}>
      <HeaderContent $compact={compact}>
        {compact ? <Link to="/">Restaurantes</Link> : <span />}

        <Brand to="/">efood</Brand>

        {compact ? (
          <CartButton type="button" onClick={() => dispatch(openCart())}>
            {itemCount} produto{itemCount === 1 ? '' : 's'} no carrinho
          </CartButton>
        ) : (
          <span />
        )}

        {!compact && (
          <HeaderText>
            Viva experiências gastronômicas
            <br />
            no conforto da sua casa
          </HeaderText>
        )}
      </HeaderContent>
    </HeaderBar>
  )
}

export default Header
