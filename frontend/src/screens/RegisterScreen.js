import React, { useState } from 'react'
import { connect } from 'react-redux'
import { register } from '../actions/user.actions'

const RegisterScreen = ({ dispatch, user, isFetching }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = e => {
    setUsername(e.target.value)
  }
  const handleEmailChange = e => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(register({ username, email, password }))
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleUsernameChange} placeholder="username" />
        <input type="text" onChange={handleEmailChange} placeholder="email" />
        <input type="password" onChange={handlePasswordChange} placeholder="password" />
        <input type="submit" />
      </form>
      {
        user && <div>user.username</div>
      }
    </>
  )
}
export default connect(state => {
  return { user: state.user, isFetching: state.isFetching }
})(RegisterScreen)
