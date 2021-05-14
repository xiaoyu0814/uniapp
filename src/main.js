import Vue from 'vue'
import App from './App'
import http from './util/http/index';
import storage from './util/storage/storage';
import permission from './util/permission.js';
import util from './util/util.js';

Vue.prototype.$http = http;
Vue.prototype.$storage = storage;
Vue.prototype.$permission = permission;
Vue.prototype.$util = util;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
