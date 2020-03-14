// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import './firebase';

import Vue from 'vue';
// import VueFire from 'vuefire';
import App from './App';
import router from './router';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import vuePositionSticky from 'vue-position-sticky';
import { firestorePlugin } from 'vuefire';
import axios from 'axios';

Vue.prototype.$http = axios;
// Vue.use(VueFire);
Vue.use(BootstrapVue);
Vue.use(vuePositionSticky);
Vue.use(firestorePlugin);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
});
