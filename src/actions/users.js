import { makeUserRef } from '../lib/firebase'

export const REQUEST_UPDATE_USER = 'REQUEST_UPDATE_USER'
export function requestUpdateUser(user) {
  return (dispatch) => {
    dispatch({
      type: REQUEST_UPDATE_USER,
    })
    makeUserRef(user).update({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
    })
  }
}
