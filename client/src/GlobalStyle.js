import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

* {
  box-sizing: border-box;
}


body {
	font-family: 'Open Sans', sans-serif;
	background: #ffffff;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

p {
  padding: 0;
  margin: 0;
}

h1, h2, h3 {
  padding: 0;
  margin: 0;
}

button {
  cursor: pointer;
}




`;

export default GlobalStyle;
