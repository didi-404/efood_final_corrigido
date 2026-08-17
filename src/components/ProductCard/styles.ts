import styled from 'styled-components'
import { colors } from '../../styles/GlobalStyle'

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  min-height: 338px;
  padding: 8px;
  background: ${colors.coral};
  color: ${colors.lightCream};
`

export const CardImage = styled.img`
  width: 100%;
  height: 167px;
  object-fit: cover;
`

export const Title = styled.h3`
  margin-top: 8px;
  font-size: 16px;
`

export const Description = styled.p`
  display: -webkit-box;
  margin: 8px 0;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-size: 14px;
  line-height: 1.45;
`

export const CardButton = styled.button`
  width: 100%;
  margin-top: auto;
  border: 0;
  padding: 6px 8px;
  background: ${colors.lightCream};
  color: ${colors.coral};
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`
