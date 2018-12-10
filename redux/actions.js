
import fetch from 'isomorphic-fetch'

export const getUsers = () => async (dispatch) => {
  dispatch({
    type: '@users/get/start',
  })

  await fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then((res) => {
      dispatch({
        type: '@users/get/success',
        payload: res,
      })
    })
    .catch((e) => {
      dispatch({
        type: '@users/get/error',
        payload: e,
        error: true,
      })
    })
}

export const getUser = uid => async (dispatch) => {
  dispatch({
    type: '@user/get/start',
  })

  await fetch(`https://jsonplaceholder.typicode.com/users/${uid}`)
    .then(res => res.json())
    .then((res) => {
      dispatch({
        type: '@user/get/success',
        payload: res,
      })
    })
    .catch((e) => {
      dispatch({
        type: '@user/get/error',
        payload: e,
        error: true,
      })
    })
}
