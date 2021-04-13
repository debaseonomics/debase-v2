import React from 'react';
import { ThemeProvider } from 'styled-components';

import { NormalizerStyle, GlobalStyle, FontFaces, THEME_DARK } from '@theme';
import { Dapp } from 'domains';

class App extends React.Component {

    render() {

        return (
			<ThemeProvider theme={THEME_DARK}>
				<GlobalStyle />
				<NormalizerStyle />
				<FontFaces />
				<Dapp />
			</ThemeProvider>
        );
    }
}

export default App;