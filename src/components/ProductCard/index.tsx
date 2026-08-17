import { useState } from 'react'
import type { Product } from '../../types/restaurant'
import ProductModal from '../ProductModal'
import { Card, CardButton, CardImage, Description, Title } from './styles'

type Props = {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Card>
        <CardImage src={product.foto} alt={product.nome} />
        <Title>{product.nome}</Title>
        <Description>{product.descricao}</Description>
        <CardButton type="button" onClick={() => setShowModal(true)}>
          Mais detalhes
        </CardButton>
      </Card>

      {showModal && (
        <ProductModal product={product} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}

export default ProductCard
