import React from 'react';
import { order } from './ToDo.js';
import { ReactComponent as AscArrow } from './assets/icons/ascending_arrow.svg';
import { ReactComponent as DescArrow } from './assets/icons/descending_arrow.svg';

export default function SortingButtons(props) {
  const { orderBy, setOrderBy } = props;

  function createButtonText(currentState, descending, ascending, passive) {
    if (currentState === descending) {
      return <div className='sortingButtonArrow'>{descending}<DescArrow /></div>;
    } else if (currentState === ascending) {
      return <div className='sortingButtonArrow'>{ascending}<AscArrow /></div>;
    } else {
      return <div className='sortingButtonArrow'>{passive}<AscArrow style={{fill: 'none'}}/></div>;
    }
  }

  return (
    <div>
      <div className='sortingRow'>
        <button
          onClick={() => {
            if (orderBy === order.oldest) {
              setOrderBy(order.newest);
            } else {
              setOrderBy(order.oldest);
            }
          }}
          className={
            orderBy === order.newest || orderBy === order.oldest
              ? 'buttonDateActive'
              : 'buttonDate'
          }
        >
          {createButtonText(orderBy, order.newest, order.oldest, 'Date')}
        </button>
        <button
          onClick={() => {
            if (orderBy === order.mostImportant) {
              return setOrderBy(order.leastImportant);
            } else {
              return setOrderBy(order.mostImportant);
            }
          }}
          className={
            orderBy === order.leastImportant || orderBy === order.mostImportant
              ? 'buttonImportanceActive'
              : 'buttonImportance'
          }
        >
          {createButtonText(orderBy, order.mostImportant, order.leastImportant, 'Importance')}
        </button>
        <button
          onClick={() => {
            if (orderBy === order.uncompleted) {
              return setOrderBy(order.completed);
            } else {
              return setOrderBy(order.uncompleted);
            }
          }}
          className={
            orderBy === order.completed || orderBy === order.uncompleted ? 'buttonStatusActive' : 'buttonStatus'
          }
        >
          {createButtonText(orderBy, order.uncompleted, order.completed, 'Status')}
        </button>
      </div>
    </div>
  );
}
