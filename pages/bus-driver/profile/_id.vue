<template>
    <div>
        <v-container>
            <v-row align="start" justify="start">
                <v-col cols="12">
                    <v-card-title class="text-center white--text primary pa-3">
                        Driver Status
                    </v-card-title>
                </v-col>
                <v-col cols="4">
                    <v-avatar tile size="350" color="grey">

                    </v-avatar>
                </v-col>
                <v-col cols="8">
                    <v-card outlined>
                        <v-card-text>
                            <v-list two-line>
                                <v-list-item>
                                    <v-list-item-icon>
                                    <v-icon color="indigo">
                                        mdi-account-people
                                    </v-icon>
                                    </v-list-item-icon>

                                    <v-list-item-content>
                                    <v-list-item-title>{{ driver && Object.keys(driver).length  ? driver.driver_name : '' }}</v-list-item-title>
                                    <v-list-item-subtitle>Name</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-icon>
                                    <v-icon color="indigo">
                                        mdi-phone
                                    </v-icon>
                                    </v-list-item-icon>

                                    <v-list-item-content>
                                        <v-list-item-title>{{ driver && Object.keys(driver).length  ? driver.phone : '' }}</v-list-item-title>
                                     <v-list-item-subtitle>Phone</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-action></v-list-item-action>

                                    <v-list-item-content>
                                     <v-list-item-title>{{ driver && Object.keys(driver).length  ? driver.license : '' }}</v-list-item-title>
                                    <v-list-item-subtitle>License No</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-action></v-list-item-action>

                                    <v-list-item-content>
                                     <v-list-item-title>{{ driver && Object.keys(driver).length  ? driver.address : '' }}</v-list-item-title>
                                    <v-list-item-subtitle>Address</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item>
                                    <v-list-item-action></v-list-item-action>

                                    <v-list-item-content>
                                     <v-list-item-title>{{ driver && Object.keys(driver).length  ? driver.experience_year : '' }}</v-list-item-title>
                                    <v-list-item-subtitle>Year of Experience</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                             </v-list>
                        </v-card-text>
                    </v-card>
                </v-col>
                 <v-col cols="12">
                    <v-card outlined>
                        <v-card-title class="pa-3 primary white--text">
                            Health Conditions
                        </v-card-title>

                        <v-card-text>
                        <v-data-table
                            flat
                            :headers="headers"
                            :items="notifications"
                            class=""
                        >
                        
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
                                <v-btn small color="primary">
                                    view on map
                                </v-btn>
                            </template>
                        </v-data-table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            driver: {},
            notifications: [],
            headers: [
                { text: "Date", value: "date" },
                { text: "Id", value: "entry_id" },
                { text: "Driver name", value: "driver_name" },
                { text: "Bus name", value: "name" },
                { text: "Bus plate no", value: "plate_no" },
                { text: "Pulse", value: "pulse" },
                { text: "Oxyzen", value: "oxygen" },
                { text: "Temperature", value: "temperature" },
                { text: "Emergency Button", value: "emergency_button" },
                { text: "Robery Button", value: "robery_button" },
                { text: "Latitude", value: "latitude" },
                { text: "Lomgitude", value: "longitude" },
                { text: "Actions", value: "actions", sortable: false }
                ],
        }
    },

    computed: {
        driverId() {
            return this.$route.params.id
        }
    },

    watch: {
        driverId: {
            handler(nv, ov) {
                if(this.driverId !== null) {
                    this.getTheDriver()
                }
            },
            deep: true,
            immediate: true
        }
    },

    methods: {
        getTheDriver() {
            this.$axios.get('/driver/' + this.driverId)
            .then(response => {
                this.driver = response.data
                this.initializeNotification()
            })
            .catch(error => {
                this.$toast.error('Server error')
            })
        },

        initializeNotification() {
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
    }
}
</script>