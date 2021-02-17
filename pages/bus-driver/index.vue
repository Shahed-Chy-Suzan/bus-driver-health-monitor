<template>
  <v-data-table
    :headers="headers"
    :items="busDrivers"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat class="grey lighten-3">
        <v-toolbar-title>Assigned Bus-Driver</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Bus-Driver
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="pa-3 grey lighten-3">
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text class="pa-0">
              <v-form ref="form">
                <v-container>
                  <v-row dense>
                    <v-col cols="12" md="12">
                      <v-select
                        v-model="editedItem.driver_name"
                        :items="drivers"
                        item-text="driver_name"
                        item-value="id"
                        return="id"
                        outlined
                        hide-details="auto"
                        label="Driver Name"
                      />
                    </v-col>
                    <v-col cols="12" md="12">
                      <v-select
                        v-model="editedItem.channel"
                        :items="buses"
                        item-text="channel"
                        item-value="channel"
                        return="channel"
                        outlined
                        hide-details="auto"
                        label="Bus Device Id"
                      />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="editedItem.startDate"
                        label="Start Date"
                        outlined
                        hide-details="auto"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-select
                        v-model="editedItem.driving_status"
                        outlined
                        hide-details="auto"
                        :items="statuses"
                        label="Status"
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
              <v-btn color="red darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.driving_status="{ item }">
      <v-chip
        :color="getColor(item.driving_status)"
        dark
        small
        class="text-capitalize"
      >
        {{ item.driving_status }}
      </v-chip>
    </template>

    <template v-slot:item.status="{ item }">
      <v-chip
        :color="getStatusColor(item.status)"
        dark
        small
        class="text-capitalize"
      >
        {{ item.status }}
      </v-chip>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-btn :to="'/bus-driver/profile/' + item.id" class="mr-5" small outlined>
      View
      </v-btn>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
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
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Driver Id",
        align: "start",
        value: "driverId"
      },
      { text: "Driver name", value: "driver_name" },
      { text: "Bus plate no", value: "plate_no" },
      { text: "Bus name", value: "name" },
      { text: "Start Date", value: "startDate" },
      { text: "Driving Status", value: "driving_status" },
      { text: "Status", value: "status" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      driver_name: null,
      channel: null,
      startDate: null,
      driving_status: null
    },
    defaultItem: {
      driver_name: null,
      channel: null,
      startDate: null,
      driving_status: null
    },

    statuses: ['on-duty', 'leisure'],
    busDrivers: [],
    drivers:[],
    buses:[],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Bus-Driver" : "Edit Bus-Driver";
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
    this.getDriverLicense();
    this.getBusPlateNo();
  },

  methods: {
    initialize() {
      this.$axios
        .get("/bus-driver")
        .then(response => {
          this.busDrivers = response.data;
        })
        .catch(error => {
          this.$toast.error(error.response.data.message);
        });
    },

    editItem(item) {
      this.editedIndex = this.busDrivers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.busDrivers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$axios
        .delete("/bus-driver/" + this.editedItem.id)
        .then(response => {
          this.$toast.success("Data has been Deleted");
          this.busDrivers.splice(this.editedIndex, 1);
        })
        .catch(error => {
          this.$toast.error(error.response.data.message);
        })
        .finally(() => {
          this.initialize();
          this.closeDelete();
        });
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
        if (this.editedIndex > -1) {
          this.$axios
            .put('/bus-driver/' + this.editedItem.id, this.editedItem)
            .then((response) => {
              this.$toast.success("Data has been Updated");
                Object.assign(this.busDrivers[this.editedIndex], this.editedItem);
                this.initialize();
                this.close();
            })
            .catch(error => {
              // this.setErrorMessages(error.response.data.errors)
              this.$toast.error(error.response.data.message)
              console.log(error);
            })
        } else {
          this.$axios
            .post('/bus-driver', this.editedItem)
            .then((response) => {
              this.$toast.success("Data has been saved");
                this.busDrivers.push(response.data.data);
                this.initialize();
                this.close();
            })
            .catch(error => {
              // this.setErrorMessages(error.response.data.errors)
              this.$toast.error(error.response.data.message)
              console.log(error.response.data)
              console.error(error.response.data)
            })
        }
      } else {
        this.$toast.error("Please filled all required fields");
      }
    },

    getColor (status) {
      if (status === 'on-duty') { return 'success' } else { return 'yellow' }
    },

    getStatusColor (status) {
      if (status === 'safe') {
         return 'success' 
        }
      else if(status === 'moderate') { 
          return 'yellow darken-3' 
        } 
      else {
        return 'danger'
      }
    },

    getDriverLicense(){
      this.$axios.get('/driver')
      .then(response => {
        this.drivers = response.data;
      })
    },

    getBusPlateNo(){
      this.$axios.get('/bus')
      .then(response => {
        this.buses = response.data;
      })
    }
  }
};
</script>
