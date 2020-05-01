<template>
  <div class="container"> 
    <div class="search-wrap">
      <mt-search v-model="value" placeholder="斗罗大陆 [推荐]">
        <mt-cell
          v-for="item in filterResult"
          :title="item.name"
          :value="item.value"
          :key="item.value"
          @click.native="selectedItem(item)"
          >
        </mt-cell>
      </mt-search>
    </div>
    <div class="swiper-wrap">
      <mt-swipe :show-indicators="false" :auto="3000">
        <mt-swipe-item v-if="swiperList.length" v-for="item in swiperList" :key="item.id"><img v-lazy="'data:image/png;base64,'+item.imgData" alt=""><p></p></mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="outerWrap"  ref="outerWrap">
      <div class="innerWrap" ref="innerWrap">
        
        <home-list title="猜你喜欢" :type="103"></home-list>
        <!-- <home-list title="热门" :type="107"></home-list>
        <home-list title="免费" :type="102"></home-list> -->

        <div class="more-wrap" ref="moreWrap">
          <h4 class="head">更多<i style="font-size: 12px" class="iconfont icon-more"></i></h4>
          <ul class="moreList">
            <li v-for="item in moreList" :key="item.id">
              <img v-lazy="'data:image/png;base64,'+item.imgData" alt="">
              <h5 class="v-title">冰雪女王</h5>
              <span class="v-note">冰雪女王.....</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeList from './common/homeList';
import bScroll from 'better-scroll';
import {getSwiper} from '@/assets/api/api.js';
import {Toast} from "mint-ui";
export default {
  components: {
      HomeList
  },
  name: 'Home',
  data () {
    return {
      value: '',
      pageSize: 4,
      page: 1,
      type: 102,
      total: 0,
      defaultResult: [{value:1,name: '武庚纪'}, {value: 2, name:'斗罗大陆'}],
      swiperList: [],
      moreList:[]
    }
  },
  computed: {
    filterResult() {
      return this.defaultResult.filter(value => new RegExp(this.value, 'i').test(value.name));
    }
  },
  methods: {
    selectedItem (item) {
      this.value = item.name;
    },
    _initView () {
        let fs = parseInt(document.documentElement.style.fontSize);
        let height = (window.screen.height - 305)/fs + 'rem';
        this.$refs.outerWrap.style.height = height;
    },
    _getSwiper(type,pageSize,page) {
      let params = {type,pageSize,page};
      getSwiper(params).then(res => {
          this.swiperList = res.data.data;
      })
    },
    _getMoreList(type,pageSize,page) {
      let params = {type,pageSize,page};
      getSwiper(params).then(res => {
        let data = res.data.data;
        this.total = res.data.total;
        data.forEach(item => {
            this.moreList.push(item);
        })
        this.$nextTick(()=> {
          this.scroll.refresh();
          this.scroll.finishPullUp();
        })
      })
    },
    _loadMore() {
        this.scroll = new bScroll('.outerWrap', {
        scrollY: true,
        click: true,
        probeType: 3,
        pullUpLoad: {
            threshold: 50 // 在上拉到底部 50px 时，触发 pullingUp 事件
        },
        maxScrollY: 400
      })
      this._getMoreList(this.type,this.pageSize,this.page);
      this.scroll.on('pullingUp', (pos) => {
        // 滚动到底部
        if(this.page < this.total/this.pageSize) {
            this.page++;
            this._getMoreList(this.type,this.pageSize,this.page);
        }else{
            Toast({
                message: '没有更多了',
                position: 'bottom',
                duration: 1000
            });
        }
      })
    }
  },
  mounted () {
    this._getSwiper(101,4,1);
    this._initView ();
    this._loadMore();
  }
}
</script>
<style scoped>
.container {
  overflow: hidden;
}
.search-wrap {
  height: 52px;
}
>>>.mint-searchbar {
  background-color: #EDC06E;
}
>>>.mint-search-list {
  top: 52px;
  padding-top: 0;
  height: 200px;
  z-index: 199;
}
.swiper-wrap {
  height: 200px;
  width: 100%;
  position: relative;
  z-index: 199;
  box-shadow: 0 5px 5px 2px #eee;
}
.swiper-wrap img {
  width: 100%;
}
.swiper-wrap img+p{
  position: absolute;
  bottom: 0px;
  z-index: 22;
  width: 100%;
  line-height: 30px;
  color: #fff;
  background-color: rgba(0,0,0,0.3);
}
.more-wrap {
  margin-top: 10px;
  color: #eee;
  background-color: rgba(0,0,0,0.8);
}
.more-wrap > h4{
  padding-left: 10px;
  line-height: 30px;
  font-weight: 600;
}
.moreList {
  padding:0 2%; 
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between
}
.moreList li{
  width: 49%;
  height: 200px;
}
.moreList img {
  width: 100%;
  height: 150px;
}
.v-title {
    font-size: 14px;
    letter-spacing:1px;
    padding-left: 8px;
    line-height: 20px;
}
.v-note {
    font-size: 12px;
    letter-spacing:1px;
    padding-left: 8px;
    line-height: 16px;
}
image[lazy=loading] {
  width: 50%;
  height: 300px;
  margin: auto;
}
</style>
