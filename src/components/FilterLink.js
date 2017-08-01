import React from 'react'
import { Link, withRouter } from 'react-router-dom'

let FilterLink = ({ match, filter, children }) => {
  // NavLink with activeStyle property doesn't work :(

  const isActive = filter === (match.params.filter || 'all')
  const activeStyle = {
    textDecoration: 'none',
    fontWeight: 'bold'
  }
  const style = isActive ? activeStyle : {}

  return (<Link
    to={filter === 'all' ? '' : filter}
    style={style}
  >
    {children}
  </Link>
)}

FilterLink = withRouter(FilterLink)

export default FilterLink


