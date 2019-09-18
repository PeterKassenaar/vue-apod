<template>
    <v-app>
        <v-app-bar app>
            <v-toolbar-title class="headline text-uppercase">
                <v-btn to="/">
                    Vue - Astronomy Picture of the Day
                </v-btn>
                <!--                <v-date-picker v-model="date" @input="getPicture($event)"></v-date-picker>-->
                <v-btn @click="clearPictures">
                    Clear
                </v-btn>

            </v-toolbar-title>
        </v-app-bar>

        <v-content>
            <router-view/>
        </v-content>

        <v-footer app>
            <v-col class="text-center">
                Created by <a href="https://www.kassenaar.com" target="_blank">Peter Kassenaar</a>,
                data from the <a href="https://api.nasa.gov/api.html#apod" target="_blank">NASA APOD API</a>.
            </v-col>
        </v-footer>
    </v-app>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {

            }
        },
        methods: {
            clearPictures() {
                // CLear the selection, then get latest picture
                this.$store.dispatch('clearPictures');
                this.$store.dispatch('getPicture');
            },
        },

        created() {
            this.$vuetify.theme.dark = true;
        },
    };
</script>
