import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../actions'
import {
  getVisibleTodos, getIsFetching, getErrorMessage,
} from '../reducers'
import TodoList from './TodoList'
import FetchError from './FetchError'

class VisibleTodoList extends Component {
  componentDidMount () {
    this.fetchData()
  }

  componentDidUpdate (prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData()
    }
  }

  fetchData () {
    const {filter, fetchTodos} = this.props
    // fetchTodos(filter).then(() => console.log('done!'))
    fetchTodos(filter)
  }

  render () {
    const {toggleTodo, todos, errorMessage, isFetching} = this.props
    if (isFetching && !todos.length) {
      return <p>Loading...</p>
    }
    if (errorMessage && !todos.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()}
        />
      )
    }
    return (
      <TodoList
        todos={todos}
        onTodoClick={toggleTodo}
      />
    )
  }
}

const mapStateToProps = (state, {match}) => {
  const filter = match.params.filter || 'all'
  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    errorMessage: getErrorMessage(state, filter),
    filter,
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   onTodoClick (id) {
//     dispatch(toggleTodo(id))
//   },
// })
// for such case we could just use mapping like below

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions,
)(VisibleTodoList))

export default VisibleTodoList