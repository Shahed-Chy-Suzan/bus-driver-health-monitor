<template>
  <v-container grid-list-lg class="pa-0">
    <v-row no-gutters justify="center" align="center" :class="bp.mdAndUp ? 'mt-15' : ''">
      <v-col
        cols="12"
        sm="12"
        md="4"
        lg="4"
      >
        <Logout />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Logout from '@/components/Auth/Logout'

export default {
  layout: 'basic',
  name: 'Index',
  components: {
    Logout
  }
}
</script>

<style scoped>

</style>
