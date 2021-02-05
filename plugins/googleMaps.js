import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAJP131A83FMgYkjVQ1B42FlGt_m3n37mc',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    installComponents: true
  }
})
