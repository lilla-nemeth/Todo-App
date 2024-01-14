import { Dispatch, SetStateAction, ChangeEvent } from 'react';

export const handleInputChange = (stateSetter: Dispatch<SetStateAction<string>>, event: ChangeEvent<HTMLInputElement>) => {
	stateSetter(event.target.value);
};