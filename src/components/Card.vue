<template>
    <div>
        <!--    Card with Picture of the Day, Author, Date, etc -->
        <v-card height="100%" class="flexcard" v-if="picture.date !== -1">
            <v-img v-if="picture.url"
                   class="text--white"
                   height="200px"
                   :src="picture.url">
                <v-card-title class="align-end">{{ picture.title }}</v-card-title>
            </v-img>
            <v-card-title v-else>{{ picture.title }}</v-card-title>

            <v-card-text class="grow">
                {{ picture.date }}, by {{ picture.copyright }}
            </v-card-text>

            <v-card-actions>
                <v-btn width="100%" :to="`/detail/${picture.date}`">Learn more</v-btn>
            </v-card-actions>
        </v-card>
        <!--    Empty Card-->
        <v-card v-else height="100%" class="flexcard">
            <v-img class="text--white"
                   height="200px"
                   src="../assets/dummy-image.jpg">
                <v-card-title class="align-end">No picture yet...</v-card-title>
            </v-img>
            <v-card-text class="grow">
                No picture yet....
            </v-card-text>
            <v-card-actions>
                <v-btn disabled color="indigo" width="100%" :to="`/detail/${picture.date}`">Learn more</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "Card",
        props: ['picture']
    }
</script>

<style scoped>
    .flexcard {
        display: flex;
        flex-direction: column;
    }
</style>
