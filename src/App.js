import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NormalizerStyle, GlobalStyle, FontFaces, THEME_DARK } from '@theme';
import { Dapp, Home } from 'domains';

class App extends React.Component {
	render() {
		return (
			<Router>
				<ThemeProvider theme={THEME_DARK}>
					<GlobalStyle />
					<NormalizerStyle />
					<FontFaces />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/dashboard">
							<Dapp />
						</Route>
					</Switch>
				</ThemeProvider>
			</Router>
		);
	}
}

export default App;
