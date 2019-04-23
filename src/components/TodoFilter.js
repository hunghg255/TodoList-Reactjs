import React from "react";
import './TodoFilter.css';


const TodoFilter = (props) => {
    let {task, AllItems, onActive, onComplete, onClearAll } = props;
    return (
        <div className="TodoFilter">
            <span>{task} task</span>
            <button onClick={AllItems}>All</button>
            <button onClick={onActive}>Active</button>
            <button onClick={onComplete}>Complete</button>
            <button onClick={onClearAll}>Clear All</button>
        </div>
    )
}

export default TodoFilter;