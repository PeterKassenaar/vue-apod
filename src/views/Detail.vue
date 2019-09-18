<template>
    <v-container>
        <v-row>
            <v-col cols="12">


                <v-card height="100%">
                    <v-img v-if="picture.url"
                           class="text--white"
                           :src="picture.url">
                        <v-card-title class="align-end">{{ picture.title }}</v-card-title>
                    </v-img>
                    <v-card-text>
                        <h2>Picture of the day for {{ date }}, by {{ picture.copyright }}</h2>
                        <p>{{ picture.explanation }}
                        </p>
                        <p>
                            <v-btn to="/">Home</v-btn>
                            <v-btn :href="picture.hdurl">Get HD image</v-btn>
                        </p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    export default {
        created() {
            // fetch the requested date
            this.date = this.$route.params.date;
            this.picture = this.$store.getters.getPicture(this.date);
        }
    }
</script>
