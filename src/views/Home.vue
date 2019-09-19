<template>
    <v-container>
        <i v-if="loading">Please stand by - loading data.</i>
        <!--        Menu with the datepicker, seee https://vuetifyjs.com/en/components/date-pickers-->
        <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="290px">
            <template v-slot:activator="{ on }">
                <v-text-field
                        v-model="date"
                        label="pick a date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker
                    v-model="date"
                    min="1995-06-21"
                    :max="maxDate"
                    scrollable>
                <div class="flex-grow-1"></div>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="getPicture(date)">OK</v-btn>
            </v-date-picker>
        </v-menu>
        <!--        Row with cards, containing all pictures, responsive layout -->
        <v-row>
            <v-col md="4" xs="12" v-for="(picture, index) of pictures" :key="index">
                <Card :picture="picture"></Card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Card from "../components/Card";

    export default {
        components: {Card},
        data() {
            return {
                date: new Date().toISOString().substr(0, 10),
                maxDate: new Date().toISOString().substr(0, 10),
                menu: false,
            }
        },
        methods: {
            getPicture(date) {
                console.log('Get new picture for::', date);
                this.menu = false;
                this.$store.dispatch('getPicture', date);
            }
        },
        computed: {
            loading() {
                return this.$store.state.loadingStatus;
            },
            pictures() {
                return this.$store.state.pictures;
            }
        },
        created() {
            this.$store.dispatch('getPicture')
        }
    };
</script>
