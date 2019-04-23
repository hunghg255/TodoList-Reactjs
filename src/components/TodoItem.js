import React, { Component } from 'react';
import "./TodoItem.css";
import classNames from 'classnames';
import check from '../img/check.svg';
import checkComplete from '../img/check-complete.svg';

class TodoItem extends Component {

    render() {
        let {item, onClick, onClear} = this.props;
        let url = check;
        if (item.isComplete) url = checkComplete;

        return (
            <div className={classNames('TodoItem', {'TodoItem-complete': item.isComplete})}>
                <img onClick={onClick} src={url} className="check-img" alt=""/>
                <p>{ item.title }</p>
                <span onClick={onClear} className="clear-item">&#10060;</span>   
            </div>
        );
    }

}


export default TodoItem;