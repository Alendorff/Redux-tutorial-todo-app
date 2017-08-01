import React from 'react'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'
import FooterTodo from './FooterTodo'

const TodoApp = () => (
  <div>
    <AddTodo/>
    <VisibleTodoList />
    <FooterTodo/>
  </div>
)

export default TodoApp