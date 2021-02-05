import Vue from 'vue'
import moment from 'moment'
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

Vue.mixin({
  methods: {
    formatDate (date) {
      return moment(date).format('lll')
    }
  }
})