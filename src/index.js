import React from 'react';
import ReactDOM from 'react-dom';

import { ethers } from 'ethers';
import { Web3ReactProvider } from '@web3-react/core';

import App from './App';

const rootNode = document.getElementById('root');

const getLibrary = provider => {
	const library = new ethers.providers.Web3Provider(provider);
	library.pollingInterval = 12000;
	return library;
};

ReactDOM.render(
	<React.StrictMode>
		<Web3ReactProvider getLibrary={getLibrary}>
			<App />
		</Web3ReactProvider>
	</React.StrictMode>,
	rootNode
);