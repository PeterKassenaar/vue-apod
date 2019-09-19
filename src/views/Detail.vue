<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card height="100%" v-if="picture">
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
                            <v-btn v-if="picture.hdurl" :href="picture.hdurl">Get HD image</v-btn>
                        </p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    export default {
        //
        created() {
            // fetch the requested date
            this.date = this.$route.params.date;
            if (!this.$store.state.populated) {
                // store is not populated yet, first fill it.
                this.$store.dispatch('getPicture', this.date);
            }
            this.$store.dispatch('setPicture', this.date);
        },
        computed:{
            picture(){
                return  this.$store.state.currentPicture;
            }
        }
    }
</script>
