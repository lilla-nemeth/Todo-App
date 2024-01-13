import React, { createContext } from 'react';
import { changeOrGetData } from './Requests.js';

export const StateContext = createContext();

function StateContextProvider(props) {
	return <StateContext.Provider value={{ changeOrGetData }}>{props.children}</StateContext.Provider>;
}

export default StateContextProvider;
