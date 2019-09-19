<template>
    <v-app>
        <v-app-bar app>
            <!--            The title/toolbar-->
            <!--            TODO: make it responsive-->
            <v-toolbar-title class="headline text-uppercase">
                <v-btn icon to="/">
                    <v-icon>mdi-home</v-icon>
                </v-btn>
                <v-btn icon to="/about">
                    <v-icon>mdi-information</v-icon>
                </v-btn>
                Vue - Astronomy Picture of the Day
                <v-btn @click="clearPictures">
                    Clear
                </v-btn>
                <v-btn @click="toggleTheme">
                    <span v-html="themeText"></span>
                </v-btn>
            </v-toolbar-title>
        </v-app-bar>

        <!--        Main view-->
        <v-content>
            <router-view/>
        </v-content>

        <!--        Footer-->
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
            return {}
        },
        methods: {
            clearPictures() {
                // Clear the selection, remove from localStorage, then get latest picture as a new start
                this.$store.dispatch('clearPictures');
                this.$store.dispatch('getPicture');
            },
            toggleTheme() {
                this.$store.dispatch('toggleTheme');
                this.$vuetify.theme.dark = !!this.themeText.includes('light');
            }
        },
        computed: {
            themeText() {
                return this.$store.state.themeText + ' theme';
            }
        },
        // Get initial theme setup
        created() {
            this.$store.dispatch('getTheme');
            this.$vuetify.theme.dark = this.themeText.includes('light');
        },
    };
</script>
