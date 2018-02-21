import * as FirebaseSDK from 'firebase'
import * as FirebaseUISDK from 'firebaseui'

const hostUrl = `${window.location.protocol}//${window.location.host}`

// Firebase config.
const config = {
  apiKey: "AIzaSyDcxja0ve4Ahx4m2-xyKXnk_cNb9PQTmTo",
  authDomain: "oscars-2018.firebaseapp.com",
  databaseURL: "https://oscars-2018.firebaseio.com",
  projectId: "oscars-2018",
  storageBucket: "oscars-2018.appspot.com",
  messagingSenderId: "360035720804"
}
const firebase = FirebaseSDK.initializeApp(config)
export default firebase

export const auth = firebase.auth()

export const database = firebase.database()

// FirebaseUI config.
const uiConfig = {
  signInSuccessUrl: hostUrl,
  signInOptions: [{
      provider: FirebaseSDK.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true,
  }],
  tosUrl: hostUrl
}
const firebaseUI = new FirebaseUISDK.auth.AuthUI(auth)

export function renderFirebaseUI(containerID) {
  firebaseUI.start(containerID, uiConfig)
}

// Different refs for reading/writing to different parts of the database
export const winnersRef = database.ref('winners')
export const chatMessagesRef = database.ref('chatMessages')
export const chatRef = database.ref('chat')
export const usersRef = database.ref('users')
export const makeUserRef = (user) => usersRef.child(user.uid)
export const makeBallotRef = (user) => makeUserRef(user).child('ballot')
export const globalBallotRef = database.ref('globalBallot')

// Contant that you can send to firebase that will be replaced
// with a server populated value for the timestamp
export const TIMESTAMP = FirebaseSDK.database.ServerValue.TIMESTAMP
