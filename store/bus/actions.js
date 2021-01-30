export default {
  saveBus (context, payload) {
    if (payload.id) {
      const id = payload.id
      const data = Object.keys(payload).reduce((object, key) => {
        if (key !== 'id' && key !== 'created_at' && key !== 'updated_at' && key !== 'createdByUserId') {
          object[key] = payload[key]
        }
        return object
      }, {})
      return this.$axios
        .put('/bus/' + id, data)
        .then((response) => {
          context.commit('setBus', response.data.data)
          return response.data.data
        })
    } else {
      return this.$axios
        .post('/bus', payload)
        .then((response) => {
          context.commit('setBus', response.data.data)
          return response.data.data
        })
    }
  },

  initBuses (context, payload) {
    return this.$axios
      .get('/bus' + payload)
      .then((response) => {
        context.commit('setBuses', response.data.data)
        context.commit('setBusesMeta', response.data.meta)
        return response
      })
  },

  deleteBus (context, id) {
    return this.$axios
      .delete('/bus/' + id)
      .then((response) => {
        return response
      })
  }

}
