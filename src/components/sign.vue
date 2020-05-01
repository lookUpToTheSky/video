<template>
  <div class="">
	<mt-header fixed title="注册">
			<router-link to="/me" slot="left">
				<mt-button icon="back">返回</mt-button>
			</router-link>
	</mt-header> 
  	<div class="alert alert-success" v-show="msg">
  		<strong>{{msg}}</strong> 
	</div>
  	<div id="login_room">
  		<div class="flexbox">
				<ul class="nav-tabs">
            <li><router-link tag="a" to="/login">登录</router-link></li>
            <li id="active"><a>注册</a></li>
        </ul>
        <div class="userName">
        	<h1>手机号<span style="color:red;">*</span>
        		<span class="warn" v-show="warnPhone">--手机号不正确--</span>
            </h1>
            <input type="text" v-model="user.userPhone" placeholder="请输入手机号" @blur="onTest(user.userPhone, 0)">
        </div>
        <div class="userName code">
        	<h1>验证码<span style="color:red;">*</span>
        		<span class="warn" v-show="warnCode">--验证码不正确--</span></h1></h1>
        	<div>
	            <input type="text" v-model="user.userCode" :disabled="disabled" placeholder="请输入验证码" @blur="onTest(user.userCode, 1)">
					<button class="btn codeBtn" @click="onGetCode">获取验证码</button>
					<span class="btn codeBtn over" v-show="getting"></span>
            </div>
        </div>
        <div class="userPsd">
        	<h1>用户密码<span style="color:red;">*</span>
        		<span class="warn" v-show="warnPsd">--密码长度为5-16位--</span></h1></h1>
            <input type="password" v-model="user.userPsd" placeholder="请输入密码" @blur="onTest(user.userPsd, 2)" >
        </div>
        <div class="userPsd">
        	<h1>确认密码<span style="color:red;">*</span>
        		<span class="warn" v-show="warnCheckPsd">--密码不一致--</span></h1></h1>
            <input type="password" v-model="user.userCheckPsd" placeholder="确认密码" @blur="onTest(user.userCheckPsd, 3)" >
        </div>
        <div>
        	<button type="button" class="btnSign btn-success btn-lg" @click="onSign">立即注册</button>
			<p style="margin-top: 10px;">点击注册按钮即代表你已同意保密协议</p>
        </div>
  		</div>
  	</div>
  </div>
</template>

<script> 
export default {
  name: 'sign',
  data () {
  	return {
  		user: {
  			userPhone: '',
  			userCode: '',
  			userPsd: '',
  			userCheckPsd: '',
  		},
  		centerDialogVisible: false,
  		warnPhone: false,
  		warnCode: false,
  		warnPsd: false,
  		warnCheckPsd: false,
  		getting: false,
  		disabled: true,
  		msg: '',
  		timer: 60,
  	}
  },
  methods: {
  	onUnagreen () {
  		this.$router.push('/')
  	},
  	onTest (value, index) {
  		let TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
  		let checked_phone = TEL_REGEXP.test(this.user.userPhone);
  		let RegExpx = /^[a-zA-Z0-9_-]{5,16}$/;
  		let checked = RegExpx.test(value);
  		switch(index) {
  			case 0: if(value&&checked_phone){ this.warnPhone = false;}else{this.warnPhone = true;this.user.userPhone ='';};
  			break;
  			case 1: if(value){ this.warnCode = false;}else{this.warnCode = true;}; 
  			break;
  			case 2: if(value && checked){ this.warnPsd = false;}else{this.warnPsd = true;this.user.userPsd ='';};
  			break;
  			case 3: if(value && this.user.userPsd == value){ this.warnCheckPsd = false;}else{this.warnCheckPsd = true;this.user.userCheckPsd ='';};
  			break;
  		}
  	},
  	//获取手机验证码
  	onGetCode (e) {
  		if(this.user.userPhone){
  			this.warnPhone = false;
  			this.getting = true;
  			this.disabled = false;
			e.target.innerText = this.timer + 's';
			e.target.style.background = '#B0C4DE';
			this._sendMessage();
			let timer = setInterval(() => {
				if(this.timer <= 0){
					this.timer = 60;
					this.getting = false;
					e.target.innerText = '重新获取';
					e.target.style.background = '#41DDC9';
					clearInterval(timer);
				}else {
					--this.timer;
					e.target.innerText = this.timer + 's';
				}
			},1000)
  		}else{
  			this.warnPhone = true;
  		}
  		
  	},
  	_sendMessage() {
  		// sendMessage({mobile: this.user.userPhone}).then(res =>{
  		// })
  	},
  	//注册
  	onSign () {
  		let _this = this;
  		let params = {
			userAccount: this.user.userPhone,
			userPassword: this.user.userPsd,
			userCode: this.user.userCode
  		}
  		let TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
  		let checked_phone = TEL_REGEXP.test(this.user.userPhone);
  		let RegExpx = /^[a-zA-Z0-9_-]{5,16}$/;
  		let checked = RegExpx.test(this.user.userPsd);
  		switch(0) {
  			case 0: if(this.user.userPhone&&checked_phone){ this.warnPhone = false;}else{;this.warnPhone = true;this.user.userPhone ='';break;};
  			case 1: if(this.user.userCode){ this.warnCode = false;}else{this.warnCode = true;break;}; 
  			case 2: if(this.user.userPsd && checked){ this.warnPsd = false;}else{this.warnPsd = true;this.user.userPsd ='';break;};
  			case 3: if(this.user.userCheckPsd && this.user.userPsd == this.user.userCheckPsd){ this.warnCheckPsd = false;}else{this.warnCheckPsd = true;this.user.userCheckPsd ='';break;};
  			// default: userSign(params).then(data =>{
  			// 	if(data.rescode == 200) {
			// 		_this.msg = data.msg;
			// 		setTimeout(function() {
			// 			_this.msg = '';
			// 		}, 2000);
			// 	}else{
			// 		_this.msg = data.msg;
			// 		this.user.userCode = null
			// 		setTimeout(function() {
			// 			_this.msg = '';
			// 		}, 2000);
			// 	}
  			// });
  		}
  	}
  },
  mounted () {
  	this.centerDialogVisible = true
  }

};
</script>

<style scoped>
	>>>.mint-header{
		background-color: #41DDC9;
		color: #fff;
	}
	.alert {
		width: 4rem;
		position: absolute;
		left: 50%;
		top: 1rem;
		margin-left: -2rem;
		text-align: center;
	}
	#login_room {
		height: 8rem;
		width: 7rem;
		padding-top: 3rem;
		margin: 0 auto;
		text-align: center;
	}
	#login_room>img {
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		overflow: hidden;
		margin-bottom: .2rem;
		background: #fff;
		padding: .1rem;
	}
	.flexbox {
		display: flex;
		height: 6rem;
		flex-direction: column;
		justify-content: space-between;
	}
	.nav-tabs {
		width: 100%;
		border-bottom: none;
		margin-bottom: .3rem;
        display: flex;
	}
	#active {
		background: #41DDC9;
	}
	.nav-tabs>li:first-child {
		background: #ccc;
		width: 50%;
		border-radius: .1rem 0 0 .1rem;
	}
	.nav-tabs>li:last-child {
		background: #ccc;
		width: 50%;
		border-radius: 0 .1rem .1rem 0;
	}
	.nav-tabs>li a{
		display: inline-block;
		width: 100%;
		font-size: .4rem;
		line-height: .8rem;
		color: #fff;
		border-radius: none;
	}
	.userName, .userPsd {
		width: 100%;
		line-height: .68rem;
		margin-top: .5rem;
		position: relative;
        display: flex;
        justify-content: space-around;
	}
	.userName h1, .userPsd h1 {
		color: #333;
		font-size: .3rem;
		display: block;
		text-align: left;
		line-height: .5rem;
	}
	.userName input, .userPsd input{
		line-height: .7rem;
		padding: 0 .2rem;
		width: 190px;
		border: 1px solid #ccc;
		border-radius: .1rem;
	}
	.code input {
		width: 120px;
		position: relative;
	}
	input::placeholder {
		font-size: .12px !important;
		color: #888;
	}
	.warn {
		position: absolute;
		right: 0;
		top: -18px;
		width: 45%;
		color:red;
		float: right;
		font-size: .24rem;
		text-align: center;
		margin-right: 1.5rem;
	}
	.btnSign {
		width: 100%;
		margin-top: .4rem;
		color: #fff;
        line-height: 35px;
		background: #41DDC9;
	}
	.codeBtn {
		width: 70px;
		margin-top: 0;
		height: .7rem;
		padding: 0;
		outline: none;
        color: #fff;
        line-height:20px;
        background: #41DDC9;
	}
	.over {
		display:inline-block;
		background: rgba(0,0,0,.1);
		position: absolute;
		right: 2px;
		top: 0;
	}
	.protocol {
		display: block;
		line-height: 18px;
		background: #f5f5f5;
		border: 1px solid #ccc;
		padding: 5px;
	}
	.unagreen {
		background: #41DDC9;
		color: #fff;
	}
</style>
