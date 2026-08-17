import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { colors } from '../../styles/GlobalStyle'

export const HeaderBar = styled.header<{ $compact: boolean }>`
  min-height: ${({ $compact }) => ($compact ? '164px' : '384px')};
  background-color: ${colors.lightCream};
  background-image:
    radial-gradient(circle at 20% 20%, rgba(230, 103, 103, 0.06) 0 2px, transparent 3px),
    radial-gradient(circle at 80% 40%, rgba(230, 103, 103, 0.05) 0 2px, transparent 3px);
  background-size: 46px 46px, 62px 62px;
`

export const HeaderContent = styled.div<{ $compact: boolean }>`
  width: min(1024px, calc(100% - 32px));
  margin: 0 auto;
  padding-top: ${({ $compact }) => ($compact ? '64px' : '40px')};
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
  font-size: 18px;
  font-weight: 900;

  > a:first-child {
    justify-self: start;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;

    > a:first-child {
      justify-self: center;
    }
  }
`

export const Brand = styled(Link)`
  font-size: 40px;
  font-weight: 900;
  letter-spacing: -3px;
  text-transform: lowercase;
`

export const CartButton = styled.button`
  justify-self: end;
  border: 0;
  padding: 0;
  background: transparent;
  color: ${colors.coral};
  font-weight: 900;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 700px) {
    justify-self: center;
  }
`

export const HeaderText = styled.h1`
  grid-column: 1 / 4;
  margin-top: 96px;
  text-align: center;
  font-size: 36px;
  line-height: 1.25;
  color: ${colors.coral};

  @media (max-width: 700px) {
    grid-column: 1;
    margin-top: 48px;
    font-size: 28px;
  }
`
