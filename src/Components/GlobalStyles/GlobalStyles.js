import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html,
  body,
  div,
  span {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* GLOBAL STYLES */
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    line-height: 1.4;
    -webkit-font-smoothing: antialiased;
    font-family: Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01s !important;
      animation-iteration-count: 0.01s !important;
      transition-duration: 0.01s !important;
    }
  }
  
  a:focus {
    outline: 5px auto var(--color-primary);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong {
    font-weight: var(--font-weight-bold);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    text-rendering: optimizeLegibility;
  }

  code {
    font-size: 0.95em;
  }

body {
  height: 100vh;
  width: 100vw;
}
html {
  height: 100vh;
  width: 100vw;
}

/* former load in:
@keyframes loadInScreen {
  0% {
    top: -100%;
  }
  100% {
    width: 100%;
    height:100%;
    top:0;
  }
} */
@keyframes loadInScreen {
  0% {
    width: 10px;
    height: 100px;
    border-radius: 50%;
  }
  25% {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  75% {
    width: 100%;
    height: 100px;
    border-radius: 50%;
  }
  100% {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
}

`
;

export default GlobalStyles;
