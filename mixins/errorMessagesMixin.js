
export default {
  methods: {
    setErrorMessages (messages) {
      for (const field in messages) {
        this.errorMessages[field] = messages[field]
      }
    },

    resetErrorMessages (messages) {
      for (const field in messages) {
        this.errorMessages[field] = ''
      }
    }
  }
}
