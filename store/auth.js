// eslint-disable-next-line import/named
const loginQuery = ''

function getAuthToken () {
  return null
}

function getUserData () {
  return null
  // const token = localStorage.getItem(dbazarUserToken)
  // return token !== null ? JSON.parse(localStorage.getItem(dbazarUserToken)) : null
}

export const state = () => {
  return {
    auth: getAuthToken(),
    userData: getUserData(),
    accessValidity: true
  }
}

export const getters = {
  userData (state) {
    return state.userData
  },

  auth (state) {
    return state.auth
  },

  accessValidity (state) {
    return state.accessValidity
  }
}

export const mutations = {
  setAuth (state, auth) {
    state.auth = auth
    Cookie.set('healthMonitorAuthToken', auth) // saving token in cookie for server rendering
    localStorage.setItem('healthMonitorAuthToken', auth)
  },

  userData (state, userData) {
    state.userData = userData
    localStorage.setItem('healthMonitorUserData', JSON.stringify(userData))
  },

  setAccessValidity (state, bool) {
    state.accessValidity = bool
  },

  purgeAuth (state) {
    state.auth = null
    state.userData = null
  }
}

export const actions = {
  postLogin (context, payload) {
    return this.$axios
      .post(`/auth/login`, payload)
      .then((response) => {
        context.commit('setAuth', response.data.access_token)
        context.commit('userData', response.data)
        return response
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },

  saveUserData (context, payload) {
    const id = payload.id
    delete payload.id
    return this.$axios
      .put('/user/' + id, payload)
      .then((response) => {
        const userData = response.data.data
        // console.log('save user:', userData)
        context.commit('userData', userData)
        return response
      })
      .catch((error) => {
        // console.log("error:", JSON.stringify(error.response.data))
        // return error.response.data
        return Promise.reject(error)
      })
  },

  setAccessValidity (context, payload) {
    return context.commit('setAccessValidity', payload)
  },

  logout (context) {
    context.commit('purgeAuth')
  }
}
