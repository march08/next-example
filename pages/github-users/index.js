import React from 'react'

import * as actions from '../../redux/actions'

import PageDetail from './PageDetail'
import PageList from './PageList'

class GithubUsers extends React.Component {
  static async getInitialProps(ctx) {
    // detail
    if (ctx.query && ctx.query.user) {
      await ctx.reduxStore.dispatch(actions.getUser(ctx.query.user))
      return {
        isDetail: true,
      }
    }
    // list
    await ctx.reduxStore.dispatch(actions.getUsers())
    return {
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

export default GithubUsers
