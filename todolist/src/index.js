import React from 'react';
import ReactDOM from 'react-dom';
import './todolist.scss';
import TodoApp from './ToDo';


ReactDOM.render(
  <React.StrictMode>
    <TodoApp />
  </React.StrictMode>,
  document.getElementById('root')
);

