import React from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'

import cls from './github-users.scss'

const Users = ({ users, ...rest }) => (

  <div className={ cls.list }>
    {
      users.map(user => (
        <div
          key={ user.id }
          className={ cls.userListItem }
        >
          <Link
            as={ `github-users/${user.id}` }
            href={ `github-users?user=${user.id}` }
          >
            <a>{user.name}</a>
          </Link>
        </div>
      ))
    }
  </div>
)

export default connect(store => ({
  users: store.users,
}))(Users)
