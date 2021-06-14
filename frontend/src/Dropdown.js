import React, {useState} from 'react';
import { ReactComponent as ArrowDown} from './assets/icons/arrow_down.svg';

const notImportantColor = 'rgb(255, 234, 234)';
const importantColor = 'rgb(255, 157, 157)';
const urgentColor = 'rgb(255, 103, 103)';
const doneColor = '#fff';

const options = [1, 2, 3];


function changeNumberToText (num) {
    if (num === 1) {
        return 'Not important';
    } else if (num === 2) {
        return 'Important';
    } else {
        return 'Urgent';
    }
}

function generateId (num) {
    if (num === 1) {
        return 'notimportant';
    } else if (num === 2) {
        return 'important';
    } else {
        return 'urgent';
    }
}

function chooseBackgroundColor(number, isCompleted) {
    if (isCompleted) {
        return doneColor;
    } else if (number === 1) {
        return notImportantColor;
    } else if (number === 2) {
        return importantColor;
    } else if (number === 3) {
        return urgentColor;
    }
}


export default function Dropdown(props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    // const [selected, setSelected] = useState(null);

    const { isCompleted, changeImportance, value } = props;
 
    return (
        <div>
            <div 
                style={{border: '1px solid black', padding: '5px', minWidth: '115px', display: 'flex', justifyContent: 'space-between', backgroundColor: chooseBackgroundColor(value, isCompleted)}}
                onClick={() => setDropdownOpen(!dropdownOpen)}
            >
                {changeNumberToText(value)} <ArrowDown />
            </div>
            {dropdownOpen &&
            <div style={{border: '1px solid black', borderTop: '0', position: 'absolute', backgroundColor: 'white', width: '125px'}}>
                {options.map((option) => {
                    return (
                        <div 
                            id={generateId(option)} 
                            style={{padding: '5px'}}
                            onClick={() => {
                                setDropdownOpen(false);
                                changeImportance(option)
                                }
                            }    
                        >
                            {changeNumberToText(option)}
                        </div>
                    )
                })}
            </div>
            }
        </div>
    )
}
