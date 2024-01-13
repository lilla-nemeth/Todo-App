import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client';
import App from './App';
import StateContextProvider from './context/StateContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.StrictMode>
		<StateContextProvider>
			<App />
		</StateContextProvider>
	</React.StrictMode>
);
