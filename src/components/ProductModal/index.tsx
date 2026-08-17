import type { MouseEvent } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { add, openCart } from '../../store/reducers/cart'
import type { Product } from '../../types/restaurant'
import {
  AddButton,
  CloseButton,
  ModalBox,
  ModalContent,
  ModalImage,
  Overlay
} from './styles'

type Props = {
  product: Product
  onClose: () => void
}

const formatPrice = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)

const ProductModal = ({ product, onClose }: Props) => {
  const dispatch = useAppDispatch()

  const stopPropagation = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  const addToCart = () => {
    dispatch(add(product))
    onClose()
    dispatch(openCart())
  }

  return (
    <Overlay onClick={onClose} role="presentation">
      <ModalBox
        onClick={stopPropagation}
        role="dialog"
        aria-modal="true"
        aria-label={product.nome}
      >
        <CloseButton onClick={onClose} aria-label="Fechar modal">
          ×
        </CloseButton>

        <ModalContent>
          <ModalImage src={product.foto} alt={product.nome} />

          <div>
            <h2>{product.nome}</h2>
            <p>{product.descricao}</p>
            <p>Serve: {product.porcao}</p>

            <AddButton type="button" onClick={addToCart}>
              Adicionar ao carrinho - {formatPrice(product.preco)}
            </AddButton>
          </div>
        </ModalContent>
      </ModalBox>
    </Overlay>
  )
}

export default ProductModal
