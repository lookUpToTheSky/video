<template>
  <div class="wrap">
        <mt-header fixed :title="title">
                <router-link :to="routerPath" slot="left">
                    <mt-button icon="back">返回</mt-button>
                </router-link>
        </mt-header> 
        <div class="userPic">
            <img src="static/img/3.jpg" alt="">
            <div class="userName">游客002__20</div>
            <div class="userCode">bibi账号:1556789008</div>
        </div>
        <div class="content">
            <mt-navbar v-model="tabSelected">
                <mt-tab-item id="1">普通会员</mt-tab-item>
                <mt-tab-item id="2">超级会员</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="tabSelected">
                <mt-tab-container-item id="1">
                    <mt-cell v-for="(item, index) in vipList" :key="item.id">
                        <ul class="vipItem" @click="onsSelect(index)" ref="vipItem">
                            <li>{{item.month}}个月</li>
                            <li><span style="font-size: 14px">￥</span>{{item.price}}</li>
                            <li>{{item.price/item.month}}元/月</li>
                        </ul>
                    </mt-cell>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <mt-cell v-for="(item, index) in sVipList" :key="item.id">
                        <ul class="vipItem" @click="onsSelect(index)" ref="vipItem1">
                            <li>{{item.month}}个月</li>
                            <li><span style="font-size: 14px">￥</span>{{item.price}}</li>
                            <li>{{item.price/item.month}}元/月</li>
                        </ul>
                    </mt-cell>
                </mt-tab-container-item>
            </mt-tab-container>
            <div class="toGetVip"><button>立即{{title}}会员</button></div>
            
        </div>
  </div>
</template>

<script>
export default {
  name:"getVip",
  data () {
      return {
          routerPath: '/', 
          title: '',
          active: 0,
          active1:0,
          tabSelected: '1',
          vipList:[{id: 1,month:1,price: 30},{id: 2,month:3,price: 60},{id: 3,month:6,price: 90},{id: 4,month:12,price: 120},{id: 5,month: 100,price: 500}],
          sVipList:[{id: 1,month:1,price: 50},{id: 2,month:3,price: 120},{id: 3,month:6,price: 180},{id: 4,month:12,price: 240},{id: 5,month: 100,price: 600}]
      }
  },
  methods: {
      onsSelect (index) {
            if(index !== this.active&&this.tabSelected =='1') {
                    this.$refs.vipItem[this.active].classList.remove('active');
                    this.$refs.vipItem[index].classList.add('active');
                    this.active = index;
            }
            if(index !== this.active1&&this.tabSelected =='2') {
                this.$refs.vipItem1[this.active1].classList.remove('active');
                this.$refs.vipItem1[index].classList.add('active');
                this.active1 = index;
          }
          
      }
  },
  mounted () {
      this.title = this.$route.params.num == 0 ? '成为会员': '续费';
      this.routerPath = this.$route.params.lastPath==undefined?'/': this.$route.params.lastPath;
      this.$refs.vipItem[this.active].classList.add('active');
      this.$refs.vipItem1[this.active1].classList.add('active');
  }
}
</script>

<style scoped>
>>>.mint-header{
    background-color: #EDC06E;
    color: #fff;
}
>>>.mint-header-title {
    font-size: 16px;
}
>>>.mint-navbar {
    background-color: #fff;
    padding: 20px 0;
}
>>>.mint-tab-item-label {
    font-size: 16px;
}
>>>.mint-cell-wrapper {
    background-image: none;
}
>>>.mint-navbar .mint-tab-item.is-selected {
    color: #EDC06E;   
    border-bottom: 3px solid #EDC06E;

}
>>>.mint-tab-container-wrap {
    width: 100%;
    overflow: auto;
}
>>>.mint-tab-container-item {
    width: auto;
    overflow: auto;
    display: flex;

}
.wrap {
    height: 100vh;
    background-color: #fff;
}
.userPic {
    position: fixed;
    top: 40px;
    left: 0;
    z-index: 99;
    display: flex;
    width: 100%;
    height: 150px;
    margin: 0 auto;
    align-items: center;
    justify-content: space-around;
    background-color: #EDC06E;
}
.userPic img{
    height: 80px;
    width: 80px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #EDC06E;
    border-radius: 50%;
}
.userName, .userCode {
    color: #fff;
    font-size: 14px;
    font-weight: 550;
    border: 2px solid #EDC06E;
    padding: 5px;
}
.content {
    padding-top: 190px;
    background-color: #fff;
}
.vipItem {
    width: 100px;
    height: 120px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    border: 1px solid #ccc;
    box-sizing: border-box;
    text-align: center;
    border-radius: 10px;
    margin: 0 15px;
}
.vipItem li:nth-child(1) {
    font-size: 14px;
    color: #000;
    font-weight: 550;
}
.vipItem li:nth-child(2) {
    font-size: 20px;
    color: orange;
    font-weight: 550;
}
.vipItem li:nth-child(3) {
    font-size: 14px;
    color: #666;
}
.active {
    background-color: #eee;
}
.toGetVip {
    width: 100%;
    padding:80px 0 175px 0;
    text-align: center;
    background: #fff;
}
.toGetVip > button {
    width: 80%;
    padding: 10px 20px;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
    background-color: #EDC06E;
    
}
</style>
