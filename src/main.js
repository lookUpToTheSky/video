// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible.js'
import './assets/style/reset.css'
import 'mint-ui/lib/style.min.css'
import './assets/font/iconfont.css'
import Mui from 'vue-awesome-mui';
Vue.use(Mui);

//按需引入mint 组件
import {search,cell,swipe,lazyload, swipeItem,spinner,tabbar,tabItem,tabContainer,
   tabContainerItem,header,popup,navbar, button, loadmore, infiniteScroll 
  
} from 'mint-ui';
Vue.component(search.name, search);
Vue.component(cell.name, cell);
Vue.component(swipe.name, swipe);
Vue.component(swipeItem.name, swipeItem);
Vue.component(spinner.name, spinner);
Vue.component(tabbar.name, tabbar);
Vue.component(tabItem.name, tabItem);
Vue.component(tabContainer.name, tabContainer);
Vue.component(tabContainerItem.name, tabContainerItem);
Vue.component(header.name, header);
Vue.component(popup.name, popup);
Vue.component(navbar.name, navbar);
Vue.component(button.name, button);
Vue.component(loadmore.name, loadmore);
Vue.use(infiniteScroll);
Vue.use(lazyload);
Vue.config.productionTip = false;


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
