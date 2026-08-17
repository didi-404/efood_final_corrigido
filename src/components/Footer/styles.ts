import styled from 'styled-components'
import { colors } from '../../styles/GlobalStyle'

export const FooterContainer = styled.footer`
  min-height: 298px;
  padding: 40px 16px;
  background: ${colors.lightCream};
  text-align: center;
  color: ${colors.coral};

  p {
    width: min(480px, 100%);
    margin: 80px auto 0;
    font-size: 10px;
    line-height: 1.3;
  }
`

export const Brand = styled.div`
  font-size: 34px;
  font-weight: 900;
  letter-spacing: -3px;
`

export const Socials = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 32px;
  font-size: 20px;
`
