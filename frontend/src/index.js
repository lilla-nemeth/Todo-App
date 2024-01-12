import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import StateContextProvider from './context/StateContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<StateContextProvider>
			<App />
		</StateContextProvider>
	</React.StrictMode>
);
