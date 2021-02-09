<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="false"
      fixed
      clipped
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title v-text="title" />
      <v-spacer />
        <v-btn
          offset-y
          left
          color="success"
          to="/logout"
        >
        <v-icon class="mr-2">mdi-login-variant</v-icon>
        Log Out
        </v-btn>
      <!-- </v-menu> -->
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-bus',
          title: 'Bus',
          to: '/bus'
        },
        {
          icon: 'mdi-account',
          title: 'Driver',
          to: '/driver'
        },
        {
          icon: 'mdi-apps',
          title: 'Assign Bus-Driver',
          to: '/bus-driver'
        },
        {
          icon: 'mdi-apps',
          title: 'Bus Driver Log',
          to: '/bus-driver-log'
        },
        // {
        //   icon: 'mdi-apps',
        //   title: 'Bus Service Log',
        //   to: '/bus-service-log'
        // },
        {
          icon: 'mdi-bell-ring',
          title: 'Notification',
          to: '/notification'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Bus Driver Health Monitor',

      profileInfo: [],
    }
  }
}
</script>
