import React, {useState} from 'react';
import { ReactComponent as ArrowDown} from './assets/icons/arrow_down.svg';

const notImportantColor = 'rgb(255, 234, 234)';
const importantColor = 'rgb(255, 157, 157)';
const urgentColor = 'rgb(255, 103, 103)';
const doneColor = '#fff';

const options = {
    '1': 'Not important',
    '2': 'Important',
    '3': 'Urgent'
}


let optionKeys = Object.keys(options);
let optionKeysToNumber = optionKeys.map((i) => Number(i));
let optionValues = Object.values(options);


function changeNumberToText (num) {
    if (num === 1) {
        return optionValues[0];
    } else if (num === 2) {
        return optionValues[1];
    } else {
        return optionValues[2];
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

    const { value, isCompleted, changeImportance } = props;
 
    return (
        <div className="dropdownContainer">
            <div 
                className="dropdownSelected"
                style={{backgroundColor: chooseBackgroundColor(value, isCompleted)}}
                onClick={() => setDropdownOpen(!dropdownOpen)}
            >
                {/* {changeNumberToText(value)} <ArrowDown /> */}
                {options[value]} <ArrowDown />
            </div>
            {dropdownOpen &&
            <div className="dropdownOptions">
                {optionKeysToNumber.map((num) => {
                    return (
                        <div 
                            id={generateId(num)} 
                            style={{padding: '5px'}}
                            onClick={() => {
                                setDropdownOpen(false);
                                changeImportance(num)
                                }
                            }    
                        >
                            {changeNumberToText(num)}
                        </div>
                    )
                })}
            </div>
            }
        </div>
    )
}
