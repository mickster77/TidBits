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
    themes: {
      light: {
        primary: '#3f51b5',
        // primary: '#aaaaaa',
      },
      dark: {
        primary: colors.blue,

      }
    },
    dark: true
  },
  icons: {
    iconfont: 'mdi',
  },
});
