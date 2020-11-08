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

.aiTitle {
	height: 52px;
	width: 100%;
	font-size: 1.3em;
	white-space: normal;
	border-top: 1px solid rgba(0,0,0,0.24);
	padding: 5px 0;
}
.aiTitleCondition {
	height: 52px;
	width: 100%;
	font-size: 1.1em;
	white-space: normal;
	border-top: 1px solid rgba(0,0,0,0.24);
	padding: 5px 0;
}
.aiButtonRow {
	height: 40px;
	width: 100%;
}
.centeredInput {
  display: block;
  margin-right: auto;
  margin-left: auto;
	text-align: center;
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
.evenlyFlex {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	text-align: center;
}
.betweenFlex {
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;
}
.innerNodeOptionsWrapper {
	width: 100%;
	height: 422px;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	text-align: center;
	line-height: 0;
	overflow-y: auto;
}
.commandContents {
	height: 370px;
	width: 100%;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: center;
	text-align: center;
	white-space: normal;
	padding: 20px 0;
}
.infoContents {
	font-size: 0.8em;
}
.conditionContents {
	height: 330px;
	width: 100%;
	overflow-y: auto;
	flex-direction: column;
	justify-content: column;
	align-items: center;
	text-align: center;
	white-space: normal;
}
.assemblyGridChild {
	height: 100%;
	min-height: 600px;
	border: 1px solid rgba(0,0,0,0.1);
	animation: 0.4s ease-out expand;
}
.baseButtonStyles {
	border-radius: 5px;
  border: 1px solid transparent;
  font-weight: 500;
  font-family: 'Press Start 2P', cursive;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px;
	transition: color .75s, background-color .75s;
}
.baseIconStyles {
	margin: 5px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px;
  text-align: center;
  transition: color 0.75s, background-color 0.75s;
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
.noBullets li {
	list-style-type: none;
}

.techBranchHeight27 {
	height: 27px;
	width: 10px;
}
.techBranchAngle {
	height: 50px;
	width: 10px;
	position: relative;
}
.techGold {
	background-image: linear-gradient(to right, rgba(255,238,0,0), rgba(255,238,0,0.75),rgba(255,238,0,0));
}
.techGrey {
	background-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.3),rgba(0,0,0,0));
}
.enlargen {
	font-size: 400%;
}
.disabledTransition {
	transition: '';
}
.baseButtonSize {
	width: 125px;
	height: 40px;
}
.baseIconSize {
	height: 40px;
	width: 40px;
}
.decisionTreeBox {
	width: 125px;
	height: 50px;
	font-size: 0.6em;
}
/* .enabledTransition {
	transition: ${props => `transform ${props.executionSpeed}s  cubic-bezier(.8,.15,.65,.9)`};
} */

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
@keyframes expand {
	0%{
		transform: scale(0);
	}
	100%{
		transform: scale(1);
	}
}
@keyframes rotating {
  0%{
		transform: scale(1) rotate(0deg);
  }
	10%{
		transform: scale(0.9) rotate(0deg);
	}
	90%{
		transform: scale(0.9) rotate(360deg);
	}
  100%{
		transform: scale(1) rotate(360deg); 
  }
}

.rotating {
    animation: rotating 2s ease-in-out infinite;
}
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
@keyframes openFromTopToBottom {
  0% {
		width: 0px;
    height: 5px;
		/* min-height: 0px; */
  }
  25% {
    width: 240px;
    height: 5px;
		/* min-height: 0px; */
  }
  99% {
    width: 240px;
    height: 60px;
		/* min-height: 0px; */
  }
	100% {
		width: 240px;
    height: 100%;
		/* min-height: 50px; */
	}
}
@keyframes attributeExpandxAxis {
  0% {
		width: 5px;
		height: 37px;
  }
	100% {
		width: 240px;
		height: 37px;
	}
}
@keyframes commandExpand300 {
	0% {
		width: 300px;
		height: 0;
  }
	100% {
		width: 300px;
		height: 50px;
	}
}
@keyframes commandExpand200 {
	0% {
		width: 200px;
		height: 0;
  }
	100% {
		width: 200px;
		height: 50px;
	}
}
@keyframes expandTechdisplay {
	0% {
		width: 100%;
		height: 0px;
	}
	100% {
		width: 100%;
		height: 75px;
	}
}
@keyframes growBranchHeight27 {
	0% {
		height: 0px;
		transform: skewY(0);
	}
	100% {
		height: 27px;
		transform: skewY(1);
	}
}
@keyframes growBranch4 {
	0% {
		height: 0px;
		/* transform: skewY(0) skewX(0); */
		left: 72px;
		top: 5px;
	}
	100% {
		height: 50px;
		/* transform: skewY(1) skewX(1); */
		left: 60px;
		top: 0px;
	}
}
@keyframes growBranch7 {
	0% {
		height: 0px;
		/* transform: skewY(0); */
		left: -18px;
		top: 3px;
	}
	100% {
		height: 50px;
		/* transform: skewY(1); */
		left: -7px;
		top: -3px;
	}
}
@keyframes growBranch16 {
	0% {
		height: 0px;
		left: 43px;
		top: 0px;
	}
	100% {
		height: 50px;
		left: 55px;
		top: -6px;
	}
}
@keyframes growBranch19 {
	0% {
		height: 0px;
		left: 7px;
		top: 0px;
	}
	100% {
		height: 50px;
		left: -5px;
		top: -6px;
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

@keyframes glowConditionNodeBox {
	0%{
		background-color: rgba(255,215,0, 0.2);
	}
	100% {
		background-color: rgba(255,215,0, 0.4);
	}
}
@keyframes glowCommandNodeBox {
	0%{
		background-color: rgba(0,0,255,0.2);
	}
	100% {
		background-color: rgba(0,0,255, 0.5);
	}
}
@keyframes glowEmptyNodeBox {
	0%{
		background-color: rgba(0,0,0, 0.2);
	}
	100% {
		background-color: rgba(0,0,0, 0.5);
	}
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

/* @keyframes moveBot {
	0% {
		top: 0px;
		left: 0px;
	}
	100% {
		top: --top;
		left: --left;
	}
} */
`
;

export default GlobalStyles;
