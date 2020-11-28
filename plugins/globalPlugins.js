import Vue from 'vue'
import validationMixin from '@/mixins/validationMixin'
import errorMessagesMixin from '@/mixins/errorMessagesMixin'

Vue.mixin({
  computed: {
    bp () {
      return this.$vuetify.breakpoint
    }
  }
})

Vue.mixin(validationMixin)
Vue.mixin(errorMessagesMixin)
