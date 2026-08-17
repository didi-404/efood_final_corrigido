import styled from 'styled-components'
import { colors } from '../../styles/GlobalStyle'

export const Main = styled.main`
  width: min(1024px, calc(100% - 32px));
  min-height: 600px;
  margin: 80px auto 120px;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 48px 80px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`

export const LoadingMessage = styled.p`
  text-align: center;
  font-weight: 700;
`

export const ErrorMessage = styled.p`
  text-align: center;
  color: ${colors.coral};
  font-weight: 700;
`
