<template>
  <v-data-table
    :headers="headers"
    :items="busDriverLog"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat class="grey lighten-3">
        <v-toolbar-title>Assigned Bus-Driver Logs</v-toolbar-title>

        <v-spacer></v-spacer>
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

    <template v-slot:item.actions="{ item }">
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
    dialogDelete: false,
    headers: [
      { text: "Driver name", value: "driver_name" },
      { text: "Driver License", value: "license" },
      { text: "Bus name", value: "name" },
      { text: "Bus plate no", value: "plate_no" },
      { text: "Start Date", value: "startDate" },
      { text: "End Date", value: "endDate" }
    ],

    editedIndex: -1,
    busDriverLog: [],

  }),

  computed: {
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
        .get("/bus-driver-log")
        .then(response => {
          this.busDriverLog = response.data;
        })
        .catch(error => {
          this.$toast.error(error.response.data.message);
        });
    },

    deleteItem(item) {
      this.editedIndex = this.busDriverLog.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$axios
        .delete("/bus-driver-log/" + this.editedItem.id)
        .then(response => {
          this.$toast.success("Data has been Deleted");
          this.busDriverLog.splice(this.editedIndex, 1);
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
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  }
};
</script>
