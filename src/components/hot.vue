<template>
  <div class="container">
		<div class="swiper-wrap">
			<mt-swipe :show-indicators="true" :auto="0">
				<mt-swipe-item><img src="static/img/1.jpg" alt=""><p></p></mt-swipe-item>
				<mt-swipe-item><img src="static/img/2.jpg" alt=""><p></p></mt-swipe-item>
				<mt-swipe-item><img src="static/img/3.jpg" alt=""><p></p></mt-swipe-item>
				<mt-swipe-item><img src="static/img/4.jpg" alt=""><p></p></mt-swipe-item>
			</mt-swipe>
		</div>
		<ul class="hotList" ref="hotList"
			v-infinite-scroll="loadMore"
			infinite-scroll-disabled="loading"
		    infinite-scroll-distance="5"
			:infinite-scroll-immediate-check="true">
			<li v-for="(item, index) in hotList" :key="item.id" @click="onPlayVideo(item.id)">
				<img :src="item.img" alt=""><p class="hot-mark">hot {{index+1}}</p>
				<h5 class="v-title">蜘蛛侠||</h5>
				<span class="v-note">蜘蛛侠拯救世界</span>
				</li>
			<li>
				<div class="loading-box" v-if="loading">
					<mt-spinner type="triple-bounce" :size="18" color="orange"></mt-spinner>
				</div>
				<div class="no-more" v-if="noMore">没有更多了~</div>
			</li>
		</ul>
		
  </div>
</template>

<script>
export default {
  name: 'hot',
  data () {
	  return {
		  loading: false,
		  noMore: false,
		  hotList:[{id:1,img:'static/img/1.jpg',mark:'icon-mianfei'},{id:2,img:'static/img/sw2.jpg',mark:'icon-mianfei'},
		  {id:3,img:'static/img/sw3.jpg'},{id:4,img:'static/img/4.jpg'},{id:5,img:'static/img/sw5.jpg'},{id:6,img:'static/img/4.jpg'}],
		  geData: [{id:3,img:'static/img/3.jpg'},{id:4,img:'static/img/sw4.jpg'},{id:5,img:'static/img/sw2.jpg'},{id:6,img:'static/img/sw7.jpg'}]
	  }
  },
  methods: {
	loadMore () {
		this.loading = true;
		let temp=[];
		setTimeout(()=> {
			this.geData.forEach((item) => {
				temp.push({id:Math.ceil(Math.random()*100000),img: item.img});
			})
			this.hotList = this.hotList.concat(temp);
			this.loading = false;
		},500)
	},
	onPlayVideo (id) {
		this.$router.push({name:'videoPlay', params: {id,lastPath: '/hot'}});
	}
  },
  mounted () {
	  let fs = parseInt(document.documentElement.style.fontSize);
	  this.$refs.hotList.style.height = (window.innerHeight - 255)/fs + 'rem';
  }
}
</script>

<style scoped>
.swiper-wrap {
  height: 200px;
  box-shadow: 0 2px 10px 4px orange;
  margin-bottom: 8px;
}
.swiper-wrap img {
  width: 100%;
}
.swiper-wrap img+p{
  position: absolute;
  bottom: 50px;
  z-index: 22;
  width: 100%;
  line-height: 30px;
  color: #fff;
  background-color: rgba(0,0,0,0.3);
}
.hotList {
	overflow: auto;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
.hotList li{
	width: 49%;
	height: 200px;
	position: relative;
	overflow: hidden;
}
.hot-mark {
	line-height: 95px;
	height: 56px;
	width: 56px;
	color: #eee;
	position: absolute;
	top: -28px;
	right: -28px;
	transform: rotateZ(45deg);
	background: red;
	text-align: center;
}
.hotList li img {
	width: 100%;
	height: 150px;
}
.hotList li:last-child {
	width: 100%;
	height: 40px;
	color: #fff;
}
.loading-box {
	height: 40px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.loading-more-txt {
	height: 16px;
	margin-left: 20px;
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
</style>
