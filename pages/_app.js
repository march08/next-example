import React from 'react'
import App, { Container } from 'next/app'
import { Provider } from 'react-redux'

// redux things

import { initializeStore, defaultInitState as initialState } from '../redux/store'

const isServer = typeof window === 'undefined'
/* eslint-disable no-underscore-dangle */
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

const getInitialState = () => {
  if (isServer || !window[__NEXT_REDUX_STORE__]) {
    return initialState
  }
  return !window[__NEXT_REDUX_STORE__]
}


class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    const reduxStore = initializeStore(getInitialState())

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({
        ...ctx,
        reduxStore,
      })
    }

    return {
      pageProps,
      reduxStore: reduxStore.getState(),
    }
  }

  constructor(props) {
    super(props)
    this.reduxStore = initializeStore(props.reduxStore)
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
