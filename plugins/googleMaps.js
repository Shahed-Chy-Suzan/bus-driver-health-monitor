import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC-jEgZ0WyAiQhTyaAUA3SPY_96rjB9OzA',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    installComponents: true
  }
})
