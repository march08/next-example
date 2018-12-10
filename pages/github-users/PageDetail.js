import React from 'react'
import { connect } from 'react-redux'

const User = ({ user, ...rest }) => (
  <div>
    <h1>{user.name}</h1>
    <img
      alt={ user.login }
      src={ user.avatar_url }
    />
  </div>
)

export default connect(store => ({
  user: store.user,
}))(User)
