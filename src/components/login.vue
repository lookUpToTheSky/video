<template>
  <div class="">
  	<div id="login_room">
		<mt-header fixed title="登录">
				<router-link to="/me" slot="left">
					<mt-button icon="back">返回</mt-button>
				</router-link>
		</mt-header> 
  		<div class="flexbox">
				<ul class="nav-tabs">
            <li id="active"><a>登录</a></li>
            <li><router-link tag="a" to="/sign">注册</router-link></li>
        </ul>
        <div class="userName">
          <img src="static/img/user.png">
          <input type="text" v-model="user.userName" placeholder="请输入邮箱/手机号" @blur="onTest(user.userName, 0)">
          <p class="warn" v-show="warnName">-账号不能为空-</p>
        </div>
        <div class="userPsd">
            <img src="static/img/psd.png">
            <input type="password" v-model="user.userPsd" placeholder="请输入密码" @blur="onTest(user.userPsd, 1)">
            <p class="warn" v-show="warnPsd">-密码不能为空-</p>
        </div>
        <div class="remPsd">
        	<span><input type="checkbox" ref="remeberPsd">记住密码</span>
        	<a style="color:#41ddc9">忘记密码?</a>
        </div>
        <div class="code">
            <input 
            class="codeInput" 
            type="text" v-model="user.code" 
            placeholder="请输入验证码" 
            @blur="onTest(user.code, 2)"
            @keyup.enter="onLogin"
            >
            <p class="warn" v-show="warnCode">-验证码不能为空-</p>
            <div class="codeImg">
                <img src="http://www.limingfeng.com/code" @click="onNewCode" ref="code">
                <p>看不清，换一张</p>
            </div>
        </div>
        <div>
        	<button type="button" class="btn btn-lg" @click="onLogin">登录</button>
        </div>
  		</div>
  	</div>
  </div>
</template>

<script> 
export default {
  name: 'login',
  data () {
  	return {
  		user: {
  			userName: '游客001',
  			userPsd: '00123456',
  			code: '0768',
  		},
  		warnName: false,
  		warnPsd: false,
  		warnCode: false,
  	}
  },
  methods: {
  	onTest (value, index) {
  		switch(index) {
  			case 0: if(!value){ this.warnName = true;}else{this.warnName = false;};
  			break;
  			case 1: if(!value){ this.warnPsd = true;}else{this.warnPsd = false;}; 
  			break;
  			case 2: if(!value){ this.warnCode = true;}else{this.warnCode = false;};
  			break;
  		}
  	},
  	onLogin () {
  		let _this = this;
  		let params = {
					userAccount: this.user.userName,
					userPassword: this.user.userPsd,
					code: this.user.code
  			}
		if(!this.user.userName){ this.warnName = true;return;}else{this.warnName = false;};
		if(!this.user.userPsd){ this.warnPsd = true;return;}else{this.warnPsd = false;}; 
		if(!this.user.code){ this.warnCode = true;return;}else{this.warnCode = false;};
		this.$router.push({name: 'me', params: {userName: this.user.userName, userCode: this.user.userPsd}})
  	},
  	onRemeberPsd () {
  		if (this.$refs.remeberPsd.checked) {
  			let user = JSON.stringify({
  				userName: this.user.userName,
  				userPsd: this.user.userPsd
  			})
  			localStorage.setItem('userInfo', user);
  		}else {
  			localStorage.removeItem('userInfo');
  		}
  	},
  	onNewCode () {
  		let dom = this.$refs.code;
		dom.src='http://www.limingfeng.com/code?'+Math.random();
  	}
  },
  mounted () {
  	let user = JSON.parse(localStorage.getItem('userInfo'));
  	if(user != null && user != {}){
  		this.user.userName = user.userName;
  		this.user.userPsd = user.userPsd;
  		this.$refs.remeberPsd.checked = true
  	}
		window.onbeforeunload = function (e) {
		  localStorage.removeItem('userInfo');
		}
  }
};
</script>

<style scoped>
	>>>.mint-header{
		background-color: #41ddc9;
		color: #fff;
	}
	#login_room {
		height: auto;
		width: 7rem;
		padding-top: 4rem;
		margin: 0 auto;
		text-align: center;
	}
	.flexbox {
		display: flex;
		min-height: 7rem;
		flex-direction: column;
		justify-content: space-between;
	}
	.nav-tabs {
		width: 100%;
		border-bottom: none;
		margin-bottom: .4rem;
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
		height: .8rem;
		color: #fff;
		border-radius: none;
	}
	.userName, .userPsd {
		position: relative;
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		margin-top: .5rem;
		display: flex;
		background: #fff;
		border-radius: .2rem;
	}
	.userName img, .userPsd img {
		width: 1rem;
		height: 1rem;
	}
	.userName input, .userPsd input{
		line-height: 1rem;
		height: 1rem;
		padding: 0 .2rem;
		flex: 1;
	}
	input::placeholder {
		font-size: .28rem !important;
		color: #888;
	}
	.code {
		width: 100%;
		position: relative;
		display: flex;
		justify-content: space-between;
	}
	.code .codeInput {
		float: left;
		line-height: 37px;
		font-size: .3rem;
		padding: 0 .2rem;
		width: 3rem;
		margin-bottom: .3rem;
	}
	.code img {
		margin-right: .1rem;
		width: 85px;
		height: 30px;
		background: #666;
	}
	.code .codeImg {
		color: #888;
		cursor: pointer;
	}
	.warn {
		position:absolute;
		top: -.7rem;
		color: red;
		font-size: .24rem;
		text-align: center;
		width: 100%;
	}
	.remPsd {
		margin: .2rem 0;
		display: flex;
		justify-content: space-between;
	}
	.remPsd span {
		color: #888;
	}
	.remPsd span input {
		margin-top: -.05rem;
	}
	.btn {
		width: 100%;
        line-height: 40px;
		color: #fff;
		letter-spacing: .2rem;
		background: #41DDC9;
		margin-top: 20px;
	}
</style>

