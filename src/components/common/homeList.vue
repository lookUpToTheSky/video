<template>
     <div class="wrap">
        <h4 class="head">{{title}} <i style="font-size: 12px" class="iconfont icon-more"></i></h4>
        <div class="listView" ref="listView">
          <ul class="list" ref="list">
            <li v-for="item in getData" :key="item.id">
              <i style="font-size: 14px" class="iconfont mark" :class="item.mark"></i>
              <img :src="'data:image/png;base64,'+ item.imgData" alt=""  @click.stop="onPlayVideo(item.id)">
              <h5 class="v-title">{{title}}</h5>
              <span class="v-note">{{title}}.....</span>
            </li>
          </ul>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
import {getSwiper} from '@/assets/api/api.js';
export default {
    name: 'HomeList',
    props: {
        title: String,
        type: Number,
    },
    data () {
        return {
            getData:[],
            pageSize: 4,
            page: 1,
            total: 0,
            flag: true
        }
    },
    methods: { 
        onPlayVideo (id) {
            this.$router.push({name:'videoPlay', params: {id,lastPath: '/'}});
        },
        _initContent () {
            let len = this.getData.length;
            this.$refs.list.style.width = (len*150+(len-1)*10)/37.5+'rem';
        },
        _getMoreList(type,pageSize,page) {
            let params = {type,pageSize,page};
            getSwiper(params).then(res => {
                let data = res.data.data;
                this.total = res.data.total;
                data.forEach(item => {
                    this.getData.push(item);
                })
                this._initContent();
                this.$nextTick(()=> {
                    this.scroll.refresh();
                    this.flag = true;
                })
            })
        },
    },
    mounted () {
        this.$refs.listView.classList.add('listV'+this.type);
        this._initContent();
        this.scroll = new BScroll('.listV'+this.type, {
            scrollX: true,
            click: false,
            probeType: 2,
            pullUpLoad: {
                threshold: 50 
            }
        })
        this._getMoreList(this.type,this.pageSize,this.page);
        this.scroll.on('scroll', pos => {
            if(this.page < this.total/this.pageSize) {
                if(pos.x < this.scroll.maxScrollX&&this.flag) {
                    this.flag = false;
                    this.page++;
                    this._getMoreList(this.type,this.pageSize,this.page);
                }
            }
        })
    }
}
</script>
<style scoped>
.wrap {
  height: 150px;
  margin-top: 10px;
  background-color: #fff;
}
.wrap .head {
  padding-left: 10px;
  line-height: 30px;
  font-weight: 600;
}
.listView {
  width: 100vw;
  overflow: hidden;
}
.list {
  display: flex;
  justify-content: space-between;
}
.list li {
  position: relative;
}
.list li img {
  width: 150px;
  height: 80px;
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
.list li .mark {
    font-size: 12px;
    color: yellow;
    position: absolute;
    top: 5px;
    right: 10px;
    z-index: 88;
}
</style>
