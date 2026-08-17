import styled from 'styled-components'
import { colors } from '../../styles/GlobalStyle'

export const CartContainer = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  position: fixed;
  inset: 0;
  z-index: 1000;
`

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
`

export const Sidebar = styled.aside`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 360px;
  height: 100vh;
  margin-left: auto;
  padding: 32px 8px;
  overflow-y: auto;
  background: ${colors.coral};
  color: ${colors.white};
  box-shadow: -12px 0 28px rgba(0, 0, 0, 0.12);
`

export const CloseButton = styled.button`
  position: absolute;
  top: 6px;
  right: 8px;
  width: 28px;
  height: 28px;
  border: 0;
  background: transparent;
  color: ${colors.lightCream};
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
`

export const CartList = styled.ul`
  list-style: none;
`

export const CartItem = styled.li`
  position: relative;
  display: flex;
  min-height: 100px;
  margin-bottom: 16px;
  padding: 8px;
  background: ${colors.lightCream};
  color: ${colors.coral};
`

export const CartImage = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 8px;
  object-fit: cover;
`

export const CartInfo = styled.div`
  min-width: 0;
  padding-right: 28px;

  h3 {
    margin-bottom: 16px;
    font-size: 18px;
    line-height: 1.15;
  }

  span {
    display: block;
    font-size: 14px;
  }

  small {
    display: block;
    margin-top: 4px;
    font-size: 12px;
    font-weight: 700;
  }
`

export const TrashButton = styled.button`
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 20px;
  height: 20px;
  border: 0;
  padding: 0;
  background: transparent;
  color: ${colors.coral};
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
`

export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 40px 0 16px;
  font-size: 14px;
  font-weight: 700;
`

export const MainButton = styled.button`
  width: 100%;
  min-height: 24px;
  border: 0;
  padding: 5px 8px;
  background: ${colors.lightCream};
  color: ${colors.coral};
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    cursor: wait;
    opacity: 0.7;
  }

  & + & {
    margin-top: 8px;
  }
`

export const EmptyMessage = styled.p`
  padding: 24px 8px;
  color: ${colors.white};
  font-size: 14px;
  line-height: 1.5;
`

export const Form = styled.form`
  width: 100%;
`

export const FormTitle = styled.h2`
  margin-bottom: 16px;
  color: ${colors.lightCream};
  font-size: 16px;
  line-height: 1.2;
`

export const Field = styled.label`
  display: block;
  margin-bottom: 8px;
  color: ${colors.lightCream};
  font-size: 14px;
  font-weight: 700;

  input {
    width: 100%;
    height: 32px;
    margin-top: 8px;
    border: 1px solid transparent;
    padding: 0 8px;
    background: ${colors.lightCream};
    color: ${colors.dark};
    outline: none;

    &:focus {
      border-color: ${colors.white};
    }
  }
`

export const FieldsRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 8px;

  > ${Field} {
    min-width: 0;
  }
`

export const EqualFieldsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;

  > ${Field} {
    min-width: 0;
  }
`

export const ErrorText = styled.span`
  display: block;
  min-height: 14px;
  margin-top: 2px;
  color: ${colors.white};
  font-size: 11px;
  font-weight: 700;
`

export const FormActions = styled.div`
  margin-top: 16px;
`

export const ApiError = styled.p`
  margin: 8px 0;
  color: ${colors.white};
  font-size: 12px;
  line-height: 1.4;
`

export const Confirmation = styled.div`
  color: ${colors.lightCream};

  h2 {
    margin-bottom: 16px;
    font-size: 16px;
  }

  p {
    margin-bottom: 16px;
    font-size: 14px;
    line-height: 1.35;
  }
`
