import React from 'react'
import TodoTemplate from '../components/todo/TodoTemplate.jsx'
import TodoInsert from '../components/todo/TodoInsert.jsx'
import TodoList from '../components/todo/TodoList.jsx'

const TodoPage = () => {
  return (
    <TodoTemplate>
      <TodoInsert />
      <TodoList />
    </TodoTemplate>
  )
}

export default TodoPage