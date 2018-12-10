import React from 'react'
import App, { Container } from 'next/app'
import { Provider } from 'react-redux'

// redux things

import { initializeStore } from '../redux/store'

const isServer = typeof window === 'undefined'
/* eslint-disable no-underscore-dangle */

const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'


const getOrCreateStore = (initialState) => {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState)
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState)
  }
  return window[__NEXT_REDUX_STORE__]
}

class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    const reduxStore = getOrCreateStore()
    ctx.reduxStore = reduxStore

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({
        ...ctx,
        reduxStore,
      })
    }

    return {
      pageProps,
      initialReduxState: reduxStore.getState(),
    }
  }

  constructor(props) {
    super(props)
    this.reduxStore = getOrCreateStore(props.initialReduxState)
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Provider store={ this.reduxStore }>
          <Component
            { ...pageProps }
            reduxStore={ this.reduxStore }
          />
        </Provider>
      </Container>
    )
  }
}

export default CustomApp
