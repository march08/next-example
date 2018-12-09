import React from 'react'
import fetch from 'isomorphic-fetch'
import Link from 'next/link'

import cls from './github-users.scss'

export default class GithubUsers extends React.Component {
  static async getInitialProps() {
    const users = await fetch('https://api.github.com/users')
      .then(res => res.json())

    return {
      users,
    }
  }

  render() {
    const { users } = this.props
    return (
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
                as={ `github-user/${user.login}` }
                href={ `github-user?user=${user.login}` }
              >
                <a>{user.login}</a>
              </Link>
            </div>
          ))
        }
      </div>
    )
  }
}
