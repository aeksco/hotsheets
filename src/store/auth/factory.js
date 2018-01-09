import { REGISTER_ROUTE, SESSION_ROUTE } from './constants'

export default {
  // register
  register (attributes) {
    return new Promise((resolve, reject) => {
      return fetch(REGISTER_ROUTE, {
        method: 'post',
        body: JSON.stringify(attributes),
        headers: new Headers({ 'Content-Type': 'application/json' })
      })
      .then((response) => { return response.json() })
      .then((json) => { return resolve(json) })
      .catch((err) => { return reject(err) })
    })
  },

  // authenticate
  authenticate (attributes) {
    return new Promise((resolve, reject) => {
      // return fetch(AUTHENTICATE_ROUTE, {
      //   method: 'post',
      //   body: JSON.stringify(attributes),
      //   headers: new Headers({ 'Content-Type': 'application/json' })
      // })
      // .then((response) => { return response.json() })
      // .then((json) => { return resolve(json) })
      // .catch((err) => { return reject(err) })
      window.gapi.auth.authorize({
        'client_id': '540231188701-t4pjco404n921r9k347jo2dpp0pgell9.apps.googleusercontent.com',
        'scope': ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/userinfo.email'],
        'immediate': false
      }, (result) => {
        return resolve(result)
      })
    })
  },

  // getSession
  getSession (token) {
    return new Promise((resolve, reject) => {
      return fetch(SESSION_ROUTE, {
        headers: new Headers({ 'Authorization': 'JWT ' + token })
      })
      .then((response) => { return response.json() })
      .then((json) => { return resolve(json) })
      .catch((err) => { return reject(err) })
    })
  }
}
