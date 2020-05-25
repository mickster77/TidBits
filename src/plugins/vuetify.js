// import Vue from 'vue'
// import Vuetify from 'vuetify/lib'
// import 'vuetify/src/stylus/app.styl'

// Vue.use(Vuetify, {
//   iconfont: 'md',
// })

import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      light: {
        primary: '#3C5F7D',
        secondary: "DA1E12",
        // accent: '#82B1FF',
        // error: '#FF5252',
        // info: '#2196F3',
        // success: '#4CAF50',
        // warning: colors.blue,


      },
      dark: {
        primary: "#0A2E36",
        secondary: '#424242',
        accent: '#27FB6B',
        error: colors.red,
        info: '#09A129',
        success: '#14CC60',
        warning: colors.orange.darken3,
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  },
});
