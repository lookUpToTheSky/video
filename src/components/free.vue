<template>
    <div class="container">
         <div class="swiper-wrap" ref="swiperWrap">
            <div class="freeVH">
                <ul>
                    <li>live</li>
                    <li>关注</li>
                    <li>推荐</li>
                </ul>
            </div>
            <swiper :options="swiperOption">
                <swiper-slide class="swiperItem" v-for="(item, index) in freeList" :key="item.id">
                    <div @click="onPlayVideo(index)">
                        <video class="video" :src='item.video' loop></video>
                        <i v-if="show" class="playIcon iconfont icon-video-control"></i>
                        <div class="videoNote">
                            <h4>@生锈的白痴</h4>
                            <p class="note">美好的一天又开始了，骚年洗洗睡吧</p>
                        </div>
                        <ul class="userOption">
                            <li class="userIcon"><img src="static/img/4.jpg" alt=""><i class="iconfont icon-jiaguanzhu"></i></li>
                            <li><i @click.stop="onLike" style="font-size: 38px"  class="iconfont icon-ic_favorite_px"></i><p class="likeNum">3.2w</p></li>
                            <li><i style="font-size: 34px" class="iconfont icon-pinglun1"></i><p class="commentNum">1.2w</p></li>
                            <li><i style="font-size: 34px" class="iconfont icon-zhuanfa"></i><p class="retransmissionNum">3203</p></li>
                        </ul>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
    components: {
        swiper,
        swiperSlide
    },
    name: 'free',
    data () {
        return {
            show: false,
            currentIndex: 0,
            swiperOption: {//swiper3
                autoplay: 0,
                speed: 1000,
                direction: 'vertical',
                freeModeMomentumBounceRatio: 2,
                height: document.body.clientHeight,
                onSlideChangeStart: swiper => {  
                    this.show = false;
                    this.currentIndex = swiper.realIndex; 
                },
            },
            freeList:[{id:1,video:'static/source/007.mp4',mark:'icon-mianfei'},{id:2,video:'static/source/001.mp4',mark:'icon-mianfei'},
            {id:3,video:'static/source/002.mp4'},{id:4,video:'static/source/003.mp4'},{id:5,video:'static/source/004.mp4'},{id:6,video:'static/source/005.mp4'},
            {id:7,video:'static/source/006.mp4'},{id:8,video:'static/source/myP1.mp4'},{id:9,video:'static/source/003.mp4'},{id:10,video:'static/source/004.mp4'}]
        }
    },
    watch: {
        currentIndex (newValue, oldValue) {
            document.getElementsByClassName('video')[oldValue].pause();
            document.getElementsByClassName('video')[newValue].play();
        }
    },
    methods: {
        onLike (e) {
            if( e.target.style.color != 'red'||e.target.style.color == '') {
                e.target.style.color = 'red';
            }else{
                e.target.style.color = '#fff';
            }
        },
        onPlayVideo (index) {
            this.show = !this.show;
            if(!this.show) {
                document.getElementsByClassName('video')[index].play();
            }else{
                document.getElementsByClassName('video')[index].pause();
            }
        }
    },
    mounted () {
        let fs = parseInt(document.documentElement.style.fontSize);
        this.$refs.swiperWrap.style.height = (document.body.clientHeight - 55)/fs + 'rem';
        document.getElementsByClassName('video')[0].play().catch( err =>{
            this.show = true;
        });
    }
}
</script>

<style scoped>
.swiper-wrap {
  height: 90vh;
  overflow: hidden;
  background: #000;
  box-sizing: border-box;
}
.swiper-wrap img {
  width: 100%;
  height: 100vh;
}
.freeVH {
    width: 100%;
    line-height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    background: rgba(0,0,0,.2);
}
.freeVH ul {
    display: flex;
    color: #fff;
    justify-content: space-around;
}
.freeVH ul li {
    width: 50px;
    font-size: 16px;
}
.swiperItem {
    position: relative;
}
.video {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100vw;
}
.playIcon {
    width: 60px;
    height: 60px;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 60px;
    z-index: 99;
    color: #eee;
    transform: translate(-50%, -50%);
}
.videoNote {
    position: absolute;
    left: 10px;
    bottom: 65px;
    z-index: 99;
    width: 80%;
    color:#fff;
    min-height: 70px;
    line-height: 24px;
}
.videoNote h4 {
    font-size: 18px;
    font-weight: 550;
}
.videoNote > p {
    font-size: 16px;
}
.userOption {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: absolute;
    right: 10px;
    bottom: 150px;
    z-index: 99;
    height: 280px;
    color: #fff !important;
}
.userIcon {
    position: relative;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    border: 2px solid #fff;
}
.userIcon img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    overflow: hidden;
}
.userIcon > .iconfont {
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    color: red;
}
</style>
