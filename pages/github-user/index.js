import React from 'react'
import fetch from 'isomorphic-fetch'
import { withRouter } from 'next/router'

class GithubUser extends React.Component {
  static async getInitialProps(ctx) {
    const user = await fetch(`https://api.github.com/users/${ctx.query.user}`)
      .then(res => res.json())

    return {
      user,
    }
  }

  render() {
    const { user } = this.props
    console.log(user)
    return (
      <div>
        <h1>{user.login}</h1>
        <img
          alt={ user.login }
          src={ user.avatar_url }
        />
      </div>
    )
  }
}


export default withRouter(GithubUser)
