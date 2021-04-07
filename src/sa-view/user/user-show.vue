<style scoped>
	.c-panel{margin: 0px; padding: 0px 20px;}
</style>

<template>
	<el-dialog
		v-if="userInfo"
		:title="userInfo.id == 0 ? '用户展示' : '用户展示'"
		:visible.sync="isShow"
		width="450px"
		top="5vh"
		:append-to-body="true"
		:destroy-on-close="true"
		:close-on-click-modal="false"
		custom-class="full-dialog"
		>
		<div class="vue-box">
			<div class="c-panel">
				<!-- 参数栏 -->
				<br>
				<el-form size="mini">
<!--					<el-form-item label="编号：">-->
<!--						<el-input v-model="m.id" disabled></el-input>-->
<!--					</el-form-item>-->
					<el-form-item label="编号：">
						<el-input v-model="userInfo.id" disabled></el-input>
					</el-form-item>
					<el-form-item label="昵称：">
						<el-input v-model="userInfo.name" disabled></el-input>
					</el-form-item>
					<el-form-item label="上次登陆id：">
						<el-input v-model="userInfo.loginIp" disabled></el-input>
					</el-form-item>
					<el-form-item label="上次登陆时间：">
						<el-input v-model="userInfo.loginTime" disabled></el-input>
					</el-form-item>
					<el-form-item label="电话：">
						<el-input v-model="userInfo.phone" disabled></el-input>
					</el-form-item>
					<el-form-item label="微信openId：">
						<el-input v-model="userInfo.openId" disabled></el-input>
					</el-form-item>

					<el-table style="margin-top: 10px" :data="roleList" size="mini">
						<el-table-column label="角色名" prop="roleName"></el-table-column>
						</el-table>


				</el-form>
			</div>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button size="small" @click="close()">关  闭</el-button>
		</span>
	</el-dialog>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
				id: 0,
				m:null,
				userInfo: null,
				dataList: [],		// 数据集合
				roleList:[], // 角色集合
			}
		},
		methods: {
			// 打开 
			open: function(userInfo) {
				console.log('userInfo:'+JSON.stringify(userInfo))
				this.isShow = true;
				this.userInfo = userInfo;
				this.roleList = userInfo.roles;

			},

			// 表单验证  

			//关闭视图
			close:function(){
				this.isShow = false;
				// this.m = null;
			},
			// 提交
			// 创建一个空的model 
			create_m: function() {
				return {
					productname: '',
					labelname: '',
					simple: '',
					compound: '',
					packingspecification:'',
					weight:0,
					taxinclusiveprice:0,
					totalmoney:0
				}
			},

		},
		created: function(){
			
		}
	}
</script>
