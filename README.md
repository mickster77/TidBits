# k-travel

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

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Firebase 

### firebase login
firebase login

### firebase init
firebase init

### firebase cloud functions
To deploy on could functions:
firebase deploy --only functions

## Git

### Youtube
https://www.youtube.com/watch?v=wMqukSKYcvU



v 1.03 (released 6/12/19)-> 
-added verions number to footer
-added kay to admin email list

v 1.04 (released 6/13/19 )
-added william to email list (completed)
-added number of other travelers to [Home, newRequest, ViewRequest] to track the number of other travels (complete)

v 1.05 (released)
-refactored to use vuex
-modified data table to show min 10 entries
-add cloud function to send email when a new request is added
--hide delete button from dropdown since table does not update

v 1.06 (released)
--added loading spinner to submit button
--added william to email and me to bcc line
-fixed departing timeframe bug

v 1.07 (Released)
--added UserEmail field to newRequest

v 1.08 (Released)
--added FAQ
--added burn list
--added angry email functionality
--Revise signup to not use "users" collection

**open issues: 
-data table does not populate on load
-fix dropdown delete button
-add template 