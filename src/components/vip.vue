<template>
    <div class="container">
         <div class="swiper-wrap">
          <mt-swipe :show-indicators="true" :auto="3000">
            <mt-swipe-item><img src="static/img/1.jpg" alt=""></mt-swipe-item>
            <mt-swipe-item><img src="static/img/2.jpg" alt=""></mt-swipe-item>
            <mt-swipe-item><img src="static/img/3.jpg" alt=""></mt-swipe-item>
            <mt-swipe-item><img src="static/img/4.jpg" alt=""></mt-swipe-item>
          </mt-swipe>
        </div>
        <div class="vipListTitle">#VIP专享</div>
		<ul class="categoryList" ref="categoryList">
			<li v-for="(item, index) in categoryList" :key="item.id">
				<img :src="item.img" alt="">
                <p class="categoryTitle">蜘蛛侠||</p>
                <p class="vip-mark"><i class="iconfont icon-VIP"></i></p>
			</li>
		</ul>
    </div>
</template>

<script>
export default {
  name: 'vip',
  data () {
	  return {
		  loading: false,
		  noMore: false,
		  categoryList:[{id:1,img:'static/img/1.jpg',mark:'icon-mianfei'},{id:2,img:'static/img/2.jpg',mark:'icon-mianfei'},
          {id:3,img:'static/img/3.jpg'},{id:4,img:'static/img/4.jpg'},{id:5,img:'static/img/3.jpg'},{id:6,img:'static/img/4.jpg'},
          {id:7,img:'static/img/3.jpg'},{id:8,img:'static/img/4.jpg'},{id:9,img:'static/img/3.jpg'},{id:10,img:'static/img/4.jpg'}]
	  }
  },
  methods: {
  },
  mounted () {
	  let fs = parseInt(document.documentElement.style.fontSize);
	  this.$refs.categoryList.style.height = (window.innerHeight - 215)/fs + 'rem';
  }
}
</script>

<style scoped>
.swiper-wrap {
  height: 120px;
}
.swiper-wrap img {
  width: 100%;
}
>>>.mint-swipe-indicator  {
    opacity: 0.5;
}
>>>.mint-swipe-indicator.is-active {
    background-color: orange;
    
}
.vipListTitle {
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    color: orange;
    text-shadow: 0 0 5px orange;
    background-color: #000;
}
.categoryList {
	overflow: auto;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
    padding-top: 1%;
    background: orange;
    box-sizing: border-box;
    position: relative;
}
.categoryList li{
	width: 49.5%;
	height: 200px;
	position: relative;
	overflow: hidden;
    margin-bottom: 1%;
}
.categoryTitle{
	line-height: 36px;
    font-family: 'kaiti';
	width: 100%;
	color: #eee;
    text-shadow: 0 0 5px #41dd9c;
	position: absolute;
	top: 50%;
	left: 50%;
    font-size: 26px;
    transform: translate(-50%, -50%);
	text-align: center;
}
.categoryList li img {
	width: 100%;
	height: 200px;
}
.vip-mark {
    position: absolute;
    top: 5px;
    right: 5px;
    color: orange;
}
</style>
