import { createGlobalStyle } from 'styled-components'

export const colors = {
  coral: '#E66767',
  lightCream: '#FFEBD9',
  cream: '#FFF8F2',
  white: '#FFFFFF',
  dark: '#4B4B4B'
}

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    min-width: 320px;
    background: ${colors.cream};
    color: ${colors.coral};
    font-family: Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input {
    font: inherit;
  }

  button {
    color: inherit;
  }

  img {
    display: block;
    max-width: 100%;
  }

  .container {
    width: min(1024px, calc(100% - 32px));
    margin: 0 auto;
  }
`

export default GlobalStyle
