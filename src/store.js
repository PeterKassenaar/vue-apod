import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

// Tell Vue to use vuex.
Vue.use(Vuex);

// The store is *not* divided into modules,
// as this application is unlikely to have multiple modules
// in the future. This is it.
// So the complete store is in this one single store.js file.

// constants & variables in the store, coming from globals.js
import {globals} from './globals'

export default new Vuex.Store({
    //***********
    // State
    //***********
    state: {
        firstTime: true,
        loadingStatus: false,
        populated: false,
        currentPicture: '',
        pictures: [],
        errors: [],
        themeText: globals.themeTexts.dark
    },
    //***********
    // Mutations
    //***********
    mutations: {
        // Toggle loading state true|false
        SET_LOADING_STATUS(state, payload) {
            state.loadingStatus = payload;
        },
        // Fill state with found pictures from localStorage
        SET_PICTURES(state, payload) {
            state.pictures = payload;
            state.populated = true;
        },
        // Set the current active picture for the detail page
        SET_CURRENT_PICTURE(state, payload) {
            state.currentPicture = payload;
        },
        // Clear all pictures from the state
        CLEAR_SELECTION(state) {
            state.pictures = [];
            state.populated = false;
        },
        // An http-error occurred - add it to the array with errors
        ADD_ERROR(state, payload) {
            state.errors = [...state.errors, payload]
        },
        // Get the current theme
        GET_THEME(state) {
            state.themeText = localStorage.getItem(globals.storageKeyTheme)
                ? localStorage.getItem(globals.storageKeyTheme)
                : globals.themeTexts.dark;
        },
        // Toggle the theme light|dark
        TOGGLE_THEME(state) {
            state.themeText =
                state.themeText === globals.themeTexts.light
                    ? globals.themeTexts.dark
                    : globals.themeTexts.light;
            localStorage.setItem(globals.storageKeyTheme, state.themeText)
        }
    },
    //***********
    // Actions
    //***********
    actions: {
        // Main action: get a picture.
        // First check if it is already in localStorage
        getPicture(context, date) {
            // 1. Show the loading status spinner or text
            context.commit('SET_LOADING_STATUS', true);
            // 2. Check if localStorage is available
            let localStoragePictures = localStorage.getItem(globals.storageKey);
            // 3. Check if this is the first time requesting a picture.
            // If yes, set up localStorage with 10 dummy pictures.
            if (context.state.firstTime && !localStoragePictures) {
                console.log('Woot - first time accessing this app. Setting up dummy store');
                localStoragePictures = [];
                for (let i = 0; i < globals.numPictures; i++) {
                    localStoragePictures.push(globals.dummyPicture)
                }
            } else {
                // 4. Already pics in localStorage. Parse them to an array
                localStoragePictures = JSON.parse(localStoragePictures);
            }
            // 5. Check if a specific date is requested, add it to the url
            globals.url = globals.API_URL;

            // 5a. Check for doubles (i.e. see if the date is already in the array)
            let notInArray = true;
            let pictureInArrayIndex = 0;
            if (date) {
                localStoragePictures.forEach((picture, idx) => {
                    if (picture.date === date) {
                        notInArray = false;
                        pictureInArrayIndex = idx;
                    }
                })
            }
            // 6. Perform HTTP-request if a specific date is requested
            if (date && notInArray) {
                globals.url = `${globals.API_URL}&date=${date}`;
                axios.get(globals.url)
                    .then(result => {
                        context.commit('SET_LOADING_STATUS', false);
                        console.log(result.data);
                        // 6a. Add new picture to the beginning of the array
                        // check if media_type is 'image', (it can be 'video', which throws a Vuetify error)
                        // TODO: implement video player.
                        if (result.data.media_type !== 'image') {
                            result.data.url = ''
                        }
                        localStoragePictures.unshift(result.data);

                        // 6b. Remove last element if there are too many items
                        if (localStoragePictures.length > globals.numPictures) {
                            localStoragePictures.pop();
                        }

                        // 6c. Commit found picture(s) to the store
                        context.commit('SET_PICTURES', localStoragePictures);
                        context.commit('SET_CURRENT_PICTURE', localStoragePictures[0]);

                        // 6d. Commit pictures to localStorage for persistence.
                        localStorage.setItem(globals.storageKey, JSON.stringify(localStoragePictures))
                    })
                    .catch(err => {
                        context.commit('SET_LOADING_STATUS', false);
                        context.commit('SET_PICTURES', []);
                        context.commit('ADD_ERROR', err);
                    })
            } else {
                // 7. No specific date requested, commit current array
                context.commit('SET_LOADING_STATUS', false);
                context.commit('SET_PICTURES', localStoragePictures);
                context.commit('SET_CURRENT_PICTURE', localStoragePictures[pictureInArrayIndex]);
            }
        },
        // Set the current picture, based on requested date
        setPicture(context, date) {
            const currentPicture = context.state.pictures.find(picture => picture.date === date);
            context.commit('SET_CURRENT_PICTURE', currentPicture)
        },
        // Clear store & localStorage
        clearPictures(context) {
            localStorage.clear();
            context.commit('CLEAR_SELECTION')
        },
        // Toggle the theme light|dark
        toggleTheme(context) {
            context.commit('TOGGLE_THEME')
        },
        // Get current theme setting light|dark
        getTheme(context) {
            context.commit('GET_THEME')
        }
    }
})
