<style scoped>
	.c-panel{margin: 0px; padding: 0px 20px;}
</style>

<template>
	<el-dialog
		v-if="userInfo"
		:title="userInfo.id == 0 ? '用户修改' : '用户修改'"
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
						<el-input v-model="userInfo.id" ></el-input>
					</el-form-item>
					<el-form-item label="账号：">
						<el-input v-model="userInfo.name" ></el-input>
					</el-form-item>
					<el-form-item label="上次登陆id：">
						<el-input v-model="userInfo.loginIp" ></el-input>
					</el-form-item>
					<el-form-item label="上次登陆时间：">
						<el-input v-model="userInfo.loginTime" ></el-input>
					</el-form-item>
					<el-form-item label="电话：">
						<el-input v-model="userInfo.phone" ></el-input>
					</el-form-item>
					<el-form-item label="微信openId：">
						<el-input v-model="userInfo.openId" ></el-input>
					</el-form-item>

					<el-select v-model="value" placeholder="请选择">
						<el-option
										v-for="item in allRoleList"
										:key="item.id"
										:label="item.roleName"
										:value="item.id">
						</el-option>
					</el-select>

					<el-button size="small" @click="add()">新 增 角 色</el-button>


					<el-table style="margin-top: 10px" :data="roleList" size="mini">
						<el-table-column label="角色名" prop="roleName"></el-table-column>
						<el-table-column label="操作" >
							<template #default="scope">
								<el-button class="c-btn" type="danger" icon="el-icon-delete" @click="del(scope.row,$index)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>

				</el-form>
			</div>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button size="small" @click="close()">关  闭</el-button>

			<el-button size="small" type="primary" @click="ok()">确 定</el-button>
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
				allRoleList:[],
				value:'',
				flagPush:true,
			}
		},
		methods: {
			// 打开 
			open: function(userInfo) {
				this.isShow = true;
				this.userInfo = userInfo;
				console.log("opem:"+JSON.stringify(this.userInfo))
				if (userInfo.roles != null){
					this.roleList = userInfo.roles;
				}

			},
			f5(){
				console.log("this.userInfo:"+JSON.stringify(this.userInfo))
				if (this.userInfo.roles != null){
					this.roleList = this.userInfo.roles;
				}
			},
			ok(){
				let po = this.userInfo;
				po.roles = this.roleList;

				this.sa.ajaxPostJson('/user/update', JSON.stringify(po), function() {
					self.sa.alert('更新成功', function() {
						close();	// 父视图刷新
						this.isShow = false;
					});
				});
			},
			add(){
				//TODO 根据ID查询，然后加入list

				this.sa.ajaxGet('/role/getById?id='+this.value, function(res){

					//TODO 当数组本身为空的时候，push，就会 ，出错 -- 是初始化错误  open那儿
					//TODO 增加角色反复增加的问题
					for (let oneRole in this.roleList){
						if (oneRole.roleName === res.data.roleName){
							this.flagPush = false;
							this.sa.alert('该角色已添加，不能重复添加', function(){
							}.bind(this));
						}
					}

					if (this.flagPush){
						this.roleList.push(res.data);
					}

					this.flagPush = true;

				}.bind(this));

			},
			del(data,index){
				//TODO 删除这个,但是关闭掉了，想要他恢复
				console.log("删除:"+JSON.stringify(data))
				this.roleList.splice(index,1);
			},

			// 表单验证  

			//关闭视图
			close:function(){
				this.isShow = false;
				this.value = '';
				this.f5();
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
			getAllUserInfo(){

			}

		},
		created: function(){
			this.sa.ajaxGet('/role/getList',  function(res){
				this.allRoleList = res.data;	// 数据
			}.bind(this));
		}
	}
</script>
