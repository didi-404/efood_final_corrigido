import { Brand, FooterContainer, Socials } from './styles'

const Footer = () => (
  <FooterContainer>
    <Brand>efood</Brand>

    <Socials aria-label="Redes sociais">
      <span>◉</span>
      <span>◎</span>
      <span>◈</span>
    </Socials>

    <p>
      A efood é uma plataforma para divulgação de estabelecimentos, a
      responsabilidade pela entrega e qualidade dos produtos é toda do
      estabelecimento contratado.
    </p>
  </FooterContainer>
)

export default Footer
