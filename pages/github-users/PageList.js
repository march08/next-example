import React from 'react'
import Link from 'next/link'

import cls from './github-users.scss'

export default ({ users }) => (

  <div className={ cls.list }>
    {
      users.map(user => (
        <div
          key={ user.login }
          className={ cls.userListItem }
        >
          <div>
            <img
              alt={ user.login }
              className={ cls.avatar }
              src={ user.avatar_url }
            />
          </div>
          <Link
            as={ `github-users/${user.login}` }
            href={ `github-users?user=${user.login}` }
          >
            <a>{user.login}</a>
          </Link>
        </div>
      ))
    }
  </div>
)
