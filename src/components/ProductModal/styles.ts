import styled from 'styled-components'
import { colors } from '../../styles/GlobalStyle'

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.8);
`

export const ModalBox = styled.div`
  position: relative;
  width: min(1024px, 100%);
  padding: 32px;
  background: ${colors.coral};
  color: ${colors.white};
`

export const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  border: 0;
  background: transparent;
  color: ${colors.white};
  font-size: 28px;
  cursor: pointer;
`

export const ModalContent = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
  align-items: start;

  h2 {
    margin-bottom: 16px;
    font-size: 18px;
  }

  p {
    margin-bottom: 16px;
    font-size: 14px;
    line-height: 1.45;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`

export const ModalImage = styled.img`
  width: 280px;
  height: 280px;
  object-fit: cover;

  @media (max-width: 700px) {
    width: 100%;
    height: 220px;
  }
`

export const AddButton = styled.button`
  border: 0;
  padding: 6px 8px;
  background: ${colors.lightCream};
  color: ${colors.coral};
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`
