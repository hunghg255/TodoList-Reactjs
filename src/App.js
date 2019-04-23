import React, { Component } from "react";

import TodoItem from "./components/TodoItem";
import TodoFilter from "./components/TodoFilter";


import "./App.css";
import tick from "./img/tick.svg";


class App extends Component {

  constructor() {
    super();
    this.state = {
      todoItems: [],
      all: true,
      active: false,
      complete: false,
      clear: true
    };
    this.inputElement = React.createRef();
  }

  componentDidMount(){
    let v = JSON.parse(localStorage.getItem('Todos'));
    this.setState({...v});
  }

  componentDidUpdate(){
   localStorage.setItem('Todos', JSON.stringify({...this.state}));
  }

  onItemClick = item => {
      const isComplete = item.isComplete;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);

      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !isComplete
          },
          ...todoItems.slice(index + 1)
        ]
      });
  }

  onClearItem = item => {
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems: [...todoItems.slice(0, index), ...todoItems.slice(index + 1)]
      });
  }

  CheckAll = (items, checkAll) => {
    if (checkAll) {
      this.setState({
        todoItems: [
          ...items.reduce((arr, i) => [...arr, { ...i, isComplete: true }], [])
        ],
        checkAll: 0
      });
    } else {
      this.setState({
        todoItems: [
          ...items.reduce((arr, i) => [...arr, { ...i, isComplete: false }], [])
        ],
        checkAll: 1
      });
    }
  }

  onKeyDown(todoItems, e) {
    console.log(this.refs['inputEl'].value)
    if (e.keyCode === 13) {
      let text = e.target.value.trim();
      e.target.value = '';
      
      if (!text) {
        return;
      }

      this.setState({
        todoItems: [
          ...todoItems,
          { title: text, isComplete: false, clear: "x" }
        ],
        todoNewItem: ""
      });
    }
  }
  onChange(e) {
    if (e.keyCode !== 13) {
      this.setState({
        todoNewItem: e.target.value
      });
    }
  }

  AllItems = () => {
    this.setState({
      all: true,
      active: false,
      complete: false
    })
  }

  onActive = () => {
    this.setState({
      all: false,
      active: true,
      complete: false
    })
  }

  onComplete = () => {
    this.setState({
      all: false,
      active: false,
      complete: true
    })
  }

  onClearAll = () => {
    this.setState({todoItems: []});
  }

  render() {
    let { todoItems, all, active, complete, checkAll } = this.state;
    let ItemActives = todoItems.filter(v => v.isComplete);
    let ItemComplete = todoItems.filter(v => !v.isComplete);

    return (
      <>
        <h1 
          style={{textAlign: "center", fontSize: '3.7rem', fontStyle:'italic', color:'dodgerblue'}}
        >
          To Do Lists
        </h1>

        <div className="App">
         <div className="header">
            <img
              onClick={this.CheckAll.bind(this, todoItems,checkAll)}
              src={tick}
              alt=""
            />
            <input
              onKeyDown={this.onKeyDown.bind(this, todoItems)}
              onChange={this.onChange.bind(this)}
              type="text"
              placeholder="Add task..."
              ref='inputEl'
            />
          </div> 
          {
            todoItems.length ?
            ((all === true && active === false && complete === false) 
            ? todoItems.map((item,index) => 
                <TodoItem 
                  key={index} 
                  item={item} 
                  onClick={this.onItemClick.bind(this, item)} 
                  onClear={this.onClearItem.bind(this,item)}  
                />) 
            : (all === false && active === true && complete === false) 
            ? ItemActives.map((item,index) => 
                <TodoItem 
                  key={index} 
                  item={item} 
                  onClick={this.onItemClick.bind(this, item)} 
                  onClear={this.onClearItem.bind(this,item)}
                />) 
            : ItemComplete.map((item,index) => 
                <TodoItem 
                  key={index} 
                  item={item} 
                  onClick={this.onItemClick.bind(this, item)} 
                  onClear={this.onClearItem.bind(this,item)}
                />)):'' 
          }

          <TodoFilter 
            task={todoItems.length} 
            AllItems={this.AllItems} 
            onActive={this.onActive} 
            onComplete={this.onComplete} 
            onClearAll={this.onClearAll}
          />
        </div>
      </>
    );
  }
}

export default App;
