import Vue from 'vue';
import compositionAPI from '@vue/composition-api';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(compositionAPI);

new Vue({
  el: '#app',
  render: (h) => h(App),
});
