<template>
    <div class="wrap">
        <mt-header v-show="headShow" fixed :title="title">
                <router-link :to="routerPath" slot="left">
                    <mt-button icon="back">返回</mt-button>
                </router-link>
        </mt-header> 
        <div class="videoWarp">
            <video id="video" controls="controls" autoplay="autoplay" :src="'static/source/00'+videoId+'.mp4'" ref="video">
            </video>
        </div>
        
        <mt-popup
            v-model="showBrief"
            position="bottom">
            <div class="videoBrief">
                <h5>{{title}}<i @click="showBrief=false"style="font-size: 16px; float: right" class="iconfont icon-more"></i></h5>
                <p>简介</p>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;上吊大的空间坳隧道是基调的简欧爱哦的聚集地爱是带动阿斯豆浆</span>
            </div>
        </mt-popup>
        <div class="outerWrap">
            <ul class="innerWrap">
                <li>
                    <div class="title">
                        <h5>{{title}}</h5>
                        <p @click="showBrief=true">简介<i class="iconfont icon-more"></i></p>
                    </div>
                    <div class="userOpt">
                        <i style="font-size: 32px"  class="iconfont icon-ic_favorite_px"></i>
                        <i style="font-size: 30px" class="iconfont icon-pinglun1"></i>
                        <i style="font-size: 30px" class="iconfont icon-zhuanfa"></i>
                    </div>
                </li>
                <li>
                    <mt-header><mt-button slot="left">为你推荐</mt-button></mt-header>
                </li>
                <li class="recommendList">
                    <ol v-for="item in 5">
                        <img src="static/img/1.jpg" alt="">
                        <div>
                            <h5>褪色天空</h5>
                            <p>我么钱无非是点击</p>
                        </div>
                    </ol>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
export default {
  name: 'videoPlay',
  data () {
      return {
          title: '电影名称',
          headShow: false,
          showBrief: false,
          videoId: 0,
          routerPath: '/'
      }
  },
  methods: {
     _initPage () {
        new BScroll('.outerWrap',{
            scrollY: true,
            click: true,
        })
        const myVideo = document.getElementById('video');
        myVideo.addEventListener('playing',() => { //播放中
            this.headShow = false;
        });
        myVideo.addEventListener('pause',() => { //暂停
            this.headShow = true;
        });
        this.videoId = this.$route.params.id;
        this.routerPath = this.$route.params.lastPath==undefined?'/': this.$route.params.lastPath;
    },
  },
  mounted () {
      this._initPage();
  }
}
</script>
<style scoped>
>>>.mint-header {
    background-color: rgba(0, 0, 0, 0);
    color: orange;
}
>>>.v-modal {
    opacity: 0;
}
.videoWarp {
    position: relative;
    height: 30vh;
}
.videoWarp i{
    position: absolute;
    right: 60px;
    bottom: 35px;
    font-size: 26px;
    color: #eee;
}
#video {
    width: 100vw;
    height: 30vh;
    background-color: #000;
}
.outerWrap {
    width: 100%;
    height: 70vh;
    background-color: #eee;
    overflow: hidden;
}
.innerWrap {
    height: 700px;
    padding: 0 10px;
    background-color: #fff;
}
.title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 10px;
}
.title h5{
    font-size: 16px;
    font-weight: 550;
    line-height: 30px;
}
.title .iconfont {
    font-size: 12px;
}
.videoBrief {
    width: 100vw;
    height: 70vh;
    background: #fff;
    padding: 15px 20px;
    box-sizing:border-box;
}
.videoBrief >h5 {
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    font-weight: 550;
    margin-bottom: 10px; 
}
.videoBrief >h5>i {
    transform: rotateZ(90deg);
}
.videoBrief >p {
    font-size: 14px;
    font-weight: 550;
    line-height: 30px;
}
.videoBrief {
    line-height: 18px;
    font-size: 14px;
    letter-spacing: 2px;
}
.userOpt {
    display: flex;
    color: #666;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    align-items: center;
    justify-content: space-between;
} 
.userOpt i {
    width: 40px;
}
.userOpt i:first-child {
    flex: 1;
}
.recommendList ol {
    display: flex;
    align-items: center;
    line-height: 20px;
    border: 1px dashed #ccc;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px 1px #ccc;
    margin-bottom: 10px;
}
.recommendList h5 {
    font-size: 14px;
    font-weight: 550;
}
.recommendList img{
    width: 140px;
    height:100px;
    margin-right: 20px;
}
</style>

