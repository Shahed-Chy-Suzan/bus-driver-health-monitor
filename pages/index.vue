<template>
  <div>

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
