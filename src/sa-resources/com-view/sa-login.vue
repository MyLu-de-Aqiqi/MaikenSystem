<style scoped>
	/* 视图盒子 */
	.view-box{position: fixed; width: 100%; height: 100%; top: 0px; left: 0px; z-index: 1000; }
	/* EAEFF3 */
	.bg-1{height: 50%; background: linear-gradient(to bottom right, #0466c5, #3496F5);}
	.bg-2{height: 50%; background-color: #EAEFF3;}
	
	.login-box{width: 400px; height: 400px; position: absolute; left: calc(50% - 200px); top: calc(50% - 250px); }
	/* .login-box{} */
	
	
	/* logo */
	.login-top{margin-bottom: 40px; text-align: center; }
	.logo-img{width: 50px; height: 50px; vertical-align: middle;border-radius: 50%; margin-left: -10px; margin-right: 20px;}
	.logo-img{ position: relative; top: -5px; }
	.admin-title{font-size: 28px; color: #FFF; font-weight: 700;}
	
	/* 表单 */
	.from-box{padding: 20px 50px; background-color: #FFF;}
	.from-box{ border-radius: 1px; box-shadow: 1px 1px 2px #666;}
	.from-title{margin-top: 20px; margin-bottom: 30px; text-align: center;}
	
</style>
<template>
	<div class="view-box" v-if="isShow">
		<div class="bg-1"></div>
		<div class="bg-2"></div>
		<div class="login-box">
			<div class="login-box-2">
				<div class="login-top">
					<img src="./../index/admin-logo.png" class="logo-img">
					<span class="admin-title">麦肯系统后台</span>
				</div>
				<div class="from-box">
					<h3 class="from-title">账号登录</h3>
					<el-form size="small" label-position="left" label-width="0px">
						<el-form-item>
							<el-input prefix-icon="el-icon-user" v-model="m.username" placeholder="请输入账号"></el-input>
						</el-form-item>
						<el-form-item>
							<el-input prefix-icon="el-icon-unlock" v-model="m.password" type="password" placeholder="请输入密码" @keyup.native.enter="ok()"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" size="small" style="width: 100%;" @click="ok()">登录</el-button>
						</el-form-item>
<!--						<el-form-item>-->
<!--							<span style="color: #999;">测试账号：sa/sa123456</span>-->
<!--							<el-link style="float: right; color: #999;" @click="isShow=false">暂不登录</el-link>-->
<!--						</el-form-item>-->
					</el-form>
				</div>
			</div>
		</div>
		<!-- 底部 版权 -->
		<div style="position: absolute; bottom: 40px; width: 100%; text-align: center; color: #666;">
			Copyright ©2020  | 彭成轩 - 提供技术支持
		</div>
		<div style="position: absolute; bottom: 20px; width: 100%; text-align: center; color: #666;">
			网站备案号 蜀ICP备2021005937号-1
		</div>
	</div>
</template>

<script>
	import Vue from "vue";


	export default {
		name: 'sa-login',
		data() {
			return {
				isShow: true,	// 是否显示当前视图
				m: {
					username: '',
					password: '',
					resData:{}
				}
			}
		},
		created: function () {
			//有token，去后端校验这个token是否能验证通过
			//看cookie是否有，如果有cookie，就去校验，没有就不去校验了
			let cookie = localStorage.tokenValue;


			if (cookie.length > 0){
				this.sa.ajaxGet('/admin/tokenVerify',  function(res) {
					if (res.msg == "OK"){
						Vue.prototype.sa_admin.closeLogin();
					}else if (res.msg == "FAIL"){
						document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
						localStorage.removeItem('permission');
						Vue.prototype.sa_admin.openLogin();
					}
				}.bind(this))
			}
			// else {
			// 	this.sa_admin.openLogin();
			// }





		},
		methods: {
			// 点击确定 
			ok() {
				// 表单验证
				if(this.m.username == '' || this.m.password == '' ) {
					return this.sa.error2('必填项不能为空');
				}
				// 开始登录
				this.sa.ajaxGet('/admin/login', this.m, function(res) {
					localStorage.setItem('permission',JSON.stringify(res.data))
					if (res.data.tokenInfo){
						localStorage.tokenName = res.data.tokenInfo.tokenName;
						localStorage.tokenValue = res.data.tokenInfo.tokenValue;
					}

					this.m.resData = res.data;
					this.sa.ok2('登录成功，欢迎你：' + this.m.username);




					setTimeout(function() {
						//构造菜单栏
						this.sa.ajaxGet('/admin/getMenuTree', function(res) {

							//初始化菜单
							let menuIds = res.data;

							this.sa_admin.initMenu(menuIds); // 初始化菜单, 不传参代表默认显示所有菜单 菜单在 ./sa-menu-list.js 里,

							// 初始化名字
							this.sa_admin.$nextTick(function() {
								let item = localStorage.getItem('permission');
								if (item != null){
									item = JSON.parse(item);

									this.sa_admin.user = {
										username: item.admin.name, // 昵称
										avatar: document.querySelector('.admin-logo').src // 头像地址
									}
								}
							})

							//刷新一次
							// history.go(0);


							this.isShow = false;


						}.bind(this))
					}.bind(this), 800);
				}.bind(this))


			}
		}
	}
</script>

