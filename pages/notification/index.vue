<template>
  <v-data-table
    :headers="headers"
    :items="notifications"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat class="grey lighten-3">
        <v-toolbar-title>Notifications</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title class="pa-3 grey lighten-3">
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text class="pa-0">
              <v-form ref="form">
                <v-container>
                  <v-row dense>
                    <v-col
                      cols="12"
                      md="12"
                    >
                      <v-select
                        v-model="editedItem.status"
                        outlined
                        hide-details="auto"
                        :items="statuses"
                        label="Current Situation"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="300px">
          <v-card>
            <v-card-title class="headline"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.date="{ item }">
        {{formatDate(item.date) }}
    </template>

    <template v-slot:item.emergency_button="{ item }">
      <v-chip
        :color="!item.emergency_button ? 'red': 'white'"
        dark
        small
      >
        {{ !item.emergency_button ? 'Driver has an emergency situation' : '' }}
      </v-chip>
    </template>

    <template v-slot:item.robery_button="{ item }">
      <v-chip
        :color="!item.robery_button ? 'red': 'white'"
        dark
        small
      >
        {{ !item.robery_button ? 'Driver has a Robery situation' : '' }}
      </v-chip>
    </template>

    <template v-slot:item.status="{ item }">
      <v-chip
        color= 'red'
        dark
        small
      >
        {{ item.status }}
      </v-chip>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: "Date", value: "date" },
      { text: "Id", value: "entry_id" },
      { text: "Channel", value: "channel" },
      { text: "Driver name", value: "driver_name" },
      { text: "Driver License", value: "license" },
      { text: "Bus name", value: "name" },
      { text: "Bus plate no", value: "plate_no" },
      { text: "Pulse", value: "pulse" },
      { text: "Oxyzen", value: "oxygen" },
      { text: "Temperature", value: "temperature" },
      { text: "Emergency Button", value: "emergency_button" },
      { text: "Robery Button", value: "robery_button" },
      // { text: "Latitude", value: "latitude" },
      // { text: "Lomgitude", value: "longitude" },
      // { text: "Actions", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      status: "",
    },
    defaultItem: {
      status: "",
    },
    notifications: [],
    statuses: ['Safe', 'Danger'],
    dialogDelete: false
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Situation" : "Edit Situation";
    },

    searchQuery() {
      return "";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },

    searchQuery: {
      handler(nv, ov) {
        if (nv !== ov) {
          setTimeout(() => {
            this.initialize(this.searchQuery);
          }, 300);
        }
      },
      immediate: true,
      deep: true
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.$axios
        .get("/notification" + `?channel=1293855`)
        .then(response => {
          console.log(response)
          this.notifications = response.data;
        })
        .catch(error => {
          this.$toast.error(error.response.data.message);
        });
    },

    editItem(item) {
      this.editedIndex = this.notifications.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.$refs.form.reset();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.$refs.form.validate()) {
        this.$axios
          .put('/notification/' + this.editedItem.id, this.editedItem)
          .then((response) => {
            // this.$toast.success("Data has been Updated");
              Object.assign(this.notifications[this.editedIndex], this.editedItem);
              this.initialize();
              this.close();
          })
          .catch(error => {
            // this.setErrorMessages(error.response.data.errors)
            // this.$toast.error(error.response.data.message)
            console.log(error);
          })
      } else {
        this.$toast.error("Please filled all required fields");
      }
    }
  }
};
</script>
