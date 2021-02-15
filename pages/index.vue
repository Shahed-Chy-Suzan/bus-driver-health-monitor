<template>
  <div class="mt-15 pt-15">
    <h3 class="text-center">
      Welcome to
    </h3>
    <h1 class="text-center blue--text mb-2">
      Bus Driver Health Monitoring System
    </h1>
    <!-- <v-card
      class="mx-auto"
      max-width="500"
    >
      <v-img
        src="https://image.freepik.com/free-vector/picture-bus-with-busdriver-inside-standing-bus-stop-style-illustration_285336-325.jpg"
        height="350px"
      ></v-img>
    </v-card> -->
  </div>
</template>

<script>
import User from "@/static/helpers/User.js";
  export default {
    created(){
      if (!User.loggedIn()) {
		    this.$router.push('/login')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
