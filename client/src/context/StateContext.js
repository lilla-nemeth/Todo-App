import { createContext } from 'react';
import { changeOrGetData } from '../utils/helperFunctions';

export const StateContext = createContext();

function StateContextProvider(props) {
	return <StateContext.Provider value={{ changeOrGetData }}>{props.children}</StateContext.Provider>;
}

export default StateContextProvider;
