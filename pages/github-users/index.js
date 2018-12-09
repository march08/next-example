import React from 'react'
import fetch from 'isomorphic-fetch'

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
              <div>{user.login}</div>
            </div>
          ))
        }
      </div>
    )
  }
}
