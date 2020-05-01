<template>
    <div class="container" ref="meWrap">
         <div class="innerWrap">
             <div class="userInfo">
                 <div class="userPic">
                     <img v-show="isLogin" src="static/img/3.jpg" alt="">
                     <img  @click="onLogin"  v-show="!isLogin" src="static/img/logo.png" alt="">
                     <button  @click="onLogin"  v-show="!isLogin">点击登录</button>
                </div>
                <div v-show="isLogin">
                    <div v-if="!isVIP" class="getVip">
                        <i style="color:#666"class="iconfont icon-VIP"></i>
                        <mt-button @click="onGetVip(0)" size="small" plain>成为会员</mt-button>
                    </div>
                    <div v-else class="addVipTime">
                        <i style="color: orange; text-shadow: 0 5px 10px yellow"class="iconfont icon-VIP"></i>
                        <span>会员200天后到期</span>
                        <mt-button @click="onGetVip(1)" size="small" type="danger" >续费会员</mt-button>
                    </div>
                 </div>
                 
                 <div class="userName">用户：<span style="color: orange; font-size: 16px;">{{userName}}</span></div>
                 <div class="userCode">bibi账号:<span style="color: orange; font-size: 16px;"> {{userCode}}</span></div>
                <mt-navbar class="page-part" v-model="selected">
                    <mt-tab-item id="1">作品</mt-tab-item>
                    <mt-tab-item id="2">关注</mt-tab-item>
                    <mt-tab-item id="3">粉丝</mt-tab-item>
                </mt-navbar>

                    <!-- tab-container -->
                <mt-tab-container v-model="selected">
                    <mt-tab-container-item id="1">
                        <mt-cell v-for="n in 10" :key="n">
                            <img class="myWorks" src="static/img/sw3.jpg" alt="">
                        </mt-cell>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2">
                        <mt-cell v-for="n in 4" :key="n">
                            <img class="myEyeLook" src="static/img/sw5.jpg" alt="">
                        </mt-cell>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="3">
                        <mt-cell v-for="n in 6" :key="n">
                            <img class="myFans" src="static/img/sw2.jpg" alt="">
                        </mt-cell>
                    </mt-tab-container-item>
                </mt-tab-container>     
             </div>
         </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
    name: 'free',
    data () {
        return {
            selected: "1",
            isVIP: false,
            isLogin: false,
            userName: '未登录',
            userCode: '未登录',
            freeList:[{id:1,img:'static/img/1.jpg',mark:'icon-mianfei'},{id:2,img:'static/img/2.jpg',mark:'icon-mianfei'},
            {id:3,img:'static/img/3.jpg'},{id:4,img:'static/img/4.jpg'},{id:5,img:'static/img/3.jpg'},{id:6,img:'static/img/4.jpg'},
            {id:7,img:'static/img/3.jpg'},{id:8,img:'static/img/4.jpg'},{id:9,img:'static/img/3.jpg'},{id:10,img:'static/img/4.jpg'}]
        }
    },
    methods: {
        onGetVip (num) {
            this.$router.push({name: 'getVip', params: {num,lastPath: this.$route.path}});
        },
        onLogin () {
             this.$router.push('/login'); 
        }
    },
    mounted () {
        let fs = parseInt(document.documentElement.style.fontSize);
        this.$refs.meWrap.style.height = (document.body.clientHeight - 55)/fs + 'rem';
        new BScroll('.container', {
            scrollY: true,
            click: true
        })
        if(this.$route.params.userName != undefined) {
            this.userName = this.$route.params.userName;
            this.userCode = this.$route.params.userCode;
            this.isVIP = true;
            this.isLogin = true;
        }else{
            this.isVIP = false;
            this.isLogin = false;
        }
    }
}
</script>

<style scoped>
.container {
    background-color: orange;
    width: 100vw;
    color:#fff;
    box-sizing: border-box;
    overflow: hidden;
}
.innerWrap {
    min-height: 102%;
    padding-top: 30%;
    box-sizing: border-box;
    background-color: rgba(220,220,220,0.5);
}
.userInfo {
    background-color: #333;
    min-height: 100%;
    position: relative;
    padding-top: 130px;  
}
.userPic {
    position: absolute;
    left: 40px;
    top: -43px;
    height: 80px;
    width: 80px;
    border-radius: 50%;
    transform: rotateZ(-45deg);
    overflow: hidden;
    border-top: 4px solid #333;
    border-right: 4px solid #333;
    border-left: 4px solid orange;
    border-bottom: 4px solid orange;
}
.userPic > button {
    position: absolute;
    left: 10px;
    top: 28px;
    color: #000;
    z-index: 999;
    font-size: 16px;
}
.userPic img{
    height: 80px;
    width: 80px;
    border-radius: 50%;
    transform: rotateZ(45deg);
    background-color: #ccc;
}
.getVip, .addVipTime{
    position: absolute;
    left: 65px;
    top: -70px;
    width: 220px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.userName,.userCode {
    min-width: 80px;
    text-align: center;
    position: absolute;
    left: 40px;
    top: 60px;
    font-size: 18px;
}
.userCode {
    top: 100px;
}
>>>.mint-cell,>>>.mint-navbar {
    background-color: #333;
}
>>>.is-selected {
    color: orange !important;
    margin-bottom: 0 !important;
    border-bottom: 2px solid orange !important;
}
>>>.mint-tab-item {
    border-bottom: 2px solid #fff;
}
>>>.mint-cell-wrapper {
    background-image: none;
}
>>>.mint-cell {
    width:  33.3%;
    height: 120px;
}
>>>.mint-tab-container-item {
    display: flex;
    flex-wrap: wrap;
    padding-top: 10px;
    min-height: 320px;
}
.myWorks,.myEyeLook,.myFans {
    width: 100%;
    height: 110px;
}
</style>