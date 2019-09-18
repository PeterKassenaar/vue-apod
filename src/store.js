import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import moment from 'moment';

Vue.use(Vuex);

// variables in the store
const api_url = 'https://api.nasa.gov/planetary/apod?api_key=czexl0tfSCS0YhIROFnXASqcY7LHyFMHHEGoV8iU';
let url = '';
// dummy picture, to show empty spots on the homepage
let dummyPicture = {
    "date": -1
};
// num pictures in localStorage
const numPictures = 10;
const storageKey = 'vue-apod';


export default new Vuex.Store({
    state: {
        firstTime: true,
        loadingStatus: false,
        currentPicture: '',
        pictures: [],
        errors: []
    },
    mutations: {
        SET_LOADING_STATUS(state, payload) {
            state.loadingStatus = payload;
        },
        SET_SELECTION(state, payload) {
            state.currentPicture = payload[0];
            state.pictures = payload;
        },
        CLEAR_SELECTION(state) {
            state.pictures = [];
        },
        ADD_ERROR(state, payload) {
            state.errors = [...state.errors, payload]
        }
    },
    actions: {
        // Get a picture. First check if it is already in localStorage
        getPicture(context, date) {
            // Show the loading status spinner
            context.commit('SET_LOADING_STATUS', true);
            // Check if localStorage is available
            let localStoragePictures = localStorage.getItem(storageKey);
            // check if this is the first time requesting a picture.
            //  If yes, set up localStorage with 10 dummy pictures.
            if (context.state.firstTime && !localStoragePictures) {
                console.log('Woot - first time accessing this app. Setting up dummy store');
                localStoragePictures = [];
                for (let i = 0; i < 10; i++) {
                    localStoragePictures.push(dummyPicture)
                }
            } else {
                // Already pics in localStorage. Parse them to an array
                localStoragePictures = JSON.parse(localStoragePictures);
            }
            // check if a specific date is requested
            url = api_url;
            if (date) {
                url = `${api_url}&date=${date}`;
            }
            // Check if requested date is already in the array
            let inArray = false;
            let currentDate = moment().format('YYYY-MM-DD');
            localStoragePictures.forEach(picture => {
                if (picture.date === currentDate) {
                    inArray = true;
                }
            });
            // No, perform request
            if (date || !inArray) {
                axios.get(url)
                    .then(result => {
                        context.commit('SET_LOADING_STATUS', false);
                        console.log(result.data);
                        // add new picture to the beginning of the array
                        localStoragePictures.unshift(result.data);

                        // remove last element if there are too many items
                        if (localStoragePictures.length > numPictures) {
                            localStoragePictures.pop();
                        }
                        // console.log(localStoragePictures);
                        context.commit('SET_SELECTION', localStoragePictures);
                        localStorage.setItem(storageKey, JSON.stringify(localStoragePictures))
                    })
                    .catch(err => {
                        context.commit('SET_LOADING_STATUS', false);
                        context.commit('SET_SELECTION', []);
                        context.commit('ADD_ERROR', err);
                    })
            } else {
                // Yes, commit current array
                context.commit('SET_LOADING_STATUS', false);
                context.commit('SET_SELECTION', localStoragePictures);
            }
        },
        clearPictures(context) {
            localStorage.clear();
        }
    },
    getters: {
        getPicture: (state) => (date) => {
            console.log('Specific date requested (detail page): ', date);
            return state.pictures.find(picture => picture.date === date)
        }
    }
})
