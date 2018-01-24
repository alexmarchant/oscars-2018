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

// FirebaseUI config.
const uiConfig = {
  signInSuccessUrl: hostUrl,
  signInOptions: [{
      provider: FirebaseSDK.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true,
  }],
  tosUrl: hostUrl
}
const firebaseUI = new FirebaseUISDK.auth.AuthUI(firebase.auth())

export function renderFirebaseUI(containerID) {
  firebaseUI.start(containerID, uiConfig)
}
