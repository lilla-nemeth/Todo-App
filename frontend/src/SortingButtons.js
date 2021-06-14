import React from 'react';
import { order } from './ToDo.js'

export default function SortingButtons(props) {

    const { setOrderBy } = props;

    return (
        <div>
            <div className="filterRow">
                <button className="buttonDateStyle" 
                        onClick={() => setOrderBy(order.date)}>
                        Date
                </button>
                <button className="buttonImportanceStyle" 
                        onClick={() => setOrderBy(order.importance)}>
                        Importance
                </button>
            </div> 
        </div>
    )
}
