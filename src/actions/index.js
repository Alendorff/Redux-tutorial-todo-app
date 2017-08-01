import { normalize } from 'normalizr'
import * as schema from './schema'
import * as api from '../api'
import { getIsFetching } from '../reducers'

export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve()
  }

  dispatch({
    type: 'FETCH_TODO_REQUEST',
    filter,
  })

  return api.fetchTodos(filter).then(
    response => {
      console.log(
        'normalize response ',
        normalize(response, schema.arrayOfTodos)
      )
      dispatch({
        type: 'FETCH_TODO_SUCCESS',
        filter,
        response: normalize(response, schema.arrayOfTodos),
      })
    },
    err =>
      dispatch({
        type: 'FETCH_TODO_FAILURE',
        filter,
        message: err.message || 'Something went wrong',
      }),
  )
}

export const addTodo = (text) => (dispatch) =>
  api.addTodo(text).then(response => {
    console.log(
      'normalize response ',
      normalize(response, schema.todo)
    )
    dispatch({
      type: 'ADD_TODO_SUCCESS',
      response: normalize(response, schema.todo)
    })
  })

export const toggleTodo = (id) => (dispatch) =>
  api.toggleTodo(id).then(response => {
    dispatch({
      type: 'TOGGLE_TODO',
      response: normalize(response, schema.todo)
    })
  })