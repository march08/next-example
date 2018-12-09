import React from 'react'

export default ({ user }) => (
  <div>
    <h1>{user.login}</h1>
    <img
      alt={ user.login }
      src={ user.avatar_url }
    />
  </div>
)
