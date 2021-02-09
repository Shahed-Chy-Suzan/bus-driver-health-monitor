<template>
  <div>

  </div>
</template>

<script>
  export default {
    created(){
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$toast.success("Logout successfully");
      this.$router.push('/login')
    }
  }
</script>

<style lang="scss" scoped>

</style>
