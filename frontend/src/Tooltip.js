import React, { useState } from 'react';
import { ReactComponent as TooltipIcon } from './assets/icons/tooltip.svg';
import { ReactComponent as TooltipWithTextIcon } from './assets/icons/tooltip-with-text.svg';

const Bubble = ({ fill, date, time }) => {
    return <svg version="1.1" 
                fill={fill} 
                xmlns="http://www.w3.org/2000/svg" 
                x="0px" 
                y="0px"
                viewBox="0 0 24 22">
            <path d="M24,0H0v17h4v5l7-5h13V0z"/>
            <text transform="matrix(1 0 0 1 1.6304 7.5122)"
                  fill="#000"
                  fontSize="4"
                  textAnchor="center"
                  y="8.72565" 
                  x="1.31121"
            >
                <tspan x="0" y="0">{date}</tspan>
                <tspan x="5.2" y="5">{time}</tspan>
            </text>
            </svg>
};

export default function Tooltip(props) {
    const [visibilty, setVisibility] = useState(false);


    return (
        <div style={{position: 'relative'}}>
           { 
           visibilty &&
            // <div style={{backgroundColor: 'pink', position: 'absolute', bottom: '70%', right: '-30%', padding: '20px', borderRadius: '50px'}}>
            //     <h2>{props.text}</h2>
            // </div>

            // <Tooltip style={{position: 'absolute', bottom: '10%', right: '-100%', padding: '20px', width:'60px', height: '60px'}}/>


            <div style={{position: 'absolute', bottom: '10%', right: '-90%', padding: '20px', width:'60px', height: '60px'}}>
                <Bubble fill={'rgb(177, 203, 187)'} date={props.date} time={props.time}/>
            </div>
            }
            <div 
                onMouseOver={() => setVisibility(true)} 
                onMouseLeave={() => setVisibility(false)}
                style={{cursor: 'pointer'}}
            >
                {props.children} 
            </div>
        </div>
    )
}
