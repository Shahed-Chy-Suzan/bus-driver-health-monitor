export default {
  saveBrand (context, payload) {
    if (payload.id) {
      const id = payload.id
      const data = Object.keys(payload).reduce((object, key) => {
        if (key !== 'id' && key !== 'created_at' && key !== 'updated_at' && key !== 'createdByUserId' && key !== 'category') {
          object[key] = payload[key]
        }
        return object
      }, {})
      return this.$axios
        .put('/brand/' + id + '?include=brand.category', data)
        .then((response) => {
          context.commit('setBrand', response.data.data)
          return response.data.data
        })
    } else {
      return this.$axios
        .post('/brand?include=brand.category', payload)
        .then((response) => {
          context.commit('setBrand', response.data.data)
          return response.data.data
        })
    }
  },

  initBrands (context, payload) {
    return this.$axios
      .get('/brand' + payload)
      .then((response) => {
        context.commit('setBrands', response.data.data)
        context.commit('setBrandsMeta', response.data.meta)
        return response
      })
  },

  deleteBrand (context, id) {
    return this.$axios
      .delete('/brand/' + id)
      .then((response) => {
        return response
      })
  }

}
