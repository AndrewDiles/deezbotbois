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
		font-family: 'Press Start 2P', cursive;
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
    /* font-family: Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif; */
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

.centeredInput {
  display: block;
  margin-right: auto;
  margin-left: auto;
	text-align:center
}
.disableClicks {
  pointer-events: none;
}
.centeredFlex {
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}
.assemblyGridChild {
	width: 100%;
	height: 100%;
	min-height: 600px;
	/* display : flex;
	flex-direction: column;
	justify-content: center;
	align-content: top;
	text-align: top;
	align-items: top; */
	border: 1px solid rgba(0,0,0,0.1);
}
.colorOptions {
	height: 225px;
	width: 35px;
	justify-content: center;
	align-items: center;
	text-align: center;
	flex-direction: column;
	padding: 2px 0;
	-ms-overflow-style: none;
  scrollbar-width: none;

}
.colorOptions::-webkit-scrollbar {
  display: none;
}
.navLink {
	width: 125px;
	height: 40px;
	margin: 5px;
	border-radius: 5px;
  border: 1px solid transparent;
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
@keyframes glowUserImg {
	/* 0% {
		background: radial-gradient(closest-side, black,black,indigo, blue, white);
	}
	25% {
		background: radial-gradient(closest-side, black,black,indigo, purple, white);
	}
	50% {
		background: radial-gradient(closest-side, black,black,indigo, indigo, white);
	}
	75% {
		background: radial-gradient(closest-side, black,black,indigo, indigo, lightcyan);
	}
	100% {
		background: radial-gradient(closest-side, black,black,indigo, blue, lavender);
	} */
	0% {background: radial-gradient(closest-side, deepskyblue,rgba(255,255,255,0),rgba(255,255,255,0));}
	10% {background: radial-gradient(closest-side, blue,deepskyblue,rgba(255,255,255,0),rgba(255,255,255,0));}
	20% {background: radial-gradient(closest-side, blue,blue,deepskyblue,rgba(255,255,255,0),rgba(255,255,255,0));}
	30% {background: radial-gradient(closest-side, blue,blue,blue,deepskyblue,rgba(255,255,255,0),rgba(255,255,255,0));}
	40% {background: radial-gradient(closest-side, blue,blue,blue,blue,blue,deepskyblue,rgba(255,255,255,0),rgba(255,255,255,0));}
	50% {background: radial-gradient(closest-side, blue,blue,blue,blue,blue,blue,deepskyblue,rgba(255,255,255,0),rgba(255,255,255,0));}
	60% {background: radial-gradient(closest-side, blue,blue,blue,blue,blue,blue,blue,deepskyblue,rgba(255,255,255,0),rgba(255,255,255,0));}
	70% {background: radial-gradient(closest-side, blue,blue,blue,blue,blue,blue,blue,blue,deepskyblue,rgba(255,255,255,0),rgba(255,255,255,0));}
	80% {background: radial-gradient(closest-side, blue,blue,blue,blue,blue,blue,blue,blue,blue,deepskyblue,rgba(255,255,255,0),rgba(255,255,255,0));}
	90% {background: radial-gradient(closest-side, blue,blue,blue,blue,blue,blue,blue,blue,blue,blue,deepskyblue,rgba(255,255,255,0),rgba(255,255,255,0));}
	100% {background: radial-gradient(closest-side, blue,blue,blue,blue,blue,blue,blue,blue,blue,blue,blue,deepskyblue,rgba(255,255,255,0),rgba(255,255,255,0));}
}

@keyframes glowGift {
	0% {color: rgba(0, 0, 0, 0.54)};
	100% {color: blue};
}
@keyframes slideStarLeft {
	0% {left:50px}
	50% {left:-50px;}
	100%{
		left:-57px;
		transform: scale(2);
		color:rgba(220, 220, 255, 0.1);
	}
}

@keyframes slideStarUpRight {
	0% {
		right:45px;
		top: 0px;
	}
	50% {
		right:5px;
		top: -50px;
		}
	100%{
		right:5px;
		top: -55px;
		transform: scale(2);
		color:rgba(220, 220, 255, 0.1);
	}
}
`
;

export default GlobalStyles;
