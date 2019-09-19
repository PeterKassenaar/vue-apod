<template>
    <v-container>
        <v-row>
            <v-col md="8" xs="12">
                <h2>Welcome to Vue - Astronomy Picture of the day (APOD)</h2>
                <p>
                    I created this project for fun and for learning purposes in my classes. It uses:
                </p>
                <ul>
                    <li>VueJS</li>
                    <li>vue-router</li>
                    <li>vuex</li>
                    <li>axios</li>
                    <li>Vuetify</li>
                    <li>NASA Astronomy of the Day API</li>
                </ul>
                <h2>Shameless plug</h2>
                <p><em>I am a professional instructor, developer and author. Contact me if you want to learn more about
                    Vue
                    or other front-end techniques. I'll be happy to come to your organization and arrange a
                    training.</em></p>
                <h2>Usage</h2>
                <p>
                    The app creates a list of 10 Pictures of the Day. You can pick a date from the top datepicker on the
                    home page. It will then add the picture of that day to your list.
                    If you pick an 11th picture, the oldest one is removed from the list.
                </p>
                <p>
                    Pictures are stored on your local device and are fetched on restart.
                </p>
                <h2>Github</h2>
                <p>
                    You can view the source code for this project and make alterations to it or send PRs on Github.
                    Visit <a
                        href="https://github.com/PeterKassenaar/vue-apod">github.com/PeterKassenaar/vue-apod</a> for
                    more information.
                </p>
                <h2>Copyright</h2>
                <p>
                    Copyright (C) 2019 - Peter Kassenaar, <a href="mailto:info@kassenaar.com">info@kassenaar.com</a>
                </p>
            </v-col>

        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "About"
    }
</script>

<style scoped>

</style>
