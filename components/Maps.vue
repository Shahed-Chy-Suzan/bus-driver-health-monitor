<template>
  <div>
    <div class=" blue-grey darker-3 text-xs-left py-2">
      <strong><h3 class="white--text title ml-3">Driver Location</h3> </strong>
    </div>
    <gmap-map
      ref="themap"
      :options="{
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: true
      }"
      :center="center"
      :zoom="zoom"
      style="width:100%;  height: 500px;"
    >
      <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false" />

      <gmap-marker
        v-for="(m, index) in markers"
        :key="index"
        :title="m.title"
        :icon="m.icon"
        :position="m.position"
        :options="m.labelClass"
        :clickable="true"
        :draggable="false"
        @click="toggleInfoWindow(m,index)"
      />
    </gmap-map>
  </div>
</template>

<script>
import { gmapApi } from 'vue2-google-maps'
import buildingMarkerIcon from '@/assets/buildingMarkerIcon.svg'

export default {
  name: 'GoogleMap',

  props: {
    latitude: {
      type: [String, Number],
      required: false,
      default() {
        return 0.0
      }
    },

    longitude: {
      type: [String, Number],
      required: false,
      default() {
        return 0.0
      }
    }
  },


  data() {
    return {
      center: { lat: 23.685, lng: 90.3563 },
      markers: [],
      zoom: 7,
      properties: [],
      pmsData: {},
      infoOptions: {
        content: '',
        //optional: offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
    }
  },
  computed: {
    google: gmapApi
  },

  methods: {
    addMarker() {
      const iconUrl = buildingMarkerIcon
      this.markers = []
  
      const marker = {
        lat: parseFloat(this.latitude),
        lng: parseFloat(this.longitude),
      }
      this.markers.push({ 
        position: marker,
        icon: {
            url: iconUrl,
            scaledSize: {width: 40, height: 75},
            labelOrigin: {x: 20, y: 60}
        },
        labelContent: {
          text: 'Driver Location',
          color: "#eb3a44",
          fontSize: "16px",
          fontWeight: "bold",
        },
        title: 'Driver Location',
      })
      this.center = marker

      this.geolocate()
    },

    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    },

    toggleInfoWindow(marker, idx) {
      this.infoWindowPos = marker.position
      this.infoOptions.content = marker.infoText
      // check if its the same marker that was selected if yes toggle
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      }
      // if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true
        this.currentMidx = idx
        this.zoom=16
        this.center=marker.position
      }
    },
  }
}
</script>
