/**
 * @author Jurgita Germanavičienė
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './todolist.scss';
import TodoApp from './ToDo';

import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <React.StrictMode>
    <TodoApp />
  </React.StrictMode>,
  document.getElementById('root')
);

