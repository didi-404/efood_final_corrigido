import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { usePurchaseMutation } from '../../services/checkoutApi'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { clear, closeCart, remove } from '../../store/reducers/cart'
import {
  ApiError,
  CartContainer,
  CartImage,
  CartInfo,
  CartItem,
  CartList,
  CloseButton,
  Confirmation,
  EmptyMessage,
  EqualFieldsRow,
  ErrorText,
  Field,
  FieldsRow,
  Form,
  FormActions,
  FormTitle,
  MainButton,
  Overlay,
  Sidebar,
  Total,
  TrashButton
} from './styles'

type Step = 'cart' | 'delivery' | 'payment' | 'confirmation'

type DeliveryForm = {
  receiver: string
  description: string
  city: string
  zipCode: string
  number: string
  complement: string
}

type PaymentForm = {
  name: string
  number: string
  code: string
  month: string
  year: string
}

type FormErrors = Record<string, string>

const onlyNumbers = (value: string) => value.replace(/\D/g, '')

const formatPrice = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)

const CartSidebar = () => {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)
  const isOpen = useAppSelector((state) => state.cart.isOpen)
  const [purchase, { isLoading, isError }] = usePurchaseMutation()
  const [step, setStep] = useState<Step>('cart')
  const [errors, setErrors] = useState<FormErrors>({})
  const [orderId, setOrderId] = useState('')
  const [orderTotal, setOrderTotal] = useState(0)

  const [delivery, setDelivery] = useState<DeliveryForm>({
    receiver: '',
    description: '',
    city: '',
    zipCode: '',
    number: '',
    complement: ''
  })

  const [payment, setPayment] = useState<PaymentForm>({
    name: '',
    number: '',
    code: '',
    month: '',
    year: ''
  })

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.preco * item.quantity, 0),
    [items]
  )

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      setErrors({})
    }
  }, [isOpen])

  const resetForms = () => {
    setDelivery({
      receiver: '',
      description: '',
      city: '',
      zipCode: '',
      number: '',
      complement: ''
    })
    setPayment({
      name: '',
      number: '',
      code: '',
      month: '',
      year: ''
    })
    setErrors({})
    setOrderId('')
    setOrderTotal(0)
  }

  const handleClose = () => {
    dispatch(closeCart())
    setStep('cart')
    setErrors({})
  }

  const validateDelivery = () => {
    const nextErrors: FormErrors = {}

    if (!delivery.receiver.trim()) nextErrors.receiver = 'Informe quem irá receber.'
    if (!delivery.description.trim()) nextErrors.description = 'Informe o endereço.'
    if (!delivery.city.trim()) nextErrors.city = 'Informe a cidade.'
    if (onlyNumbers(delivery.zipCode).length !== 8)
      nextErrors.zipCode = 'Informe um CEP com 8 números.'
    if (!delivery.number || Number(delivery.number) <= 0)
      nextErrors.deliveryNumber = 'Informe o número.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const validatePayment = () => {
    const nextErrors: FormErrors = {}
    const cardNumber = onlyNumbers(payment.number)
    const currentYear = new Date().getFullYear()

    if (!payment.name.trim()) nextErrors.cardName = 'Informe o nome no cartão.'
    if (cardNumber.length < 13 || cardNumber.length > 19)
      nextErrors.cardNumber = 'Informe um cartão válido.'
    if (onlyNumbers(payment.code).length < 3) nextErrors.code = 'Informe o CVV.'
    if (Number(payment.month) < 1 || Number(payment.month) > 12)
      nextErrors.month = 'Mês inválido.'
    if (Number(payment.year) < currentYear) nextErrors.year = 'Ano inválido.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleDeliverySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (validateDelivery()) {
      setErrors({})
      setStep('payment')
    }
  }

  const handlePaymentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validatePayment()) return

    const products = items.flatMap((item) =>
      Array.from({ length: item.quantity }, () => ({
        id: item.id,
        price: item.preco
      }))
    )

    try {
      const response = await purchase({
        products,
        delivery: {
          receiver: delivery.receiver.trim(),
          address: {
            description: delivery.description.trim(),
            city: delivery.city.trim(),
            zipCode: onlyNumbers(delivery.zipCode),
            number: Number(delivery.number),
            complement: delivery.complement.trim()
          }
        },
        payment: {
          card: {
            name: payment.name.trim(),
            number: onlyNumbers(payment.number),
            code: Number(onlyNumbers(payment.code)),
            expires: {
              month: Number(payment.month),
              year: Number(payment.year)
            }
          }
        }
      }).unwrap()

      setOrderId(response.orderId)
      setOrderTotal(total)
      dispatch(clear())
      setStep('confirmation')
    } catch {
      // O RTK Query atualiza isError.
    }
  }

  const finishOrder = () => {
    resetForms()
    setStep('cart')
    dispatch(closeCart())
  }

  return (
    <CartContainer $isOpen={isOpen}>
      <Overlay onClick={handleClose} />

      <Sidebar role="dialog" aria-modal="true" aria-label="Carrinho e checkout">
        <CloseButton type="button" onClick={handleClose} aria-label="Fechar carrinho">
          ×
        </CloseButton>

        {step === 'cart' && (
          <>
            {items.length === 0 ? (
              <EmptyMessage>
                Seu carrinho está vazio. Escolha um prato para continuar.
              </EmptyMessage>
            ) : (
              <>
                <CartList>
                  {items.map((item) => (
                    <CartItem key={item.id}>
                      <CartImage src={item.foto} alt={item.nome} />

                      <CartInfo>
                        <h3>{item.quantity > 1 ? `${item.quantity}x ` : ''}{item.nome}</h3>
                        <span>{formatPrice(item.preco * item.quantity)}</span>
                        {item.quantity > 1 && (
                          <small>{formatPrice(item.preco)} cada</small>
                        )}
                      </CartInfo>

                      <TrashButton
                        type="button"
                        onClick={() => dispatch(remove(item.id))}
                        aria-label={`Remover ${item.nome} do carrinho`}
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M9 3h6l1 2h4v2H4V5h4l1-2Zm-3 6h12l-1 12H7L6 9Zm3 2v8h2v-8H9Zm4 0v8h2v-8h-2Z" />
                        </svg>
                      </TrashButton>
                    </CartItem>
                  ))}
                </CartList>

                <Total>
                  <span>Valor total</span>
                  <span>{formatPrice(total)}</span>
                </Total>

                <MainButton type="button" onClick={() => setStep('delivery')}>
                  Continuar com a entrega
                </MainButton>
              </>
            )}
          </>
        )}

        {step === 'delivery' && (
          <Form onSubmit={handleDeliverySubmit} noValidate>
            <FormTitle>Entrega</FormTitle>

            <Field>
              Quem irá receber
              <input
                value={delivery.receiver}
                onChange={(event) => setDelivery({ ...delivery, receiver: event.target.value })}
                autoComplete="name"
              />
              <ErrorText>{errors.receiver}</ErrorText>
            </Field>

            <Field>
              Endereço
              <input
                value={delivery.description}
                onChange={(event) => setDelivery({ ...delivery, description: event.target.value })}
                autoComplete="street-address"
              />
              <ErrorText>{errors.description}</ErrorText>
            </Field>

            <Field>
              Cidade
              <input
                value={delivery.city}
                onChange={(event) => setDelivery({ ...delivery, city: event.target.value })}
                autoComplete="address-level2"
              />
              <ErrorText>{errors.city}</ErrorText>
            </Field>

            <FieldsRow>
              <Field>
                CEP
                <input
                  value={delivery.zipCode}
                  maxLength={9}
                  inputMode="numeric"
                  onChange={(event) => setDelivery({ ...delivery, zipCode: event.target.value })}
                  autoComplete="postal-code"
                />
                <ErrorText>{errors.zipCode}</ErrorText>
              </Field>

              <Field>
                Número
                <input
                  value={delivery.number}
                  inputMode="numeric"
                  onChange={(event) => setDelivery({ ...delivery, number: onlyNumbers(event.target.value) })}
                />
                <ErrorText>{errors.deliveryNumber}</ErrorText>
              </Field>
            </FieldsRow>

            <Field>
              Complemento (opcional)
              <input
                value={delivery.complement}
                onChange={(event) => setDelivery({ ...delivery, complement: event.target.value })}
              />
              <ErrorText />
            </Field>

            <FormActions>
              <MainButton type="submit">Continuar com o pagamento</MainButton>
              <MainButton type="button" onClick={() => setStep('cart')}>
                Voltar para o carrinho
              </MainButton>
            </FormActions>
          </Form>
        )}

        {step === 'payment' && (
          <Form onSubmit={handlePaymentSubmit} noValidate>
            <FormTitle>Pagamento - Valor a pagar {formatPrice(total)}</FormTitle>

            <Field>
              Nome no cartão
              <input
                value={payment.name}
                onChange={(event) => setPayment({ ...payment, name: event.target.value })}
                autoComplete="cc-name"
              />
              <ErrorText>{errors.cardName}</ErrorText>
            </Field>

            <FieldsRow>
              <Field>
                Número do cartão
                <input
                  value={payment.number}
                  inputMode="numeric"
                  maxLength={19}
                  onChange={(event) => setPayment({ ...payment, number: onlyNumbers(event.target.value) })}
                  autoComplete="cc-number"
                />
                <ErrorText>{errors.cardNumber}</ErrorText>
              </Field>

              <Field>
                CVV
                <input
                  value={payment.code}
                  inputMode="numeric"
                  maxLength={4}
                  onChange={(event) => setPayment({ ...payment, code: onlyNumbers(event.target.value) })}
                  autoComplete="cc-csc"
                />
                <ErrorText>{errors.code}</ErrorText>
              </Field>
            </FieldsRow>

            <EqualFieldsRow>
              <Field>
                Mês de vencimento
                <input
                  value={payment.month}
                  inputMode="numeric"
                  maxLength={2}
                  onChange={(event) => setPayment({ ...payment, month: onlyNumbers(event.target.value) })}
                  autoComplete="cc-exp-month"
                />
                <ErrorText>{errors.month}</ErrorText>
              </Field>

              <Field>
                Ano de vencimento
                <input
                  value={payment.year}
                  inputMode="numeric"
                  maxLength={4}
                  onChange={(event) => setPayment({ ...payment, year: onlyNumbers(event.target.value) })}
                  autoComplete="cc-exp-year"
                />
                <ErrorText>{errors.year}</ErrorText>
              </Field>
            </EqualFieldsRow>

            {isError && (
              <ApiError>
                Não foi possível concluir o pedido. Confira os dados e tente novamente.
              </ApiError>
            )}

            <FormActions>
              <MainButton type="submit" disabled={isLoading}>
                {isLoading ? 'Enviando pedido...' : 'Finalizar pagamento'}
              </MainButton>
              <MainButton type="button" onClick={() => setStep('delivery')}>
                Voltar para a edição de endereço
              </MainButton>
            </FormActions>
          </Form>
        )}

        {step === 'confirmation' && (
          <Confirmation>
            <h2>Pedido realizado - {orderId}</h2>

            <p>
              Estamos felizes em informar que seu pedido já está em processo de
              preparação e, em breve, será entregue no endereço fornecido.
            </p>

            <p>
              Gostaríamos de ressaltar que nossos entregadores não estão
              autorizados a realizar cobranças extras.
            </p>

            <p>
              Lembre-se da importância de higienizar as mãos após o recebimento
              do pedido, garantindo assim sua segurança e bem-estar durante a refeição.
            </p>

            <p>
              Esperamos que desfrute de uma deliciosa e agradável experiência
              gastronômica. Bom apetite!
            </p>

            <p>Valor confirmado: <strong>{formatPrice(orderTotal)}</strong></p>

            <MainButton type="button" onClick={finishOrder}>Concluir</MainButton>
          </Confirmation>
        )}
      </Sidebar>
    </CartContainer>
  )
}

export default CartSidebar
