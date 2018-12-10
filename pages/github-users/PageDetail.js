import React from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'


const User = ({ user }) => (
  user ? (
    <div>
      <Head>
        <title>{user.name}</title>
      </Head>
      <h1>{user.name}</h1>
    </div>
  ) : null
)

export default connect(store => ({
  user: store.user,
}))(User)
