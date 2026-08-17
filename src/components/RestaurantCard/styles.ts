import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { colors } from '../../styles/GlobalStyle'

export const Card = styled.article`
  position: relative;
  border: 1px solid ${colors.coral};
  background: ${colors.white};
  color: ${colors.coral};
  overflow: hidden;
`

export const CardImage = styled.img`
  width: 100%;
  height: 217px;
  object-fit: cover;
`

export const Tags = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;

  span {
    padding: 6px 8px;
    background: ${colors.coral};
    color: ${colors.lightCream};
    font-size: 12px;
    font-weight: 700;
  }
`

export const CardBody = styled.div`
  padding: 8px;
`

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
`

export const CardTitle = styled.h2`
  font-size: 18px;
`

export const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;

  span {
    font-size: 20px;
  }
`

export const Description = styled.p`
  min-height: 84px;
  margin: 16px 0;
  font-size: 14px;
  line-height: 1.55;
`

export const ViewButton = styled(Link)`
  display: inline-block;
  padding: 6px 8px;
  background: ${colors.coral};
  color: ${colors.lightCream};
  font-size: 14px;
  font-weight: 700;
`
