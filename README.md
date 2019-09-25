# vue-apod

A sample Vue project using the Astronomy Picture of the Day (APOD) API by NASA.

I created this project for learning purposes and for fun. It uses:
- *VueJS* (obviously ;-)
- *vue-router* - routing from homepage to detailpage.
- *vuex* - state management, storing pics to localStorage.
- *momentJS* - formatting date & time.
- *axios* - performing http-requests.
- *Vuetify* - UI-library (https://vuetifyjs.com)
- *APOD* - NASA Astronomy Picture of the Day (APOD), an open API at https://apod.nasa.gov/apod/

## Roadmap
- <strike>Jump directly to a specific date and load that picture in the array if it's not there yet.</strike>
- <strike>Check if a requested date is already in the list of pictures, so no doubles are permitted.</strike>
- Remove a specific picture from the array.
- Share specific APOD on social media
- Media Type can be 'video'. Implement a YouTube video player.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
