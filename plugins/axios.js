export default function ({ app, store, $axios }) {
  $axios.interceptors.request.use(function (config) {
    if (store.getters['auth/auth']) {
      config.headers.Authorization = `Bearer ${store.getters['auth/auth']}`
      config.proxy = true
    }
    return config
  })
}
