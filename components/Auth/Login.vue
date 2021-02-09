<template>
  <div>
    <v-card flat outlined class="text-center" align="center">
      <v-toolbar dark class="text-center" flat>
        <v-spacer />
        <v-toolbar-title class="text-uppercase text-center font-weight-bold">
          Admin Login
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="email"
                color="secondary"
                :rules="emailRules"
                outlined
                shaped
                label="Email"
                hide-details="auto"
                required
                prepend-icon="mdi-account"
                type="email"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="password"
                outlined
                color="secondary"
                :rules="passwordRules"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                hide-details="auto"
                shaped
                required
                prepend-icon="mdi-lock"
                @click:append="showPassword = !showPassword"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <!-- <v-divider></v-divider> -->
      <v-card-actions class="mb-5">
        <v-btn
          text
          small
          class="pl-0 text-capitalize"
          color="primary"
          router
          to="registration"
        >Create account?
        </v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          :loading="isLoading"
          @click="login()"
        >Sign in
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="snackbar" :color="errorColor" top right>
      {{ errorMessage }}
      <template>
        <v-btn color="white" text @click="false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'

import User from "@/static/helpers/User.js";

export default {
  props: {
    isDialog: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    }
  },

  data: () => ({
    isLoading: false,
    valid: true,
    showPassword: false,
    email: "",
    password: "",
    emailRules: [v => !!v || "Email is required"],

    passwordRules: [v => !!v || "Password is required"],

    isLoggedIn: false,
    snackbar: false,
    errorMessage: "",
    errorColor: ""
  }),

  computed: {
    // ...mapGetters({
    //   authToken: 'auth/auth'
    // }),
    loginInfo() {
      return {
        email: this.email,
        password: this.password
      };
    }
  },

  created() {
    if (User.loggedIn()) {
      this.$router.push("/");
    }
  },

  methods: {
    validate() {
      this.$refs.form.validate();
    },

    resetValidation() {
      this.$refs.form.resetValidation();
    },

    // goToSourceDestination () {
    //   if (this.isDialog) {
    //     this.$emit('closeAuthentication')
    //   } else {
    //     this.$router.push('/')
    //   }
    // },

    login() {
      this.isLoading = true;
      if (!this.$refs.form.validate()) {
        this.errorMessage = "Please input valid data";
        this.errorColor = "error";
        this.snackbar = true;
        this.isLoading = false;
      } else {
        this.resetValidation();

        // this.$store.dispatch('auth/postLogin', this.loginInfo)
        this.$axios
          .post("/auth/login", this.loginInfo)
          .then(response => {
            User.responseAfterLogin(response);
            this.$toast.success("You are logged in!");
            // this.goToSourceDestination()
            this.$router.push("/");
          })
          // eslint-disable-next-line handle-callback-err
          .catch(error => {
            this.errorMessage = "Invalid Credentials";
            this.errorColor = "error";
            this.snackbar = true;
            // eslint-disable-next-line no-console
            // console.log(error);
            // console.log(error.response.data);
            // this.$toast.error("Email or Password Invalid");
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    }

    // checkAuth (next, path) {
    //   // only admin-group has the access to any property without association
    //   if (this.authToken !== null) {
    //     this.$router.push('/')
    //   } else {
    //     this.$router.push('/auth')
    //   }
    // }
  }
};
</script>
