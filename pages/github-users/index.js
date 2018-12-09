import React from 'react'
import fetch from 'isomorphic-fetch'

import PageDetail from './PageDetail'
import PageList from './PageList'

export default class GithubUsers extends React.Component {
  static async getInitialProps(ctx) {
    const users = await fetch('https://api.github.com/users')
      .then(res => res.json())

    if (ctx.query && ctx.query.user) {
      const user = await fetch(`https://api.github.com/users/${ctx.query.user}`)
        .then(res => res.json())
      return {
        users,
        user,
        isDetail: true,
      }
    }

    return {
      users,
      isDetail: false,
    }
  }

  render() {
    const { isDetail } = this.props
    if (isDetail) {
      return <PageDetail { ...this.props } />
    }

    return <PageList { ...this.props } />
  }
}
