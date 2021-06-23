import React, {useState} from 'react';
import { ReactComponent as ArrowDown} from './assets/icons/arrow_down.svg';

const notImportantColor = 'rgb(255, 200, 200)';
const importantColor = 'rgb(255, 157, 157)';
const urgentColor = 'rgb(255, 103, 103)';
// const doneColor = '#fff';
const doneColor = '#ccc';

const options = {
    '1': 'Not important',
    '2': 'Important',
    '3': 'Urgent'
}

function generateId (num) {
    let number = Number(num);
    if (number === 1) {
        return 'notimportant';
    } else if (number === 2) {
        return 'important';
    } else {
        return 'urgent';
    }
}

function chooseColor(number, isCompleted) {
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

    const { value, isCompleted, onSelect } = props;
 
    return (
        // <div className="dropdownContainer"
        <div className={isCompleted ? "dropdownContainerInactive" : "dropdownContainer"}
             onMouseLeave={() => setDropdownOpen(false)}  
             onMouseEnter={() => setDropdownOpen(true)}  
        >
            <div 
                className="dropdownSelected"
                // style={{backgroundColor: chooseColor(value, isCompleted)}}
                style={{border: `2px solid ${chooseColor(value, isCompleted)}`, color: chooseColor(value, isCompleted)}}
            >
                {/* {options[value]} <ArrowDown style={isCompleted ? {fill: "#ccc"} : {fill: "black"}}/> */}
                {options[value]} <ArrowDown style={isCompleted ? {fill: "#ccc", strokeWidth: "3"} : {fill: chooseColor(value, isCompleted)}}/>
            </div>
            {dropdownOpen && !isCompleted &&
            <div className="dropdownOptions">
                {Object.entries(options).map(option => {
                    return (
                        <div 
                            id={generateId(option[0])} 
                            className="dropdownOption"
                            onClick={() => {
                                setDropdownOpen(false);
                                onSelect(option[0])
                                }
                            }    
                        >
                            <div>{option[1]}</div>
                        </div>
                    )
                })}
            </div>
            }
        </div>
    )
}
