import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAqem4TOnXJIgCDf4juIJ9qH1uzBaadZDY',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    installComponents: true
  }
})
