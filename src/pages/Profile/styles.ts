import styled from 'styled-components'
import { colors } from '../../styles/GlobalStyle'

export const Hero = styled.section<{ $background: string }>`
  position: relative;
  height: 280px;
  background-image: url(${({ $background }) => $background});
  background-position: center;
  background-size: cover;
`

export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.48);
`

export const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  width: min(1024px, calc(100% - 32px));
  height: 100%;
  margin: 0 auto;
  padding: 24px 0 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${colors.white};

  span {
    font-size: 32px;
    font-weight: 100;
  }

  h1 {
    font-size: 32px;
    font-weight: 900;
  }
`

export const MenuSection = styled.main`
  width: min(1024px, calc(100% - 32px));
  margin: 56px auto 120px;
`

export const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

export const Loading = styled.p`
  min-height: 420px;
  padding: 120px 16px;
  text-align: center;
  font-weight: 700;
`

export const NotFound = Loading
