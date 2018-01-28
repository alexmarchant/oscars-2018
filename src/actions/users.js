import { makeUserRef } from '../lib/firebase'

export const REQUEST_UPDATE_USER = 'REQUEST_UPDATE_USER'
export function requestUpdateUser(user) {
  makeUserRef(user).update({
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
  })
  return {
    type: REQUEST_UPDATE_USER,
  }
}
