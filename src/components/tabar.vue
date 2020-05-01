<template>
  <div id="tabar " ref="tabar"> 
    <router-view/>
    <div class="bottomBar">
      <mt-tabbar v-model="selected" :fixed="true">
        <mt-tab-item id="1">
          <i slot="icon" class="iconfont icon-home"></i>
          首页
        </mt-tab-item>
        <mt-tab-item id="2">
          <i slot="icon" class="iconfont icon-remen"></i>
          热门
        </mt-tab-item>
        <mt-tab-item id="3">
          <i slot="icon" class="iconfont icon-vip-i"></i>
          vip会员
        </mt-tab-item>
        <mt-tab-item id="4">
          <i slot="icon" class="iconfont icon-mianfei1"></i>
          BiBiV
        </mt-tab-item>
        <mt-tab-item id="5">
          <i slot="icon" class="iconfont icon-me"></i>
          个人中心
        </mt-tab-item>
      </mt-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabar',
  data () {
    return {
      selected: '1'
    }
  },
  created () {
      switch(this.$route.path) {
          case '/': this.selected = '1';break;
          case '/hot': this.selected = '2';break;
          case '/vip': this.selected = '3';break;
          case '/free': this.selected = '4';break;
          case '/me': this.selected = '5';break;
      }
  },
  watch: {
    selected () {
      switch(this.selected) {
        case '1': if(this.$route.path != '/') this.$router.push('/');
            break;
        case '2': if(this.$route.path != '/hot')this.$router.push('/hot');
            break;
        case '3': if(this.$route.path != '/vip')this.$router.push('/vip');
            break;
        case '4': if(this.$route.path != '/free')this.$router.push('/free');
            break;
        case '5': if(this.$route.path != '/me')this.$router.push('/me');
            break;
      }
    }
  }
}
</script>

<style>
#tabar {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background: red;
}
.bottomBar {
  height: 56px;
  position: absolute;
}
.mint-tabbar.is-fixed {
  z-index: 999;
}
.mint-tabbar {
  background-color: #000 !important;
  border-top: 1px solid #888;
}
.mint-tabbar>.mint-tab-item.is-selected {
  color: orangered !important;
  background-color: #333 !important;
}
</style>
