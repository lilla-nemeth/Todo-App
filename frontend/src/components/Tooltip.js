import React, { useState } from 'react';

const Bubble = ({ fill, date, time }) => {
  return (
    <svg
      version='1.1'
      fill={fill}
      background='#fff'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 24 22'
    >
      <path d='M24,0H0v17h4v5l7-5h13V0z' />
      <text
        transform='matrix(1 0 0 1 1.6304 7.5122)'
        fill='#000'
        fontSize='4'
        textAnchor='center'
      >
        <tspan x='0' y='0'>
          {date}
        </tspan>
        <tspan x='5.2' y='6'>
          {time}
        </tspan>
      </text>
    </svg>
  );
};

export default function Tooltip(props) {
  const [visibilty, setVisibility] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      {visibilty && (
        <div
          style={{
            position: 'absolute',
            bottom: '5%',
            left: '0',
            padding: '20px',
            width: '70px',
            height: '70px',
            cursor: 'pointer',
          }}
        >
          <Bubble
            fill={'rgb(114, 180, 140)'}
            date={props.date}
            time={props.time}
          />
        </div>
      )}
      <div
        onMouseOver={() => setVisibility(true)}
        onMouseLeave={() => setVisibility(false)}
        style={{ cursor: 'pointer', zIndex: '10' }}
      >
        {props.children}
      </div>
    </div>
  );
}
