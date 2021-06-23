import React, {useState} from 'react';
import { order } from './ToDo.js'

export default function SortingButtons(props) {
    const [activeButton, setActiveButton] = useState("date");

    const { setOrderBy } = props;

    return (
        <div>
            <div className="sortingRow">
                <button onClick={() => {
                        setOrderBy(order.date);
                        setActiveButton("date")
                        }
                    }
                        className={activeButton === "date" ? "buttonDateActiveStyle" : "buttonDateStyle"}
                >
                        Date
                </button>
                <button onClick={() => {
                            setOrderBy(order.importance);
                            setActiveButton("importance")
                            }
                        }
                        className={activeButton === "importance" ? "buttonImportanceActiveStyle" : "buttonImportanceStyle"}
                >
                        Importance
                </button>
            </div> 
        </div>
    )
}
